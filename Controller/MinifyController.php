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

        $request = $this->get('request');
        $files = array_keys($request->query->all());

        // asset('bundles/libbityui')|trim('/')
        array_walk($files, function (&$file) {
            $groups = array(
                'libbit' => array(
                    'filter' => 'DEBUG',
                    'pattern' => 'libbit-',
                    'base' => '/libbityui/',
                    'root' => 'yui3-libbit/build/'
                ),
                'docgenadmin' => array(
                    'filter' => 'DEBUG',
                    'pattern' => 'docgenadmin-',
                    'base' => '/docgenadmin/js/',
                    'root' => 'docgenadmin/build/'
                ),
            );

            $base = 'docgen-standard/web/bundles';

            $file = str_replace(array('_js', '_css'), array('.js', '.css'), $file);

            $group = null;

            foreach ($groups as $g) {
                $pattern = $g['pattern'];
                $root = $g['root'];

                if (substr($file, strlen($root), strlen($pattern)) === $pattern) {
                    $group = $g;
                }
            }

            if ($group !== null) {
                $file = $base.$group['base'].$file;
            } else {
                $file = $base.'/libbityui/'.$file;
            }
        });

        $_GET = array();
        $_GET['f'] = implode(',', $files);

        ini_set('zlib.output_compression', '0');

        $serveController = new \Minify_Controller_MinApp();

        $response = \Minify::serve($serveController, $this->getOptions());

        return new Response($response['content'], $response['statusCode'], $response['headers']);
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
            // Don't minify in prod, just combine. 'minifiers' => array(
            $options['minifiers'] = array(
                \Minify::TYPE_CSS => '',
                \Minify::TYPE_JS  => '',
            );
        }

        return $options;
    }
}
