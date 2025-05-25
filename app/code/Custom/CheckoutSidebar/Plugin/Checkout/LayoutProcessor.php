<?php
declare(strict_types=1);

namespace Custom\CheckoutSidebar\Plugin\Checkout;

use Magento\Checkout\Block\Checkout\LayoutProcessor;

class LayoutProcessorPlugin
{
    /**
     * @param LayoutProcessor $subject
     * @param array $jsLayout
     * @return array
     */
    public function afterProcess(
        LayoutProcessor $subject,
        array $jsLayout
    ): array {
        if (isset($jsLayout['components']['checkout']['children']['sidebar']['children']['summary']['children'])) {
            $jsLayout['components']['checkout']['children']['sidebar']['children']['summary']['children']['custom-text'] = [
                'component' => 'Custom_CheckoutSidebar/js/view/custom-text',
                'displayArea' => 'summary',
                'config' => [
                    'template' => 'Custom_CheckoutSidebar/custom-text'
                ]
            ];
        }

        return $jsLayout;
    }
} 