<?php

namespace Libbit\YuiBundle\Logger;

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
