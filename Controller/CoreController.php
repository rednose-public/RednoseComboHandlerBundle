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

/**
 * Wrapper for the minifier
 */
class CoreController extends Controller
{
    /**
     * Minify
     * 
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function comboAction()
    {
        // FIXME: Create a wrapper
        require '/Library/WebServer/Documents/docgen-standard/vendor/oyatel/minify/min/index.php';
        exit;

        return new Response();
    }
}
