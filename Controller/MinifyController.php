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
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\Routing\Router;

/**
 * Controller for the Minifier
 */
class MinifyController extends Controller
{
    /**
     * Minify a request of JavaScript/CSS files
     *
     * @param string $root
     *
     * @return Response
     *
     * @Route("/combo/{root}", name="rednose_combo_handler_combo", defaults={"root" = null})
     * @Method({"GET"})
     */
    public function comboAction($root = null)
    {
        $roots = $this->getRoots();

        if ($root && !array_key_exists($root, $roots)) {
            return new Response('', 400);
        }

        ini_set('zlib.output_compression', '0');

        \Minify::$uploaderHoursBehind = 0;
        \Minify::setCache('', true);

        if ($this->get('kernel')->isDebug()) {
            \Minify_Logger::setLogger(new MinifyLogger());
        }

        // Hook into the GET request and format it according to Minify standards.
        $files = array_keys($this->getRequest()->query->all());

        foreach ($files as &$file) {
            $file = str_replace(array('_js', '_css'), array('.js', '.css'), $file);
        }

        $_GET['f'] = implode(',', $files);

        $response = \Minify::serve(
            new \Minify_Controller_MinApp(),
            $this->getOptions($root && isset($roots[$root]) ? $roots[$root] : null)
        );

        return new Response($response['content'], $response['statusCode'], $response['headers']);
    }

    /**
     * @param string $root
     *
     * @return array
     */
    protected function getOptions($root = null)
    {
        $_SERVER['DOCUMENT_ROOT'] .= $this->getBaseUrl();

        if ($root) {
            $_SERVER['DOCUMENT_ROOT'] .= '/'.$root;
        }

        return array(
            // Output an array of data instead of returning headers/content.
            'quiet' => true,

            // Allow all files inside the Symfony root folder to be accessed.
            'minApp' => array('allowDirs' => array(
                __DIR__ . '/../../../../../../',
                $_SERVER['DOCUMENT_ROOT']
            )),

            // Don't minify, we're just providing a combo service.
            'minifiers' => array(
                \Minify::TYPE_CSS => '',
                \Minify::TYPE_JS  => '',
            ),
        );
    }

    /**
     * Returns the normalized base URL.
     *
     * @return string
     */
    protected function getBaseUrl()
    {
        return str_replace('app_dev.php', '', $this->container->get('router')->getContext()->getBaseUrl());
    }

    /**
     * @return array
     */
    protected function getRoots()
    {
        return $this->container->getParameter('rednose_combo_handler.roots');
    }
}
