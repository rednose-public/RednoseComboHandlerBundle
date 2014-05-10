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

        \Minify::$uploaderHoursBehind = 0;

        if ($this->get('kernel')->isDebug()) {
            \Minify_Logger::setLogger(new MinifyLogger());
        } else {
            \Minify::setCache('', true);
        }

        // Hook into the GET request and format it according to Minify standards.

        // We can't use the PHP $_GET variable as PHP parses GET keys to PHP variables,
        // meaning characters like dots are replaced by underscores.
        $_GET['f'] = implode(',', $this->tokenizeQuery($_SERVER['QUERY_STRING']));

        $response = \Minify::serve(
            new \Minify_Controller_MinApp(),
            $this->getOptions($root && isset($roots[$root]) ? $roots[$root] : null)
        );

        return new Response($response['content'], $response['statusCode'], $response['headers']);
    }

    /**
     * Rewrite CSS URIs.
     *
     * @param string $css
     * @param array  $options
     *
     * @return string
     */
    public static function rewriteUris($css, $options = array())
    {
        // Prepend the base URL and symlink schema so the proper root path gets prepended.
        $symlinks = array();

        if (is_link($_SERVER['DOCUMENT_ROOT'])) {
            $symlinks = array(
                '/'.$options['baseUrl'] => readlink($_SERVER['DOCUMENT_ROOT'])
            );
        }

        return \Minify_CSS_UriRewriter::rewrite($css, $options['currentDir'], $_SERVER['DOCUMENT_ROOT'], $symlinks);
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
            $_SERVER['DOCUMENT_ROOT'] .= $root;
        }

        return array(
            // Output an array of data instead of returning headers/content.
            'quiet' => true,

            // Allow all files inside the Symfony root folder to be accessed.
            'minApp' => array('allowDirs' => array(
                __DIR__ . '/../../../../../../',
                $_SERVER['DOCUMENT_ROOT']
            )),

            // CSS URIs are rewritten. Don't minify JavaScript, we're just providing a combo service.
            'minifiers' => array(
                \Minify::TYPE_CSS => array('Rednose\ComboHandlerBundle\Controller\MinifyController', 'rewriteUris'),
                \Minify::TYPE_JS  => '',
            ),

            'minifierOptions' => array(
                \Minify::TYPE_CSS => array('baseUrl' => $this->getBaseUrl().$root)
            )
        );
    }

    /**
     * Returns the normalized base URL.
     *
     * @return string
     */
    protected function getBaseUrl()
    {
        $baseUrl = $this->container->get('router')->getContext()->getBaseUrl();

        if ($baseUrl === '/') {
            return '';
        }

        return rtrim(str_replace('app_dev.php', '', $this->container->get('router')->getContext()->getBaseUrl()), '/').'/';
    }

    /**
     * @return array
     */
    protected function getRoots()
    {
        return $this->container->getParameter('rednose_combo_handler.roots');
    }

    /**
     * Returns the keys within a query string.
     *
     * @param string $query
     *
     * @return array
     */
    protected function tokenizeQuery($query)
    {
        return explode('&', $query);
    }
}
