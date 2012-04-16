<?php

namespace Libbit\YuiBundle\Twig\Extension;

use Libbit\RologenBundle\Exception\Exception;
use Symfony\Bundle\AsseticBundle\Templating\AsseticHelper;

class YuiExtension extends \Twig_Extension
{
    protected $dom;
    protected $container;
    protected $request;

    public function __construct($container)
    {
        $this->container = $container;
    }
    
    public function getFunctions()
    {        
        return array(
            'yui' => new \Twig_Filter_Method($this, 'yuiLoader', array('is_safe' => array('all')))
       );
    }

    public function yuiLoader($context, $bundle, $version, $yuiLoader)
    {
        $href = array();
        $buffer = '';
        
        $this->request = $this->container->get('request');

        $controller = $this->getRoute();
        $controllerObject = new $controller;
        $controllerAction = $this->getRoute(true);
        
        $controller = substr($controller, strrpos($controller, "\\") + 1);
        
        if ($yuiLoader) {
            $publicPath = $this->request->getBasePath() . '/bundles/' . preg_replace('/bundle$/', '', strtolower($bundle));
            
            $href[] = $publicPath . '/js/yui.js';            

            $publicPath = $this->request->getBasePath() . '/bundles/' . preg_replace('/bundle$/', '', strtolower('LibbitYuiBundle'));
            
            $href[] = $publicPath . '/yui' . $version . '/yui/yui-min.js';
            $href[] = $publicPath . '/yui-settings.js?locale=' . $this->container->get('session')->getLocale();
        }
        
        $href[] = $this->request->getBaseUrl() . '/javascript/' . $controller . '.js?section=' . $controllerAction;
        
        foreach ($href as $src) {
            $buffer .= '<script src="' . $src . '" /></script>' . "\r\n";
        }        
        
        $this->storeVariable($context, $controller, $controllerAction, $bundle);
        
        return $buffer;
    }

    private function yuiComponentLoader($components) {
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
        $routeAttributes = $this->request->attributes;
        $routeAttributes = $routeAttributes->all();
        $route = explode("::", $routeAttributes['_controller']);
        
        if (count($route) > 1) {
            if ($action) {
                $route = str_replace('Action', '', $route[1]);
            } else {
                $route = $route[0];
            }
        } else {
            throw new Exception('Route controller path not correct.');
        }

        return $route;
    }

    public function getName()
    {
        return 'yui';
    }
}
