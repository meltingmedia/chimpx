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
 * Send a MailChimp campaign
 * http://apidocs.mailchimp.com/1.3/campaignsendnow.func.php
 *
 * @package chimpx
 * @subpackage processors
 */
 

$cid = isset($scriptProperties['id']) ? $scriptProperties['id'] : '';
$api = new MCAPI($modx->getOption('chimpx.apikey'));

$api->campaignSendNow($cid);

if ($api->errorCode){
    $msg = $modx->lexicon('chimpx.error_info',array('number' => $api->errorCode, 'message' => $api->errorMessage));
    $modx->log(modX::LOG_LEVEL_INFO, $msg);
    return $modx->error->failure($msg);
} else {
    $msg = $modx->lexicon('chimpx.campaign_sending');
    $modx->log(modX::LOG_LEVEL_INFO,$msg);
    return $modx->error->success('',$msg);
}