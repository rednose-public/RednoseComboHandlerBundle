<?php

namespace Libbit\YuiBundle\Twig\Extension;

use Libbit\YuiBundle\Exception\Exception;

/**
 * Inserts the YUI JavaScript files into the header.
 */
class YuiExtension extends \Twig_Extension
{
    protected $dom;
    protected $container;
    protected $request;

    /**
     * Constructor.
     * 
     * @param type $container The service container
     */
    public function __construct($container)
    {
        $this->container = $container;
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return array(
            'yui' => new \Twig_Filter_Method($this, 'yuiLoader', array('is_safe' => array('all')))
       );
    }

    /**
     * Returns a JavaScript string that can be injected into an HTML header
     * 
     * @param array  $context   The Twig context, passed manually
     * @param string $bundle    The name of the bundle, passed manually
     * @param bool   $yuiLoader Wether to include the YUI seed files
     *
     * @return string The JavaScript inclusion string
     */
    public function yuiLoader($context, $bundle, $yuiLoader)
    {
        $href = array();
        $buffer = '';

        $this->request = $this->container->get('request');

        $controllerRoute = $this->getRoute();
        $controllerAction = $this->getRoute(true);

        $controller = substr($controllerRoute, strrpos($controllerRoute, "\\") + 1);

        if ($yuiLoader) {
            $publicPath = $this->request->getBasePath() . '/bundles/' . preg_replace('/bundle$/', '', strtolower($bundle));

            //$href[] = $publicPath . '/js/yui.js?path=' . strtolower(str_replace('Controller', '', $controller)) . '-' . $controllerAction;

            $publicPath = $this->request->getBasePath() . '/bundles/' . preg_replace('/bundle$/', '', strtolower('LibbitYuiBundle'));

            $href[] = $publicPath . '/yui' . (string) $this->container->getParameter('libbit_yui.version') . '/yui/yui-min.js';
            $href[] = $publicPath . '/yui-settings.js?locale=' . $this->container->get('session')->getLocale();
        }

        $href[] = $this->request->getBaseUrl() . '/javascript/' . $controller . '.js?section=' . $controllerAction;

        foreach ($href as $src) {
            $buffer .= '<script src="' . $src . '" /></script>' . "\r\n";
        }

        $this->storeVariable($context, $controller, $controllerAction, $bundle);

        return $buffer;
    }

    protected function getPath()
    {
        return $this->container->get('kernel')->getBundle('LibbitYuiBundle')->getPath();
    }

    private function storeVariable($context, $controller, $controllerAction, $bundle)
    {
        $variable = array();
        $session = $this->container->get('session');

        foreach ($context as $key => $value) {
            if (gettype($value) == 'object' && get_class($value) != 'Symfony\Bundle\FrameworkBundle\Templating\GlobalVariables') {
                $variable[$key] = $value;
            }

            if (gettype($value) == 'string' || gettype($value) == 'array') {
                $variable[$key] = $value;
            }
        }

        $session->set('YuiResource-' . $controller . '-' . strtolower($controllerAction), $variable);
        $session->set('YuiResource-BundleName', $bundle);
    }

    private function getRoute($action = false)
    {
        $routeAttributes = $this->request->attributes->all();

        $route = explode("::", $routeAttributes['_controller']);

        if (count($route) < 2) {
            throw new Exception('Route controller path not correct.');
        }

        if ($action) {
            return str_replace('Action', '', $route[1]);
        }

        return $route[0];
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'yui';
    }
}
