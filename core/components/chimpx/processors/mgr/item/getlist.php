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
 * Get a list of Items
 *
 * @package chimpx
 * @subpackage processors
 */

$isLimit = !empty($_REQUEST['limit']);
$start = $modx->getOption('start',$_REQUEST,0);
$limit = $modx->getOption('limit',$_REQUEST,20);
/*
$sort = $modx->getOption('sort',$_REQUEST,'name');
$dir = $modx->getOption('dir',$_REQUEST,'ASC');

$c = $modx->newQuery('chimpxItem');
$count = $modx->getCount('chimpxItem',$c);

$c->sortby($sort,$dir);
if ($isLimit) $c->limit($limit,$start);
$items = $modx->getCollection('chimpxItem',$c);
*/

require_once '/home/dev/lepimentbleu.fr/chimpx/core/components/chimpx/model/mailchimp-api-class/examples/inc/MCAPI.class.php';
$apikey = $modx->getOption('chimpx_apikey');

$api = new MCAPI($apikey);

$retval = $api->campaigns('',$start,$limit);

if ($api->errorCode){
    //echo "Unable to Pull list of Campaign!";
    //echo "\n\tCode=".$api->errorCode;
    //echo "\n\tMsg=".$api->errorMessage."\n";
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


