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
 * Update a MailChimp campaign
 * http://apidocs.mailchimp.com/1.3/campaignupdate.func.php
 * 
 * @package chimpx
 * @subpackage processors
 */

if (!empty($scriptProperties['id'])) {
    $type = $scriptProperties['id'];
} else {
    $msg = $modx->lexicon('chimpx.campaign_err_nf');
    $modx->log(modX::LOG_LEVEL_INFO,$msg);
    return $modx->error->failure($msg);
}

$api = new MCAPI($modx->getOption('chimpx.apikey'));

$cid = $scriptProperties['id'];
$name = $scriptProperties['name'];
$value = $scriptProperties['value'];

//@TODO: retrieve the resource ID from the complete URL (content-url)

$content = array();

foreach($_POST as $name => $value) {
    // let's check the prefixed values (content-*…)
    if(substr($name,0,8) == 'content-') {
        // we got value for the content array
        if($name == 'content-url') {
            // we need to make an url with the ID
            $content['url'] = $modx->makeUrl($scriptProperties['content-url']);
            $name = 'content';
            $retval = $api->campaignUpdate($cid,$name,$content);
            unset($name);
        } else {
            // Nothing's implemented yet… that's a reminder for later
            /*$content[ltrim($name, 'content-')] = $scriptProperties[$name];
            $name = 'content';
            $retval = $api->campaignUpdate($cid,$name,$content);
            unset($name);*/
        }
    } else {
        // the values should be in the options array, so thread them normally
        $retval = $api->campaignUpdate($cid,$name,$value);
    }
}


if ($api->errorCode) {
    $msg = $modx->lexicon('chimpx.error_info',array('number' => $api->errorCode, 'message' => $api->errorMessage));
    $modx->log(modX::LOG_LEVEL_INFO, $msg);
    return $modx->error->failure($msg);
} else {
    $msg = 'Campaign ID '. $cid .' updated.';
    $modx->log(modX::LOG_LEVEL_INFO,$msg);
    return $modx->error->success('',$msg);
}