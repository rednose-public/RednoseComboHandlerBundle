<?php

namespace Libbit\YuiBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;

class GroupPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('libbit_yui.config')) {
            return;
        }

        $groups = array();

        foreach ($container->findTaggedServiceIds('libbit_yui.group') as $serviceId => $tag) {
            $groups[$tag[0]['alias']] = $serviceId;
        }

        $container->getDefinition('libbit_yui.config')->replaceArgument(1, $groups);
    }
}
