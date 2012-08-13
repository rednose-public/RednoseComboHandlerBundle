<?php

/*
 * This file is part of the LibbitYuiBundle package.
 *
 * (c) RedNose <info@rednose.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Libbit\YuiBundle\Templating\Helper;

use Assetic\Asset\GlobAsset;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Templating\Helper\Helper;

/**
 * Helper class for the Minifier
 */
class HandlebarsHelper extends Helper
{
    protected $container;

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
     * Returns a JavaScript Object with Handlebars templates.
     *
     * @param string $path One or more paths (supports wildcards)
     * @param string $name The JavaScript objectname
     *
     * @return string The JavaScript Object
     */
    public function getObject($path, $name)
    {
        $object = $name.' = {};';
        $glob   = new GlobAsset($path);

        foreach ($glob as $js) {
            $key   = substr($js->getSourcePath(), 0, -11);           // Strip the 'handlebars' extension
            $value = str_replace("\n", '', addslashes($js->dump())); // Sanitize the HTML string

            $object .=  $name.'["'.$key.'"]'.'="'.$value.'";';
        }

        return $object;
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'handlebars';
    }
}
