<?php

namespace Libbit\YuiBundle\Twig\Extension;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Routing\RouterInterface;
use Libbit\YuiBundle\Exception\Exception;

/**
 * Inserts the YUI JavaScript files into the header.
 */
class YuiExtension extends \Twig_Extension
{
    protected $dom;

    protected $container;

    protected $router;

    protected $request;

    /**
     * Constructor
     * 
     * @param \Symfony\Component\DependencyInjection\ContainerInterface $container Service container
     * @param \Symfony\Component\Routing\RouterInterface                $router    Router component
     */
    public function __construct(ContainerInterface $container, RouterInterface $router)
    {
        $this->container = $container;
        $this->router = $router;
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

        if ($yuiLoader) {
            $href[] = $this->router->generate('libbit_yui_seed');
            $href[] = $this->router->generate('libbit_yui_settings');
        }

        $this->request = $this->container->get('request');

        $controllerRoute = $this->getRoute();
        $controllerAction = $this->getRoute(true);

        $controller = substr($controllerRoute, strrpos($controllerRoute, "\\") + 1);

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
