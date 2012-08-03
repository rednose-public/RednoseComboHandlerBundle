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

/**
 * Wrapper for the minifier
 */
class CoreController extends Controller
{
    /**
     * Minify
     * 
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function comboAction()
    {
        if (in_array($this->container->getParameter('kernel.environment'), array('test', 'dev'))) {
            //$min_serveOptions['debug'] = true;
        }

        $min_serveOptions['quiet'] = true;


        $min_errorLogger = false;
        $min_allowDebugFlag = true;
        $min_cacheFileLocking = true;
        $min_symlinks = array();
        $min_uploaderHoursBehind = 0;
        $min_libPath = dirname('/Library/WebServer/Documents/docgen-standard/vendor/oyatel/minify/min/index.php') . '/lib';
        ini_set('zlib.output_compression', '0');

        define('MINIFY_MIN_DIR', dirname('/Library/WebServer/Documents/docgen-standard/vendor/oyatel/minify/min/index.php'));
        set_include_path($min_libPath . PATH_SEPARATOR . get_include_path());

        require 'Minify.php';

        \Minify::$uploaderHoursBehind = $min_uploaderHoursBehind;
        \Minify::setCache(
                isset($min_cachePath) ? $min_cachePath : ''
                , $min_cacheFileLocking
        );

        $min_serveOptions['minifierOptions']['text/css']['symlinks'] = $min_symlinks;
        // auto-add targets to allowDirs
        foreach ($min_symlinks as $uri => $target) {
            $min_serveOptions['minApp']['allowDirs'][] = $target;
        }

        if ($min_allowDebugFlag) {
            require_once 'Minify/DebugDetector.php';
            $min_serveOptions['debug'] = \Minify_DebugDetector::shouldDebugRequest($_COOKIE, $_GET, $_SERVER['REQUEST_URI']);
        }

        if ($min_errorLogger) {
            require_once 'Minify/Logger.php';
            if (true === $min_errorLogger) {
                require_once 'FirePHP.php';
                $min_errorLogger = FirePHP::getInstance(true);
            }
            Minify_Logger::setLogger($min_errorLogger);
        }

        // check for URI versioning
        if (preg_match('/&\\d/', $_SERVER['QUERY_STRING'])) {
            $min_serveOptions['maxAge'] = 31536000;
        }
        if (isset($_GET['g'])) {
            // well need groups config
            $min_serveOptions['minApp']['groups'] = (require MINIFY_MIN_DIR . '/groupsConfig.php');
        }

        if (isset($_GET['f']) || isset($_GET['g'])) {
            require 'Minify/Controller/MinApp.php';

            $min_serveController = new \Minify_Controller_MinApp();
            $response = (\Minify::serve($min_serveController, $min_serveOptions));
        } else {
            header("Location: /");
            exit();
        }

        return new Response($response['content'], $response['statusCode'], $response['headers']);
    }
}
