<?php

/*
 * This file is part of the RednoseComboHandlerBundle package.
 *
 * (c) RedNose <http://www.rednose.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Rednose\ComboHandlerBundle\Twig\Extension;

use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Generates a Minfiy URL.
 */
class MinifyExtension extends \Twig_Extension
{
    private $container;

    /**
     * Constructor
     *
     * @param \Symfony\Component\DependencyInjection\ContainerInterface $container Service container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('minify', array($this, 'getMinifyUrl'))
        ];
    }

    /**
     * Returns a formatted URL for the Minifier.
     *
     * @param string|array $paths    One or more paths
     * @param string       $basePath An optional basepath to prepend to all assets
     *
     * @return string A public path
     */
    public function getMinifyUrl($paths, $basePath = null)
    {
        return $this->container->get('rednose_combo_handler.templating.helper.minify')->getUrl($paths, $basePath);
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'minify';
    }
}
