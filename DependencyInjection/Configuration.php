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

use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This class contains the configuration information for the bundle.
 */
class Configuration extends ContainerAware implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('libbit_yui', 'array');

        // The application bundle tree. These are the default values.
        $rootNode
            ->children()
                ->scalarNode('version')->isRequired()->end()
            ->end();

        return $treeBuilder;
    }

    /**
     * {@inheritdoc}
     */
    public function getConfigTree()
    {
        return $this->getConfigTreeBuilder()->buildTree();
    }
}
