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
 * Loads the campaign creation/edition page.
 *
 * @var modX $modx
 * @var chimpx $chimpx
 * @package chimpx
 * @subpackage controllers
 */

$record = array();
$create = empty($_REQUEST['id']) ? true : false;

if (!$create) {
    // We are editing a campaign, load its data
}

/*$modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/widgets/lists.grid.js');
//$modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/widgets/campaign.wizard.js');
$modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/widgets/campaigns.grid.js');*/
$modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/widgets/core/chimpx.combos.js');
$modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/widgets/campaign/campaign.panel.js');
$modx->regClientStartupScript($chimpx->config['jsUrl'].'mgr/sections/campaign.js');

$modx->regClientStartupHTMLBlock('
<script type="text/javascript">
// <![CDATA[
Ext.onReady(function() {
    //MODx.add("chimpx-page-campaign");
    MODx.load({
        xtype: "chimpx-page-campaign"
        ,record: '. $modx->toJSON($record) .'
    });
});
// ]]>
</script>');

$output = '<div id="chimpx-panel-campaign-div"></div>';
return $output;