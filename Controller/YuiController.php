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

/**
 * Controller for the YUI seed and config
 */
class YuiController extends Controller
{
    /**
     * Generates the YUI_config JavaScript object for the configured YUI version.
     * 
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function configAction()
    {
        $configuration = $this->get('libbit_yui.config');
        $yuiConfig = $configuration->getConfig($this);

        $response = new Response(null, 200, array(
            'Content-type' => 'application/x-javascript',
        ));

        $groups = json_decode($yuiConfig['template']['json'], true);
        $version = (string) $this->container->getParameter('libbit_yui.version');
        $baseUrl = $yuiConfig['template']['base'];

        return $this->render('LibbitYuiBundle:Core:config.js.twig', array(
            'groups'   => $groups,
            'version'  => $version,
            'base_url' => $baseUrl,
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
