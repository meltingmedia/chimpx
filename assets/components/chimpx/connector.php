<?php
/**
 * chimpx
 *
 * Copyright 2011 by Romain Tripault <romain@melting-media.com>
 *
 * chimpx is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * chimpx is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * chimpx; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * @package chimpx
 */
/**
 * chimpx Connector
 *
 * @var modX $modx
 * @var chimpx $chimpx
 * @package chimpx
 */
require_once dirname(dirname(dirname(dirname(__FILE__)))). '/config.core.php';
require_once MODX_CORE_PATH. 'config/'. MODX_CONFIG_KEY .'.inc.php';
require_once MODX_CONNECTORS_PATH. 'index.php';

$corePath = $modx->getOption('chimpx.core_path', null, $modx->getOption('core_path'). 'components/chimpx/');
require_once $corePath. 'model/chimpx/chimpx.class.php';
$modx->chimpx = new chimpx($modx);

$modx->lexicon->load('chimpx:default');

/* handle request */
$path = $modx->getOption('processorsPath', $modx->chimpx->config, $corePath. 'processors/');
$modx->request->handleRequest(array(
    'processors_path' => $path,
    'location' => '',
));