<?php

/*
 * This file is part of the LibbitYuiBundle package.
 *
 * (c) RedNose <info@rednose.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Libbit\YuiBundle\Tests\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Libbit\YuiBundle\DependencyInjection\LibbitYuiExtension;

class LibbitYuiExtensionTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @expectedException \Symfony\Component\Config\Definition\Exception\InvalidConfigurationException
     */
    public function testVersionNumberNotSet()
    {
        $loader = new LibbitYuiExtension();
        $container = new ContainerBuilder();
        $config = array();

        $loader->load(array($config), $container);
    }

    /**
     * @expectedException \Symfony\Component\Config\Definition\Exception\InvalidConfigurationException
     */
    public function testVersionNotAvailable()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );
    }
}
