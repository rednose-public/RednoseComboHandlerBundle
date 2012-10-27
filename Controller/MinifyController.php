<?php

/*
 * This file is part of the LibbitYuiBundle package.
 *
 * (c) RedNose <info@rednose.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Libbit\YuiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

use Libbit\YuiBundle\Logger\MinifyLogger;
use Libbit\YuiBundle\Exception\Exception;

/**
 * Controller for the Minifier
 */
class MinifyController extends Controller
{
    /**
     * Minify a request of JavaScript/CSS files
     *
     * @return Response
     */
    public function serveAction()
    {
        $errorLogger = true;
        $cacheFileLocking = true;
        $uploaderHoursBehind = 0;

        \Minify::$uploaderHoursBehind = $uploaderHoursBehind;
        \Minify::setCache('', $cacheFileLocking);

        if ($errorLogger) {
            if (true === $errorLogger) {
                $errorLogger = MinifyLogger::getInstance(true);
            }

            \Minify_Logger::setLogger($errorLogger);
        }

        if ($this->get('request')->get('f') === null) {
            throw new Exception('No files requested.');
        }

        ini_set('zlib.output_compression', '0');

        $serveController = new \Minify_Controller_MinApp();

        $response = \Minify::serve($serveController, $this->getOptions());

        return new Response($response['content'], $response['statusCode'], $response['headers']);
    }

    protected function getOptions()
    {
        return array(
            'quiet' => true,
            'debug' => true,
        );
    }
}
