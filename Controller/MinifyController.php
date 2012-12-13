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
    protected $errorLogger = true;

    protected $cacheFileLocking = true;

    protected $uploaderHoursBehind = 0;

    /**
     * Minify a request of JavaScript/CSS files
     *
     * @return Response
     */
    public function comboAction()
    {
        $errorLogger = $this->errorLogger;
        $cacheFileLocking = $this->cacheFileLocking;
        $uploaderHoursBehind = $this->uploaderHoursBehind;

        \Minify::$uploaderHoursBehind = $uploaderHoursBehind;
        \Minify::setCache('', $cacheFileLocking);

        if ($errorLogger) {
            $errorLogger = MinifyLogger::getInstance(true);
            \Minify_Logger::setLogger($errorLogger);
        }

        ini_set('zlib.output_compression', '0');

        $serveController = new \Minify_Controller_MinApp();

        $this->rewriteRequest();
        $response = \Minify::serve($serveController, $this->getOptions());

        return new Response($response['content'], $response['statusCode'], $response['headers']);
    }

    protected function rewriteRequest()
    {
        $config = $this->get('libbit_yui.config');
        $files = array_keys($this->get('request')->query->all());

        foreach ($files as &$file) {
            $file  = str_replace(array('_js', '_css'), array('.js', '.css'), $file);
            $group = $config->getByPath($file);
            $base  = $group ? $group->base : 'components';

            $file = $base.'/'.$file;
        }

        $_GET = array();
        $_GET['b'] = trim($this->get('templating.helper.assets')->getUrl(''), '/');
        $_GET['f'] = implode(',', $files);
    }

    protected function getOptions()
    {
        $env = $this->get('kernel')->getEnvironment();

        $options = array(
            // Output an array of data instead returning headers/content
            'quiet' => true,
            'debug' => $env === 'dev',
        );

        if ($env === 'prod') {
            // Don't minify in prod, the script is already minified.
            $options['minifiers'] = array(
                \Minify::TYPE_JS  => '',
            );
        }

        return $options;
    }
}
