<?php

/*
 * This file is part of the RednoseCdnBundle package.
 *
 * (c) RedNose <http://www.rednose.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Rednose\CdnBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;

use Rednose\CdnBundle\DependencyInjection\Compiler\GroupPass;

/**
 * @author Marc Bontje <marc@rednose.nl>
 * @author Sven Hagemann <sven@rednose.nl>
 */
class RednoseCdnBundle extends Bundle
{
    /**
     * {@inheritdoc}
     */
    public function build(ContainerBuilder $container)
    {
    }
}
