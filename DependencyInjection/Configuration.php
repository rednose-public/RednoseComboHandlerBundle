<?php

/*
 * This file is part of the RednoseComboHandlerBundle package.
 *
 * (c) RedNose <http://www.rednose.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Rednose\ComboHandlerBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;
use Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition;

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
        $rootNode    = $treeBuilder->root('rednose_combo_handler', 'array');

        $this->addRootsSection($rootNode);

        return $treeBuilder;
    }

    /**
     * {@inheritdoc}
     */
    public function getConfigTree()
    {
        return $this->getConfigTreeBuilder()->buildTree();
    }

    /**
     * @param ArrayNodeDefinition $node
     */
    private function addRootsSection(ArrayNodeDefinition $node)
    {
        $node
            ->children()
                ->arrayNode('roots')
                    ->useAttributeAsKey('name')
                    ->prototype('scalar')->end()
                ->end()
            ->end();
    }
}
