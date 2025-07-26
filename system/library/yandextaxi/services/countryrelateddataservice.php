<?php

namespace YandexTaxi\Services;

/**
 * Class CountryRelatedDataHelper
 *
 * @package WCYandexTaxiDeliveryPlugin\Helpers
 */
class CountryRelatedDataService
{
    private const RUSSIA = 'Russia';
    private const ISRAEL = 'Israel';
    private const BELARUS = 'Belarus';
    private const KAZAKHSTAN = 'Kazakhstan';

    public static function getGeocoderInstructionUrlSource(): array
    {
        return [
            self::ISRAEL => 'https://disk.yandex.ru/d/MtX0hgmZyAR13w?w=1',
            'default' => 'view/javascript/yandextaxi/assets/geocoder-instruction.pdf',
        ];
    }

    public static function getCabinetUrlSource(): array
    {
        return [
            self::ISRAEL => 'https://business.yango.yandex.com/profile/settings/',
            self::BELARUS => 'https://business.taxi.yandex.by/profile/settings/',
            self::KAZAKHSTAN => 'https://business.taxi.yandex.kz/profile/settings/',
            'default' => 'https://business.taxi.yandex.ru/profile/settings/',
        ];
    }

    public static function getConnectUrlSource(): array
    {
        return [
            self::ISRAEL => 'https://yango.yandex.com/action/israel/delivery/delivery_he/?ya_medium=module&ya_campaign=woocommerce&utm_source=woocommerce&utm_medium=backend',
            self::BELARUS => 'https://delivery.yandex.com/by-ru?ya_medium=module&ya_campaign=opencart#form',
            self::KAZAKHSTAN => 'https://delivery.yandex.com/kz-ru?ya_medium=module&ya_campaign=opencart#form',
            'default' => 'https://logistics.yandex.com/business/self-registration?ya_source=businessdelivery&ya_medium=module&ya_campaign=opencart#form',
        ];
    }

    public static function getUpperPhoneCountry(string $country): string
    {
        switch ($country) {
            case self::ISRAEL:
                return 'IL';
            case self::BELARUS:
                return 'BLR';
            case self::KAZAKHSTAN:
                return 'KZ';
            default:
                return 'RU';
        }
    }

    public static function getPhoneCountry(string $country): string
    {
        switch ($country) {
            case self::ISRAEL:
                return 'il';
            case self::BELARUS:
                return 'by';
            case self::KAZAKHSTAN:
                return 'kz';
            default:
                return 'ru';
        }
    }

    public static function getDefaultTariffsPoint(string $country): array
    {
        switch ($country) {
            case self::ISRAEL:
                return [32.085443, 34.782175];
            case self::BELARUS:
                return [53.893386, 27.556720];
            case self::KAZAKHSTAN:
                return [51.120020, 71.439383];
            default:
                return [55.734148, 37.5865588]; // Yandex Russian Office
        }
    }

    public static function getCurrencyByCounty(string $country): string
    {
        switch ($country) {
            case self::ISRAEL:
                return '₪';
            case self::BELARUS:
                return 'Br';
            case self::KAZAKHSTAN:
                return '₸';
            default:
                return '₽';
        }
    }

    public static function getCurrencySymbol(string $currencyCode): string
    {
        switch ($currencyCode) {
            case 'ILS':
                return '₪';
            case 'BYN':
                return 'Br';
            case 'KZT':
                return '₸';
            default:
                return '₽';
        }
    }

    public static function isPaymentOnDeliveryAllowed(string $country): bool
    {
        return $country === self::RUSSIA;
    }
}
