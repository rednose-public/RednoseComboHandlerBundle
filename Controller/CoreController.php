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
use Assetic\Asset\FileAsset;
use Libbit\YuiBundle\Exception\Exception;

/**
 * Wrapper for the minifier
 */
class CoreController extends Controller
{
    /**
     * Minify a request of JavaScript/CSS files
     * 
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function comboAction()
    {
        if (in_array($this->container->getParameter('kernel.environment'), array('test', 'dev'))) {
            $serveOptions['debug'] = true;
        }

        $serveOptions['quiet'] = true;

        $errorLogger = false;
        $allowDebugFlag = true;
        $cacheFileLocking = true;
        $symlinks = array();
        $uploaderHoursBehind = 0;
        ini_set('zlib.output_compression', '0');

        \Minify::$uploaderHoursBehind = $uploaderHoursBehind;
        \Minify::setCache('', $cacheFileLocking);

        $serveOptions['minifierOptions']['text/css']['symlinks'] = $symlinks;

        // Auto-add targets to allowDirs
        foreach ($symlinks as $target) {
            $serveOptions['minApp']['allowDirs'][] = $target;
        }

        if ($allowDebugFlag) {
            $serveOptions['debug'] = \Minify_DebugDetector::shouldDebugRequest($_COOKIE, $_GET, $_SERVER['REQUEST_URI']);
        }

        if ($errorLogger) {
            if (true === $errorLogger) {
                $errorLogger = FirePHP::getInstance(true);
            }

            Minify_Logger::setLogger($errorLogger);
        }

        if (!isset($_GET['f'])) {
            throw new Exception('No files requested.');
        }

        $serveController = new \Minify_Controller_MinApp();
        $response = \Minify::serve($serveController, $serveOptions);

        return new Response($response['content'], $response['statusCode'], $response['headers']);
    }

    /**
     * Generates the YUI_config JavaScript object for the configured YUI version.
     * 
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function configAction()
    {
        $response = new Response(null, 200, array(
            'Content-type' => 'application/x-javascript',
        ));

        // FIXME: Load from service container
        $groups = json_decode(file_get_contents('/Library/WebServer/Documents/docgen-standard/vendor/libbit/docgen-bundle/Libbit/DocgenBundle/Resources/public/yui/config.json'), true);

        return $this->render('LibbitYuiBundle:Core:config.js.twig', array(
            'version' => (string) $this->container->getParameter('libbit_yui.version'),
            'base_uri' => substr($this->get('templating.helper.assets')->getUrl('bundles/libbityui'), 1), // Strip the leading '/'
            'groups' => $groups,
        ), $response);
    }

    /**
     * Returns the YUI seed file for the configured YUI version.
     * 
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function seedAction()
    {
        $seedAsset = new FileAsset('bundles/libbityui/yui'.(string) $this->container->getParameter('libbit_yui.version').'/yui/yui-min.js');

        return new Response($seedAsset->dump(), 200, array(
            'Content-type' => 'application/x-javascript',
        ));
    }
}
