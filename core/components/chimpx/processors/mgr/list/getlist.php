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
 * Get a list of MailChimp lists
 *
 * @package chimpx
 * @subpackage processors
 */

$isLimit = !empty($_REQUEST['limit']);
$start = $modx->getOption('start',$_REQUEST,0);
$limit = $modx->getOption('limit',$_REQUEST,20);


$api = new MCAPI($modx->getOption('chimpx_apikey'));

$mcLists = $api->lists('',$start,$limit);

if ($api->errorCode){
    $modx->log(modX::LOG_LEVEL_ERROR, 'error n#: '. $api->errorCode .' message: '. $api->errorMessage);
    return $modx->error->failure('error n#: '. $api->errorCode .' message: '. $api->errorMessage);
} else {

    $count = $mcLists['total'];

    $list = array();
    foreach ($mcLists['data'] as $mcList) {

        $mcList['member_count'] = $mcList['stats']['member_count'];
        unset($mcList['stats']['member_count']);

        $list[] = $mcList;
    }
    return $this->outputArray($list,$count);
}
$filters = array();
    $filters['exact'] = $scriptProperties['exact'];

$mcLists = $api->lists($filter,$start,$limit);

if ($api->errorCode){
    $modx->log(modX::LOG_LEVEL_ERROR, 'Uhoh, error n#: '. $api->errorCode .' message: '. $api->errorMessage);
    return $modx->error->failure('error n#: '. $api->errorCode .' message: '. $api->errorMessage);
} else {

    $count = $mcLists['total'];

    $list = array();
    foreach ($mcLists['data'] as $mcList) {
// @TODO: grab infos from stats & modules arrays
/*
        $mcList['member_count'] = $mcList['stats']['member_count'];
        unset($mcList['stats']['member_count']);
*/
        $list[] = $mcList;
    }
    return $this->outputArray($list,$count);
}