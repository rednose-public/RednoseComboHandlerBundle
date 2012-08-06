<?php

namespace Libbit\YuiBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;

use Libbit\YuiBundle\DependencyInjection\Compiler\ConfigCompilerPass;

/**
 * @author Marc Bontje <marc@rednose.nl>
 * @author Sven Hagemann <sven@rednose.nl>
 */
class LibbitYuiBundle extends Bundle
{
    /**
     * Current Bundle and YUI version.
     *
     * @var string
     */
    const VERSION = '1.1.x-dev';

    public function build(ContainerBuilder $container)
    {
        parent::build($container);
 
        $container->addCompilerPass(new ConfigCompilerPass);
    }
}
