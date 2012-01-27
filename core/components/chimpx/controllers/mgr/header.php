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
 * Loads the header for mgr pages.
 *
 * @var modX $modx
 * @var chimpx $chimpx
 * @package chimpx
 * @subpackage controllers
 */
//$modx->regClientCSS($chimpx->config['cssUrl'].'mgr.css');
$modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/chimpx.js');
$modx->regClientStartupHTMLBlock('<script type="text/javascript">
Ext.onReady(function() {
    chimpx.config = '.$modx->toJSON($chimpx->config).';
    chimpx.config.connector_url = "'.$chimpx->config['connectorUrl'].'";
    chimpx.action = "'.(!empty($_REQUEST['a']) ? $_REQUEST['a'] : 0).'";
});
</script>');

return '';