<?php


/*
 * This file is part of the RednoseComboHandlerBundle package.
 *
 * (c) RedNose <http://www.rednose.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Rednose\ComboHandlerBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Rednose\ComboHandlerBundle\Logger\MinifyLogger;
use Symfony\Component\HttpKernel\Kernel;

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
    public function comboAction()
    {
        ini_set('zlib.output_compression', '0');

        \Minify::$uploaderHoursBehind = 0;
        \Minify::setCache('', true);

        if ($this->getKernel()->isDebug()) {
            \Minify_Logger::setLogger(new MinifyLogger());
        }

        $serveController = new \Minify_Controller_MinApp();
        $this->rewriteRequest();
        $response = \Minify::serve($serveController, $this->getOptions());

        return new Response($response['content'], $response['statusCode'], $response['headers']);
    }

    protected function rewriteRequest()
    {
        $files = array_keys($this->get('request')->query->all());

        foreach ($files as &$file) {
            $file  = str_replace(array('_js', '_css'), array('.js', '.css'), $file);
        }

        $baseUrl = urldecode($this->get('templating.helper.assets')->getUrl(''));

        $_GET = array();

        if ($baseUrl !== '/') {
            if (isset($_GET['b'])) {
                $_GET['b'] .= trim($baseUrl, '/');
            } else {
                $_GET['b'] = trim($baseUrl, '/');
            }
        }

        $_GET['f'] = implode(',', $files);
    }

    /**
     * @return array
     */
    protected function getOptions()
    {
        return array(
            // Output an array of data instead of returning headers/content
            'quiet' => true,

            // Allow all files inside the Symfony2 root folder to be accessed
            'minApp' => array('allowDirs' => array(
                __DIR__ . '/../../../../../../',
                $_SERVER['DOCUMENT_ROOT']
            )),

            // Don't minify, the script is already minified.
            'minifiers' => array(
                \Minify::TYPE_CSS => '',
                \Minify::TYPE_JS  => '',
            ),
        );
    }

    /**
     * @return Kernel
     */
    protected function getKernel()
    {
        return $this->get('kernel');
    }
}
