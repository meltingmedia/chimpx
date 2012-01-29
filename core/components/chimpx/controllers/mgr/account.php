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
 * Loads the account details page.
 * http://apidocs.mailchimp.com/api/1.3/getaccountdetails.func.php
 *
 * @var modX $modx
 * @var chimpx $chimpx
 * @package chimpx
 * @subpackage controllers
 */
// @todo: check use of ACLs
$data = $chimpx->mc->getAccountDetails();

$contact = $data['contact'];
$modules = $data['modules'];
$orders = $data['orders'];
$rewards = $data['rewards'];
unset ($data['contact'], $data['modules'], $data['orders'], $data['rewards']);

$modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/widgets/account/account.panel.js');
$modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/sections/account.js');

$modx->regClientStartupHTMLBlock('
<script type="text/javascript">
// <![CDATA[
Ext.onReady(function() {
    //MODx.add("chimpx-page-account");
    MODx.load({
        xtype: "chimpx-page-account"
        ,record: '. $modx->toJSON($data) .'
        ,contact: '. $modx->toJSON($contact) .'
        ,modules: '. $modx->toJSON($modules) .'
        ,orders: '. $modx->toJSON($orders) .'
        ,rewards: '. $modx->toJSON($rewards) .'
    });
});
// ]]>
</script>');

$output = '<div id="chimpx-panel-account-div"></div>';
return $output;