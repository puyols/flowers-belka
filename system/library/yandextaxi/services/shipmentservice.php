<?php

namespace YandexTaxi\Services;

use DateTime;
use Exception;
use YandexTaxi\Delivery\Entities\Claim\AvailableCancelStatus;
use YandexTaxi\Delivery\Entities\Claim\Claim;
use YandexTaxi\Delivery\Entities\Claim\Tariff;
use YandexTaxi\Delivery\Entities\RoutePoint\PaymentOnDelivery;
use YandexTaxi\Delivery\Exceptions\ClaimNotFoundException;
use YandexTaxi\Delivery\Entities\Order\Order;
use YandexTaxi\Delivery\Services\TariffTextFinder;
use YandexTaxi\Delivery\YandexApi\Resources\DriverPhones;
use YandexTaxi\Delivery\YandexApi\Resources\Tariffs;
use YandexTaxi\Entities\Shipment\Shipment;
use YandexTaxi\Exceptions\ShipmentException;
use YandexTaxi\Delivery\Entities\RoutePoint\Address;
use YandexTaxi\Delivery\Entities\ClaimItem\ClaimItem;
use YandexTaxi\Delivery\Entities\RoutePoint\Contact;
use YandexTaxi\Delivery\Entities\Journal\Event;
use YandexTaxi\Delivery\Entities\RoutePoint\RoutePoint;
use YandexTaxi\Delivery\Services\ClaimService;
use YandexTaxi\Delivery\Services\EventService;
use DomainException;
use YandexTaxi\Repositories\ShipmentRepository;
use YandexTaxi\Delivery\Entities\Claim\Status;
use YandexTaxi\Delivery\YandexApi\Exceptions\YandexApiException;

/**
 * Class ShipmentService
 *
 * @package YandexTaxi\Services
 */
class ShipmentService
{
    /** @var ClaimService */
    private $claim_service;

    /** @var ShipmentRepository */
    private $repository;

    /** @var int */
    private $assembly_delay; // in minutes

    /** @var EventService */
    private $event_service;

    /** @var Tariffs */
    private $tariffs;

    /** @var DriverPhones */
    private $driver_phones;

    /** @var SettingService */
    private $settings_service;

    public function __construct(
        ClaimService $claim_service,
        EventService $event_service,
        ShipmentRepository $shipment_repository,
        Tariffs $tariffs,
        DriverPhones $driver_phones,
        int $assembly_delay,
        SettingService $setting_service
    ) {
        $this->claim_service = $claim_service;
        $this->repository = $shipment_repository;
        $this->assembly_delay = $assembly_delay;
        $this->event_service = $event_service;
        $this->driver_phones = $driver_phones;
        $this->tariffs = $tariffs;
        $this->settings_service = $setting_service;
    }

    /**
     * @param float $lat
     * @param float $lon
     *
     * @return Tariff[]
     * @throws YandexApiException
     */
    public function getTariffsList(float $lat, float $lon): array {
        return $this->tariffs->getAllForPoint($lat, $lon);
    }

    public function createClaimForCalculation(array $data): Claim {
        $tariff = $this->prepareTariff($data['tariff']);

        return $this->claim_service->calculateShippingPrice(
            $data['claim_link_key'],
            $this->buildRoutePoint($data['source']),
            $this->buildOrders($data['orders'], $data['destinations'], $data['products'], $data['shipping']),
            $tariff,
            $this->prepareTariffRequirements($tariff, $data['tariff_requirements']),
            $this->getDue($data['due'] ?? null),
            false
        );
    }

    public function getClaimByKey(string $key): Claim {
        return $this->claim_service->getByKey($key);
    }

    /**
     * @param string $key
     * @param array  $order_ids
     *
     * @return void
     * @throws ClaimNotFoundException
     * @throws YandexApiException
     */
    public function confirmClaim(string $key, array $order_ids): void {
        $claim_id = $this->claim_service->confirm($key);

        $claim = $this->getClaim($claim_id);

        $this->repository->create(
            $claim_id,
            (new TariffTextFinder($this->tariffs))->find($claim),
            $order_ids
        );

        $this->syncShipmentForClaim($claim);
    }

    /**
     * @param int    $order_id
     * @param int    $claim_version
     * @param string $cancel_status
     *
     * @return void
     * @throws ShipmentException
     */
    public function cancel(int $order_id, int $claim_version, string $cancel_status): void {
        $shipment = $this->getForOrder($order_id);
        if (is_null($shipment)) {
            throw new ShipmentException('Shipment not found');
        }

        try {
            $this->claim_service->cancel(
                $shipment->getClaimId(),
                $claim_version,
                AvailableCancelStatus::fromCode($cancel_status)
            );
        } catch (YandexApiException $e) {
            throw new ShipmentException('Unable to cancel shipment');
        }

        $this->syncShipmentForClaimByOrder($order_id);
    }

    public function getForOrder(int $order_id): ?Shipment {
        return $this->repository->getForOrder($order_id);
    }

    /**
     * @param int $order_id
     *
     * @return Shipment
     * @throws ShipmentException
     */
    public function syncShipmentForClaimByOrder(int $order_id): Shipment {
        $shipment = $this->repository->getForOrder($order_id);
        if (is_null($shipment)) {
            throw new ShipmentException('Shipment not found');
        }

        try {
            $claim = $this->getClaim($shipment->getClaimId());
        } catch (YandexApiException $e) {
            throw new ShipmentException('Unable to sync shipment', 0, $e);
        }

        $this->syncShipmentForClaim($claim);

        return $this->repository->getForOrder($order_id);
    }

    public function syncShipments(OrderStatusService $orderStatusService): void {
        $events = $this->event_service->findNew();

        foreach ($this->indexEventsByClaimId($events) as $claim_id => $event) {
            $this->repository->updateStatus($claim_id, $event->getNewStatus(), $event->getAt());
        }

        $needDriverUpdateClaimIds = $this->getNeedDriverUpdateClaimIds($events);
        $needOrderVisitStatusUpdateClaimIds = $this->getNeedOrderVisitStatusUpdateClaimIds($events);

        $claims = $this->getClaims(array_merge($needDriverUpdateClaimIds, $needOrderVisitStatusUpdateClaimIds));

        if (empty($claims)) {
            return;
        }

        $this->updateDriverInfo($needDriverUpdateClaimIds, $claims);
        $this->updateOrdersVisitStatus($needOrderVisitStatusUpdateClaimIds, $claims, $orderStatusService);
    }

    private function getClaims(array $ids): array {
        try {
            $claims = [];
            foreach ($this->claim_service->getBulk($ids) as $claim) {
                $claims[$claim->getId()] = $claim;
            }
            return $claims;
        } catch (Exception $exception) {
            return [];
        }
    }

    /**
     * @param string $claim_id
     *
     * @return Claim
     * @throws YandexApiException
     */
    public function getClaim(string $claim_id): Claim {
        return $this->claim_service->get($claim_id);
    }

    /**
     * @param Claim $claim
     *
     * @return void
     */
    private function syncShipmentForClaim(Claim $claim): void {
        $this->checkClaimHasStatus($claim);

        $this->repository->updateOrdersVisitStatus($claim);

        $driver = $claim->getDriver();
        if (!is_null($driver)) {
            $this->repository->updateDriver($claim->getId(), $driver);
        }

        try {
            $phone = $this->driver_phones->get($claim->getId());
        } catch (Exception $exception) {
            $phone = null;
        }
        $this->repository->updateDriverPhone($claim->getId(), $phone);
        $this->repository->updatePrice($claim->getId(), $claim->getPrice()->getValue());
        $this->repository->updateStatus($claim->getId(), $claim->getStatus(), $claim->getUpdatedAt());
    }

    /**
     * @param Event[] $events
     *
     * @return string[]
     */
    private function getNeedOrderVisitStatusUpdateClaimIds(array $events): array {
        return $this->getClaimIdsWhichChangedStatusTo($events, [
            Status::delivered(),
            Status::readyForDeliveryConfirmation(),
            Status::deliveryArrived(),
        ]);
    }

    /**
     * @param Event[] $events
     *
     * @return string[]
     */
    private function getNeedDriverUpdateClaimIds(array $events): array {
        return $this->getClaimIdsWhichChangedStatusTo($events, [
            Status::performerFound(),
            Status::deliveredFinish(),
        ]);
    }

    /**
     * @param Event[]  $events
     * @param Status[] $statuses
     *
     * @return string[]
     */
    private function getClaimIdsWhichChangedStatusTo(array $events, array $statuses): array {
        $ids = [];
        /** @var Event $event */
        foreach ($events as $event) {
            if (!$event->statusWasChanged()) {
                continue;
            }

            $status = $event->getNewStatus();
            if (!is_null($status) && $status->in(...$statuses)) {
                $ids[] = $event->getClaimId();
            }
        };

        return array_unique($ids);
    }

    /**
     * @param string[] $claim_ids
     * @param Claim[]  $claims
     *
     * @return void
     */
    private function updateDriverInfo(array $claim_ids, array $claims): void {
        foreach ($claim_ids as $id) {
            if (!isset($claims[$id])) {
                continue;
            }
            $claim = $claims[$id];

            if (is_null($claim->getDriver())) {
                continue;
            }

            $this->repository->updateDriver($claim->getId(), $claim->getDriver());

            try {
                $phone = $this->driver_phones->get($claim->getId());
            } catch (Exception $exception) {
                $phone = null;
            }

            $this->repository->updateDriverPhone($claim->getId(), $phone);
        }
    }

    /**
     * @param string[] $claim_ids
     * @param Claim[]  $claims
     * @param OrderStatusService $orderStatusService
     *
     * @return void
     */
    private function updateOrdersVisitStatus(array $claim_ids, array $claims, OrderStatusService $orderStatusService): void {

        foreach ($claim_ids as $id) {
            if (!isset($claims[$id])) {
                continue;
            }

            $this->repository->updateOrdersVisitStatus($claims[$id], $orderStatusService);
        }
    }

    /**
     * @param Claim $claim
     *
     * @return void
     * @throws DomainException
     */
    private function checkClaimHasStatus(Claim $claim): void {
        if (is_null($claim->getStatus())) {
            throw new DomainException('Claim status cannot be empty');
        }
    }

    /**
     * @param Event[] $events
     *
     * @return Event[]
     */
    private function indexEventsByClaimId(array $events): array {
        $map = [];
        foreach ($events as $event) {
            if ($event->statusWasChanged()) {
                $map[$event->getClaimId()] = $event;
            }
        }

        return $map;
    }

    private function getDue(?string $datetime = null): ?DateTime {
        if (empty($datetime)) {
            $datetime = null;
        }

        if (!is_null($datetime)) {
            $now = new DateTime();
            $due = new DateTime($datetime);
            if ($now < $due) {
                return $due;
            }
        }

        if ($this->assembly_delay === 0) {
            return null;
        }

        $due = new DateTime();
        $due->modify("+{$this->assembly_delay} minutes");

        return $due;
    }

    private function prepareTariff(?string $raw): ?string
    {
        if (empty($raw)) {
            return null;
        }

        if ($raw === 'default') {
            return null;
        }

        return $raw;
    }

    private function prepareTariffRequirements(?string $tariff, array $rawRequirements): array
    {
        if (empty($tariff)) {
            return [];
        }

        $preparedRequirements = $rawRequirements[$tariff] ?? [];

        // delete not selected params
        foreach ($preparedRequirements as $key => $value) {
            if ($value === 'false') {
                unset($preparedRequirements[$key]);
            }

            if (is_numeric($value)) {
                $preparedRequirements[$key] = (int) $value;
            }
        }

        return $preparedRequirements;
    }

    private function buildOrders(array $orders, array $destinations, array $products, array $shipping): array {
        $currencyMap = [];
        $paymentCodeMap = [];
        foreach ($orders as $order) {
            $currencyMap[$order['order_id']] = $order['currency_code'];
            $paymentCodeMap[$order['order_id']] = $order['payment_code'];
        }

        return array_map(function (array $destination) use ($currencyMap, $paymentCodeMap, $products, $shipping) {
            $currency = $currencyMap[$destination['order_id']];
            $paymentCode = $paymentCodeMap[$destination['order_id']];

            return $this->buildOrder($destination, $products, $shipping, $currency, $paymentCode);
        }, $destinations);
    }

    private function buildOrder(
        array $destination,
        array $products,
        array $shipping,
        string $currency,
        string $paymentCode
    ): Order {
        if ($this->destinationHasNoOrder($destination)) {
            return Order::createFake($this->buildRoutePoint($destination));
        }

        return Order::createReal(
            $this->buildRoutePoint($destination, $paymentCode),
            $this->buildItemsForDestination($destination, $products, $shipping, $currency)
        );
    }

    private function destinationHasNoOrder(array $destination): bool {
        return !isset($destination['order_id']);
    }

    private function buildRoutePoint(array $data, $paymentCode = null): RoutePoint {
        $address = new Address($data['address'], $data['lat'], $data['lon'], $data['comment']);
        $address->setFlat($data['flat'] ?? null);
        $address->setFloor($data['floor'] ?? null);
        $address->setPorch($data['porch'] ?? null);

        $point = new RoutePoint(
            new Contact($data['name'], $data['phone'], $data['email'] ?? ''),
            $address,
            isset($data['sms_on']) && $data['sms_on'] === 'on',
            $data['order_id'] ?? null
        );

        $country = $this->settings_service->getOne('shipping_yandextaxi_country') ?? '';
        $inn = trim($this->settings_service->getOne('shipping_yandextaxi_supplier_inn'));

        if (!CountryRelatedDataService::isPaymentOnDeliveryAllowed($country) || empty($inn)) {
            return $point;
        }

        // if payment method Cash On Delivery, then add payment on delivery setting
        if ($paymentCode === 'cod') {
            $point->setPaymentOnDelivery(new PaymentOnDelivery(
                $data['email'] ?? null,
                'cash'
            ));
        }
        // if payment method Card On Delivery, then add payment on delivery setting
        if ($paymentCode === 'yandexgodelivery_card_od') {
            $point->setPaymentOnDelivery(new PaymentOnDelivery(
                $data['email'] ?? null,
                'card'
            ));
        }

        return $point;
    }

    private function buildItemsForDestination(
        array $destination,
        array $products,
        array $shippings,
        string $currency
    ): array {
        $service = new ClaimItemFactory(
            $this->settings_service->getOne('shipping_yandextaxi_supplier_inn'),
            $this->settings_service->getOne('shipping_yandextaxi_vat_code')
        );

        $products = array_filter($products, function (array $product) use ($destination) {
            return $product['order_id'] === $destination['order_id'];
        });

        $productItems = array_map(function (array  $product) use ($service, $currency) {
            return $service->createFromProduct($product, $currency);
        }, $products);

        $shippings = array_filter($shippings, function (array $shipping) use ($destination) {
            return $shipping['order_id'] === $destination['order_id'];
        });

        $shippingItems = array_map(function (array  $shipping) use ($service, $currency) {
            return $service->createFromShipping($shipping['order_id'], $shipping['value'], $currency);
        }, $shippings);

        return array_merge($productItems, $shippingItems);
    }
}
