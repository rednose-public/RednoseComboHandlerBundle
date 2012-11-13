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
     * Generates the YUI_config JavaScript object.
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function configAction()
    {
        $response = new Response(null, 200, array(
            'Content-type' => 'application/x-javascript',
        ));

        return $this->render('LibbitYuiBundle:Yui:config.js.twig', array(), $response);
    }

    /**
     * Returns the YUI seed file for the configured YUI version.
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function seedAction()
    {
        $seedAsset = new FileAsset('bundles/libbityui/yui3/build/yui/yui-min.js');

        return new Response($seedAsset->dump(), 200, array(
            'Content-type' => 'application/x-javascript',
        ));
    }
}
