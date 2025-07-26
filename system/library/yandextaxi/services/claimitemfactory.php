<?php

namespace YandexTaxi\Services;

use YandexTaxi\Delivery\Entities\ClaimItem\ClaimItem;
use YandexTaxi\Delivery\Entities\ClaimItem\Fiscalization;
use YandexTaxi\Delivery\Entities\ClaimItem\Money;
use YandexTaxi\Delivery\Entities\ClaimItem\Size;

/**
 * Class ClaimItemFactory
 *
 * @package YandexTaxi\Services
 */
class ClaimItemFactory
{
    /** @var string */
    private $supplierInn;

    /** @var string */
    private $vatCode;

    public function __construct(string $supplierInn, string $vatCode)
    {
        $this->supplierInn = trim(preg_replace('/[^0-9]/', '', $supplierInn));
        $this->vatCode = $vatCode;
    }

    public function createFromProduct(array $product, string $currencyCode): ClaimItem
    {
        $dimensionCoefficient = $this->getDimensionCoefficient($product['length_unit']);
        $weightCoefficient = $this->getWeightCoefficient($product['weight_unit']);
        
        $sku = $product['sku'] ?? null;
        if (empty($sku)) {
            $sku = $product['product_id'];
        }

        return new ClaimItem(
            $product['product_id'],
            "Product-{$product['product_id']}",
            $product['order_id'] ?? null,
            "{$product['name']} {$product['model']}",
            new Size(
                $product['width'] * $dimensionCoefficient,
                $product['length'] * $dimensionCoefficient,
                $product['height'] * $dimensionCoefficient
            ),
            new Money(
                $product['order_product_price'] ?? $product['price'],
                $currencyCode
            ),
            $product['weight'] * $weightCoefficient,
            $product['quantity'],
            $this->prepareFiscalazation($sku)
        );
    }

    public function createFromShipping(int $orderId, float $value, string $currencyCode): ClaimItem
    {
        $name = 'shipping_' . $orderId;

        return new ClaimItem(
            $name,
            $name,
            $orderId,
            "shipping",
            new Size(0, 0, 0),
            new Money($value, $currencyCode),
            0,
            1,
            $this->prepareFiscalazation($name)
        );
    }

    /**
     * Get multiplier to convert default dimension to required meters
     *
     * @param string|null $unit
     *
     * @return float
     */
    private function getDimensionCoefficient(?string $unit): float {
        $unit = $this->preprareUnit($unit);
        switch ($unit) {
            case 'in':
                return 0.0254;
            case 'cm':
            case 'см':
                return 0.01;
            case 'mm':
                return 0.001;
            case 'm':
            case 'м':
            default:
                return 1; // unit not found send as it is
        }
    }

    /**
     * Get multiplier to convert default weight to required kgs
     *
     * @param string|null $unit
     *
     * @return float
     */
    private function getWeightCoefficient(?string $unit): float {
        $unit = $this->preprareUnit($unit);
        switch ($unit) {
            case 'g':
            case 'г':
                return 0.001;
            case 'lb':
                return 0.453592;
            case 'oz':
                return 0.0283495;
            case 'kg':
            case 'кг':
            default:
                return 1; // unit not found send as it is
        }
    }

    private function preprareUnit(string $unit): string {
        return trim('.', mb_strtolower($unit));
    }

    private function prepareFiscalazation(string $sku): ?Fiscalization
    {
        if (empty($this->supplierInn)) {
            return null;
        }

        return new Fiscalization($sku . '_' . uniqid(), $this->supplierInn, $this->vatCode);
    }
}
