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

    public function setUp()
    {
        $this->setDocumentRoot(__DIR__.'/web/');
        $this->setQuery('');

        $this->container = $this->getMock('Symfony\Component\DependencyInjection\ContainerInterface');

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
            ->will($this->returnCallback(function ($id) use ($kernel, $router) {
                switch ($id) {
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

    public function testNoFilesReturnsBadRequest()
    {
        $response = $this->controller->comboAction();

        $this->assertEquals(400, $response->getStatusCode());
    }

    public function testNonExistingFileReturnsBadRequest()
    {
        $this->setQuery('css/non-existent.css');

        $response = $this->controller->comboAction();

        $this->assertEquals(400, $response->getStatusCode());
    }

    public function testGetCssFile()
    {
        $this->setQuery('css/blue.css');

        $response = $this->controller->comboAction();

        $this->assertEquals($response->headers->get('Content-Type'), 'text/css; charset=utf-8');
        $this->assertEquals($this->getContent('blue', 'css'), $response->getContent());
    }

    public function testGetCssFiles()
    {
        $this->setQuery('css/blue.css&css/red.css&css/yellow.css');

        $expected = $this->getContent('blue', 'css').$this->getContent('red', 'css').$this->getContent('yellow', 'css');

        $response = $this->controller->comboAction();

        $this->assertEquals($response->headers->get('Content-Type'), 'text/css; charset=utf-8');
        $this->assertEquals($expected, $response->getContent());
    }

    public function testGetJsFile()
    {
        $this->setQuery('js/console.js');

        $response = $this->controller->comboAction();

        $this->assertEquals($response->headers->get('Content-Type'), 'application/x-javascript; charset=utf-8');
        $this->assertEquals($this->getContent('console', 'js'), $response->getContent());
    }

    public function testGetJsFiles()
    {
        $this->setQuery('js/console.js&js/debug.js&js/info.js');

        $separator = "\n;";

        $expected = $this->getContent('console', 'js').$separator.$this->getContent('debug', 'js').$separator.$this->getContent('info', 'js');

        $response = $this->controller->comboAction();

        $this->assertEquals($response->headers->get('Content-Type'), 'application/x-javascript; charset=utf-8');
        $this->assertEquals($expected, $response->getContent());
    }

    public function testGetCssFileFromCustomRoot()
    {
        $this->setQuery('blue.css');

        $response = $this->controller->comboAction('css');

        $this->assertEquals($response->headers->get('Content-Type'), 'text/css; charset=utf-8');
        $this->assertEquals($this->getContent('blue', 'css'), $response->getContent());
    }

    public function testGetJsFileFromCustomRoot()
    {
        $this->setQuery('console.js');

        $response = $this->controller->comboAction('js');

        $this->assertEquals($response->headers->get('Content-Type'), 'application/x-javascript; charset=utf-8');
        $this->assertEquals($this->getContent('console', 'js'), $response->getContent());
    }

    public function testInvalidRootReturnsBadRequest()
    {
        $this->setQuery('blue.css');

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

    /**
     * @param string $query
     */
    protected function setQuery($query)
    {
        $_SERVER['QUERY_STRING'] = $query;
    }
}
