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
 * Get a list of MailChimp campaigns
 * http://apidocs.mailchimp.com/1.3/campaigns.func.php
 *
 * @package chimpx
 * @subpackage processors
 */

$api = new MCAPI($modx->getOption('chimpx_apikey'));

// grid pagination
$start = $modx->getOption('start',$_REQUEST,0);
$limit = $modx->getOption('limit',$_REQUEST,20);

// filters to apply to the query
$filters = array();

$campaigns = $api->campaigns($filters,$start,$limit);

if ($api->errorCode){
    $modx->log(modX::LOG_LEVEL_ERROR, 'Uhoh, error n#: '. $api->errorCode .' message: '. $api->errorMessage);
    return $modx->error->failure('error n#: '. $api->errorCode .' message: '. $api->errorMessage);
} else {
    $count = $campaigns['total'];

    $list = array();
    foreach ($campaigns['data'] as $campaign) {
        $list[] = $campaign;
    }
    return $this->outputArray($list,$count);
}