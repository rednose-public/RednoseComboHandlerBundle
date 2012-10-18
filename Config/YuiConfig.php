<?php

/*
 * This file is part of the LibbitYuiBundle package.
 *
 * (c) RedNose <info@rednose.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Libbit\YuiBundle\Config;

use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * YuiConfig class
 *
 * @author Marc Bontje <marc@rednose.nl>
 * @author Sven Hagemann <sven@rednose.nl>
 */
class YuiConfig
{
    protected $modules;

    protected $json;

    /**
     * Constructor
     *
     * @param string $json The JSON string to parse for config metadata
     */
    public function __construct($json)
    {
        $this->json = $json;
    }

    /**
     * Process the JSON config
     *
     * @param ContainerInterface $container Service container
     *
     * @return array Config parameters
     */
    public function getConfig(ContainerInterface $container)
    {
        $json = '';
        $locator = $container->get('file_locator');

        foreach ($this->json as $file) {
            $file = $locator->locate($file);

            $json .= file_get_contents($file);
        }

        return array('template' => array(
            'json' => $json,
            'base' => ltrim($container->get('templating.helper.assets')->getUrl('bundles/libbityui'), '/'),
        ));
    }
}
