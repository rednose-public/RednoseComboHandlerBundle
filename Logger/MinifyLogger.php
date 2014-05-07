<?php

/*
 * This file is part of the RednoseCdnBundle package.
 *
 * (c) RedNose <http://www.rednose.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Rednose\CdnBundle\Logger;

class MinifyLogger
{
    static function getInstance($bool)
    {
        return new MinifyLogger;
    }

    public function log($msg)
    {
        throw new \Exception('Minify says:' . $msg);
    }
}
