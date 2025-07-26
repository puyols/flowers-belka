<?php

namespace YandexTaxi\Delivery\Entities\ClaimItem;

/**
 * Class Fiscalization
 *
 * @package YandexTaxi\Delivery\Entities\ClaimItem
 */
class Fiscalization
{
    /** @var string */
    private $article;

    /** @var string */
    private $supplierInn;

    /** @var string */
    private $vatCode;

    /**
     * Fiscalization constructor.
     *
     * @param string $article
     * @param string $supplierInn
     * @param string $vatCode
     */
    public function __construct(string $article, string $supplierInn, string $vatCode)
    {
        $this->article = $article;
        $this->supplierInn = $supplierInn;
        $this->vatCode = $vatCode;
    }

    /**
     * @return string
     */
    public function getArticle(): string
    {
        return $this->article;
    }

    /**
     * @return string
     */
    public function getSupplierInn(): string
    {
        return $this->supplierInn;
    }

    /**
     * @return string
     */
    public function getVatCode(): string
    {
        return $this->vatCode;
    }
}
