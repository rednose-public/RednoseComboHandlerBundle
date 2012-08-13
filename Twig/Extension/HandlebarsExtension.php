<?php

/*
 * This file is part of the LibbitYuiBundle package.
 *
 * (c) RedNose <info@rednose.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Libbit\YuiBundle\Twig\Extension;

use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Packs Handlerbars templates into a JavaScript Object.
 */
class HandlebarsExtension extends \Twig_Extension
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
        return array(
            'handlebars' => new \Twig_Function_Method($this, 'getObject', array('is_safe' => array('all'))),
        );
    }

    /**
     * Returns a JavaScript Object with Handlebars templates.
     *
     * @param string $path One or more paths (supports wildcards)
     * @param string $name The JavaScript objectname
     *
     * @return string The JavaScript Object
     */
    public function getObject($path, $name)
    {
        return $this->container->get('libbit_yui.templating.helper.handlebars')->getObject($path, $name);
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'handlebars';
    }
}