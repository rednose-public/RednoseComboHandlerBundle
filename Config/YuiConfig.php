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

    public function __construct($json)
    {
        $this->json = $json;
    }

    public function getConfig($container)
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
