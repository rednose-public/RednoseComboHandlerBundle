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

class JavascriptController extends Controller
{
    public function indexAction($file)
    {
        $session = $this->get('session');
        $controller = substr($file, 0, strpos($file, 'Controller'));
        $section = strtolower($this->get('request')->get('section'));

        $bundleName = $session->get('YuiResource-BundleName');
        $twigContext = $session->get('YuiResource-' . $controller . 'Controller-' . $section);

        if (in_array($this->get('kernel')->getEnvironment(), array('test', 'dev')) === false) {
            $session->remove('YuiResource-' . $controller . 'Controller-' . $section);
            $session->remove('YuiResource-BundleName');
        }

        $response = new Response(null, 200, array(
            'Content-Type' => 'text/javascript',
        ));

        $javascriptPath = $this->get('kernel')->getBundles();
        $javascriptPath = $javascriptPath[$bundleName]->getPath();
        $javascriptPath = $javascriptPath . '/Resources/views/' . $controller . '/';

        if (file_exists($javascriptPath . $section . '.js.twig') !== false) {
            return $this->render($bundleName . ':' . $controller . ':' . $section . '.js.twig', $twigContext, $response);
        }

        if (file_exists($javascriptPath . strtolower($controller) . '.js.twig') !== false) {
            return $this->render($bundleName . ':' . $controller . ':' . strtolower($controller) . '.js.twig', $twigContext, $response);
        }

        return $response;
    }
}
