<?php

/*
 * This file is part of the LibbitYuiBundle package.
 *
 * (c) RedNose <info@rednose.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Libbit\YuiBundle\DependencyInjection;

use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\Definition\Processor;
use Symfony\Component\Config\Definition\Exception\InvalidConfigurationException;

/**
 * Creates the bundle-specific service container.
 */
class LibbitYuiExtension extends Extension
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $configuration->setContainer($container);

        $processor = new Processor();
        $config = $processor->process($configuration->getConfigTree(), $configs);

        // Make the configuration parameters available to the container.
        foreach ($config as $k => $v) {
            $container->setParameter($this->getAlias().'.'.$k, $v);
        }
    }
}
