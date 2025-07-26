<?php

namespace YandexTaxi\Delivery\Entities\RoutePoint;

/**
 * Class PaymentOnDelivery
 *
 * @package YandexTaxi\Delivery\Entities\RoutePoint
 */
class PaymentOnDelivery
{
    /** @var string|null */
    private $customerEmail;

    /** @var string */
    private $paymentMethod;

    public function __construct(?string $customerEmail, string $paymentMethod)
    {
        $this->customerEmail = $customerEmail;
        $this->paymentMethod = $paymentMethod;
    }

    public function getCustomerEmail(): ?string
    {
        return $this->customerEmail;
    }

    public function getPaymentMethod(): string
    {
        return $this->paymentMethod;
    }
}
