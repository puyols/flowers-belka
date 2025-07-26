<?php

namespace YandexTaxi\Services;

use YandexTaxi\Delivery\YandexApi\Exceptions\YandexApiException;
use YandexTaxi\Delivery\YandexApi\Resources\Tariffs;

/**
 * Class AvailableTariffChecker
 *
 * @package YandexTaxi\Services
 */
class AvailableTariffChecker
{
    /** @var Tariffs */
    private $tariffs;

    /**
     * AvailableTariffChecker constructor.
     *
     * @param Tariffs $tariffs
     */
    public function __construct(Tariffs $tariffs)
    {
        $this->tariffs = $tariffs;
    }

    /**
     * @param SettingService $settingService
     *
     * @return bool
     * @throws YandexApiException
     */
    public function isAvailableDefault(SettingService $settingService): bool
    {
        $country = $settingService->getOne('shipping_yandextaxi_country');
        list ($lat, $lon) = CountryRelatedDataService::getDefaultTariffsPoint($country ?? '');

        return $this->isAvailable($lat, $lon);
    }

    /**
     * @param float $lat
     * @param float $lon
     *
     * @return bool
     * @throws YandexApiException
     */
    public function isAvailable(float $lat, float $lon): bool
    {
        return !empty($this->tariffs->getAllForPoint($lat, $lon));
    }
}
