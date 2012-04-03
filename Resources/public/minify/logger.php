<?php
class minifyLogger {

    public function log($message)
    {
        trigger_error('Minify message: ' . $message);
    }

}
