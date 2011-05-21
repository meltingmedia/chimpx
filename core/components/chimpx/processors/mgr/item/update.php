<?php
/**
 * chimpx
 *
 * Copyright 2011 by Romain Tripault <romain@meltingmedia.net>
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
 * Update an Item
 * 
 * @package chimpx
 * @subpackage processors
 */
/* get board */
if (empty($scriptProperties['id'])) return $modx->error->failure($modx->lexicon('chimpx.item_err_ns'));
$item = $modx->getObject('chimpxItem',$scriptProperties['id']);
if (!$item) return $modx->error->failure($modx->lexicon('chimpx.item_err_nf'));

$item->fromArray($scriptProperties);

if ($item->save() == false) {
    return $modx->error->failure($modx->lexicon('chimpx.item_err_save'));
}

/* output */
$itemArray = $item->toArray('',true);
return $modx->error->success('',$itemArray);

$api = new MCAPI($modx->getOption('chimpx_apikey'));


$retval = $api->campaigns(array('campaign_id' => 'ea21fab39b'),$start,$limit);

if ($api->errorCode){
    return 'error';
} else {
    //echo sizeof($retval['total'])." Total Campaigns Matched.\n";
    //echo sizeof($retval['data'])." Total Campaigns returned:\n";    
/*    
    foreach($retval['data'] as $c){
        echo "Campaign Id: ".$c['id']." - ".$c['title']."\n";
        echo "\tStatus: ".$c['status']." - type = ".$c['type']."\n";
        echo "\tsent: ".$c['send_time']." to ".$c['emails_sent']." members\n";
    }
*/
    $count = $retval['total'];

    $list = array();
    foreach ($retval['data'] as $item) {
        //$itemArray = $item->toArray();
        //$itemArray = $item;
        //$list[] = $itemArray;
        $list[] = $item;
    }
    return $this->outputArray($list,$count);
}