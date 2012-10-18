<?php

namespace Libbit\YuiBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\Reference;

/**
 * Compiler pass for the YUI config
 */
class ConfigCompilerPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        $json = array();

        if (false === $container->hasDefinition('libbit_yui.config')) {
            return;
        }

        foreach ($container->findTaggedServiceIds('libbit_yui.yui.config') as $id => $attributes) {
            if (isset($attributes[0]['json'])) {
                $json[] = $attributes[0]['json'];
            }
        }

        $container->getDefinition('libbit_yui.config')->replaceArgument(0, $json);
    }
}
