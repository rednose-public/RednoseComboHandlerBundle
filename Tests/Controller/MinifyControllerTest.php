<?php


/*
 * This file is part of the RednoseComboHandlerBundle package.
 *
 * (c) RedNose <http://www.rednose.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Rednose\ComboHandlerBundle\Tests\Controller;

use Rednose\ComboHandlerBundle\Controller\MinifyController;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Router;
use Symfony\Component\Routing\RequestContext;

class MinifyControllerTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @var MinifyController
     */
    protected $controller;

    /**
     * @var ContainerInterface
     */
    protected $container;

    /**
     * @var Request
     */
    protected $request;

    public function setUp()
    {
        $this->setDocumentRoot(__DIR__.'/web/');

        $this->container = $this->getMock('Symfony\Component\DependencyInjection\ContainerInterface');

        $request = new Request();

        $this->request = $request;

        $kernel = $this->getMock('Symfony\Component\HttpKernel\Kernel', array(), array(), '', false, false);

        $kernel->expects($this->any())
            ->method('isDebug')
            ->will($this->returnValue(false))
        ;

        $router  = $this->getMock('Symfony\Component\Routing\Router', array(), array(), '', false, false);
        $context = $this->getMock('Symfony\Component\Routing\RequestContext');

        $router->expects($this->any())
            ->method('getContext')
            ->will($this->returnValue($context))
        ;

        $router->expects($this->any())
            ->method('getBaseUrl')
            ->will($this->returnValue('/'))
        ;

        $this->container->expects($this->any())
            ->method('get')
            ->will($this->returnCallback(function ($id) use ($request, $kernel, $router) {
                switch ($id) {
                    case 'request':
                        return $request;
                    case 'kernel':
                        return $kernel;
                    case 'router':
                        return $router;
                }

                return null;
            }))
        ;

        $roots = array(
            'css' => 'css',
            'js' => 'js'
        );

        $this->container->expects($this->any())
            ->method('getParameter')
            ->with($this->equalTo('rednose_combo_handler.roots'))
            ->will($this->returnValue($roots))
        ;

        $this->controller = new MinifyController();
        $this->controller->setContainer($this->container);
    }

    /**
     * @runInSeparateProcess
     */
    public function testNoFilesReturnsBadRequest()
    {
        $response = $this->controller->comboAction();

        $this->assertEquals(400, $response->getStatusCode());
    }

    /**
     * @runInSeparateProcess
     */
    public function testNonExistingFileReturnsBadRequest()
    {
        $this->request->query->set('css/non-existent.css', null);

        $response = $this->controller->comboAction();

        $this->assertEquals(400, $response->getStatusCode());
    }

    /**
     * @runInSeparateProcess
     */
    public function testGetCssFile()
    {
        $this->request->query->set('css/blue.css', null);

        $response = $this->controller->comboAction();

        $this->assertEquals($response->headers->get('Content-Type'), 'text/css; charset=utf-8');
        $this->assertEquals($this->getContent('blue', 'css'), $response->getContent());
    }

    /**
     * @runInSeparateProcess
     */
    public function testGetCssFiles()
    {
        $this->request->query->set('css/blue.css', null);
        $this->request->query->set('css/red.css', null);
        $this->request->query->set('css/yellow.css', null);

        $expected = $this->getContent('blue', 'css').$this->getContent('red', 'css').$this->getContent('yellow', 'css');

        $response = $this->controller->comboAction();

        $this->assertEquals($response->headers->get('Content-Type'), 'text/css; charset=utf-8');
        $this->assertEquals($expected, $response->getContent());
    }

    /**
     * @runInSeparateProcess
     */
    public function testGetJsFile()
    {
        $this->request->query->set('js/console.js', null);

        $response = $this->controller->comboAction();

        $this->assertEquals($response->headers->get('Content-Type'), 'application/x-javascript; charset=utf-8');
        $this->assertEquals($this->getContent('console', 'js'), $response->getContent());
    }

    /**
     * @runInSeparateProcess
     */
    public function testGetJsFiles()
    {
        $this->request->query->set('js/console.js', null);
        $this->request->query->set('js/debug.js', null);
        $this->request->query->set('js/info.js', null);

        $separator = "\n;";

        $expected = $this->getContent('console', 'js').$separator.$this->getContent('debug', 'js').$separator.$this->getContent('info', 'js');

        $response = $this->controller->comboAction();

        $this->assertEquals($response->headers->get('Content-Type'), 'application/x-javascript; charset=utf-8');
        $this->assertEquals($expected, $response->getContent());
    }

    /**
     * @runInSeparateProcess
     */
    public function testGetCssFileFromCustomRoot()
    {
        $this->request->query->set('blue.css', null);

        $response = $this->controller->comboAction('css');

        $this->assertEquals($response->headers->get('Content-Type'), 'text/css; charset=utf-8');
        $this->assertEquals($this->getContent('blue', 'css'), $response->getContent());
    }

    /**
     * @runInSeparateProcess
     */
    public function testGetJsFileFromCustomRoot()
    {
        $this->request->query->set('console.js', null);

        $response = $this->controller->comboAction('js');

        $this->assertEquals($response->headers->get('Content-Type'), 'application/x-javascript; charset=utf-8');
        $this->assertEquals($this->getContent('console', 'js'), $response->getContent());
    }

    /**
     * @runInSeparateProcess
     */
    public function testInvalidRootReturnsBadRequest()
    {
        $this->request->query->set('console.js', null);

        $response = $this->controller->comboAction('invalid');

        $this->assertEquals(400, $response->getStatusCode());
    }

    /**
     * @param string $key
     * @param string $type
     *
     * @return string
     *
     * @throws \InvalidArgumentException
     */
    protected function getContent($key, $type = 'js')
    {
        if (!file_exists($file = __DIR__.'/web/'.$type.'/'.$key.'.'.$type)) {
            throw new \InvalidArgumentException(sprintf('The key "%s" is not supported.', $key));
        }

        return file_get_contents($file);
    }

    /**
     * @param string $root
     */
    protected function setDocumentRoot($root)
    {
        $_SERVER['DOCUMENT_ROOT'] = $root;
    }
}
