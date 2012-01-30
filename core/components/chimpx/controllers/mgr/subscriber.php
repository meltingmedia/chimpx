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
 * Loads the given user (address) profile & data.
 *
 * @var modX $modx
 * @var chimpx $chimpx
 * @package chimpx
 * @subpackage controllers
 */
// @todo: make use of ACLs
$email = $modx->getOption('id', $_GET, false);
$lid = $modx->getOption('list', $_GET, false);

$users = $chimpx->listMemberInfo($lid, $email);
$record = $chimpx->displayMemberInfo($users);
$record[0]['list_name'] = $chimpx->getListName($lid);
$record[0]['list_id'] = $lid;
//$modx->log(modX::LOG_LEVEL_ERROR, print_r($record, 1));

$modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/widgets/subscriber/subscriber.panel.js');
$modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/sections/subscriber.js');

$modx->regClientStartupHTMLBlock('
<script type="text/javascript">
// <![CDATA[
Ext.onReady(function() {
    MODx.load({
        xtype: "chimpx-page-subscriber"
        ,record: '. $modx->toJSON($record[0]) .'
    });
});
// ]]>
</script>');

$output = '<div id="chimpx-panel-subscriber-div"></div>';
return $output;