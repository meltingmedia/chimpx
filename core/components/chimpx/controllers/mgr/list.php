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
 * Loads the list details page.
 * http://apidocs.mailchimp.com/api/1.3/lists.func.php
 *
 * @var modX $modx
 * @var chimpx $chimpx
 * @package chimpx
 * @subpackage controllers
 */
// @todo: make use of ACLs
$cid = $modx->getOption('id', $_GET, false);
$filters = array();
$filters['list_id'] = $cid;

$data = $chimpx->getLists($filters);
$record = $chimpx->displayLists($data, true, true);

if ($record[0]['locations'] && count($record[0]['locations']) >= 1) $modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/widgets/list/locations.grid.js');
$modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/widgets/core/chimpx.combos.js');
$modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/widgets/list/subscribers.grid.js');
$modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/widgets/list/mergevars.grid.js');
$modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/widgets/list/list.panel.js');
$modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/sections/list.js');

$modx->regClientStartupHTMLBlock('
<script type="text/javascript">
// <![CDATA[
Ext.onReady(function() {
    MODx.load({
        xtype: "chimpx-page-list"
        ,record: '. $modx->toJSON($record[0]) .'
    });
});
// ]]>
</script>');

$output = '<div id="chimpx-panel-list-div"></div>';
return $output;