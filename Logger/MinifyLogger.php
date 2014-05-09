<?php

/*
 * This file is part of the RednoseComboHandlerBundle package.
 *
 * (c) RedNose <http://www.rednose.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Rednose\ComboHandlerBundle\Logger;

class MinifyLogger
{
    /**
     * @param string $msg
     *
     * @return MinifyLogger
     *
     * @throws \Exception when the request is invalid
     */
    public function log($msg)
    {
        throw new \Exception($msg);
    }
}
