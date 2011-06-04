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
 * Create a MailChimp campaign
 * http://apidocs.mailchimp.com/1.3/campaigncreate.func.php
 * 
 * @package chimpx
 * @subpackage processors
 */

$api = new MCAPI($modx->getOption('chimpx_apikey'));

// campaign type
if (!empty($scriptProperties['campaign_type'])) {
    $type = $scriptProperties['campaign_type'];
} else {
        $msg = $modx->lexicon('chimpx.campaign_campaign_type_ns');
        $modx->log(modX::LOG_LEVEL_INFO,$msg);
        return $modx->error->failure($msg);
}

// standard options for the campaign
$opts = array();

    // let's check if a list has been choosen (required)
    if (!empty($scriptProperties['list_select'])) {
        $opts['list_id'] = $scriptProperties['list_select'];
    } else {
        $msg = $modx->lexicon('chimpx.campaign_list_select_desc');
        $modx->log(modX::LOG_LEVEL_INFO,$msg);
        return $modx->error->failure($msg);
    }

    // @TODO: get lits's default subject if exists
    if (!empty($scriptProperties['subject'])) {
        $opts['subject'] = $scriptProperties['subject'];
    } else {
        $msg = $modx->lexicon('chimpx.campaign_campaign_subject_ns');
        $modx->log(modX::LOG_LEVEL_INFO,$msg);
        return $modx->error->failure($msg);
    }

    $opts['title'] = $scriptProperties['title'];

    // @TODO: get lists's default from_email + regex to check input value == email format
    if (!empty($scriptProperties['from_email'])) {
        $opts['from_email'] = $scriptProperties['from_email'];
    } else {
        $msg = $modx->lexicon('chimpx.list_from_email_ns');
        $modx->log(modX::LOG_LEVEL_INFO,$msg);
        return $modx->error->failure($msg);
    }

    // @TODO: get lists's default from_name
    if (!empty($scriptProperties['from_name'])) {
        $opts['from_name'] = $scriptProperties['from_name'];
    } else {
        $msg = $modx->lexicon('chimpx.list_from_name_ns');
        $modx->log(modX::LOG_LEVEL_INFO,$msg);
        return $modx->error->failure($msg);
    }

    // @TODO: get list's MergeVars » http://apidocs.mailchimp.com/1.3/listmergevars.func.php
    $opts['to_name'] = $scriptProperties['to_name'];

    //$opts['generate_text'] = $scriptProperties['chimpx_boolean'];
    $opts['generate_text'] = true;


// content for the campaign
$content = array();
    // @TODO: check if the value is an integer && resource exists && is published
    if (!empty($scriptProperties['url'])) {
        $content['url'] = $modx->makeUrl($scriptProperties['url']);
    } else {
        $msg = $modx->lexicon('chimpx.campaign_url_err');
        $modx->log(modX::LOG_LEVEL_INFO,$msg);
        return $modx->error->failure($msg);
    }


// segmentation options
$segment_opts = array();

// campaign type options
$type_opts = array();

// Let's create the campaign
$api->campaignCreate($type, $opts, $content, $segment_opts, $type_opts);

if ($api->errorCode) {
    $msg = $modx->lexicon('chimpx.error_info',array('number' => $api->errorCode, 'message' => $api->errorMessage));
    $modx->log(modX::LOG_LEVEL_INFO, $msg);
    return $modx->error->failure($msg);
} else {
    return $modx->error->success();
}