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
    $api = new MCAPI($modx->getOption('chimpx.apikey'), true);
    $start = $modx->getOption('start', $_REQUEST, 0);
    $limit = $modx->getOption('limit', $_REQUEST, 20);

    // filters to apply to the query
    $filters = array();
    if ($_REQUEST['id']) $filters['campaign_id'] = $_REQUEST['id'];
    //if ($status) $filters['status'] = $status;

    $campaign = $api->campaigns($filters);
    if ($api->errorCode){
        $msg = $modx->lexicon('chimpx.error_info', array(
            'number' => $api->errorCode,
            'message' => $api->errorMessage,
        ));
        return $modx->error->failure($msg);
    }
    $content = $api->campaignContent($_REQUEST['id']);
    $record = $campaign['data'][0];
    $record['html'] = $content['html'];
    $record['text'] = $content['text'];
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