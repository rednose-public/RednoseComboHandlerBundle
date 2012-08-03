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
 */
class YuiConfig
{
    protected $base;

    protected $modules;

    public function __construct($base, $modules)
    {
        $this->base = $base;
        $this->modules = $modules;
    }

    public function getConfig()
    {
        return array('template' => array(
            'base' => 'http://localhost/docgen-standard/web/app.php/yui/combo?b='.$this->base.'&f=',
            'modules' => $this->modules,
        ));
    }
}
