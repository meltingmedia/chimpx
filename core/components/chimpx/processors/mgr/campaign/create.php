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
 * Create a MailChimp campaign
 * http://apidocs.mailchimp.com/1.3/campaigncreate.func.php
 * 
 * @package chimpx
 * @subpackage processors
 */

$api = new MCAPI($modx->getOption('chimpx_apikey'));

// campaign type
$type = $scriptProperties['campaign_type'];
// standard options for the campaign
$opts = array();
    $opts['list_id'] = $scriptProperties['list_select'];
    // @TODO: get lits's default subject if exists
    $opts['subject'] = $scriptProperties['subject'];
    $opts['title'] = $scriptProperties['title'];
    // @TODO: get lists's default from_email
    $opts['from_email'] = $scriptProperties['from_email'];
    // @TODO: get lists's default from_name
    $opts['from_name'] = $scriptProperties['from_name'];
    // @TODO: get list's MergeVars » http://apidocs.mailchimp.com/1.3/listmergevars.func.php
    $opts['to_name'] = $scriptProperties['to_name'];

    $opts['template_id'] = $scriptProperties['template_id'];
    $opts['gallery_template_id'] = $scriptProperties['gallery_template_id'];
    $opts['base_template_id'] = $scriptProperties['base_template_id'];
    $opts['folder_id'] = $scriptProperties['folder_id'];
    $opts['tracking'] = $scriptProperties['tracking'];
    $opts['authenticate'] = $scriptProperties['authenticate'];
    $opts['analytics'] = $scriptProperties['analytics'];
    $opts['auto_footer'] = $scriptProperties['auto_footer'];
    $opts['inline_css'] = $scriptProperties['inline_css'];
    $opts['generate_text'] = $scriptProperties['chimpx_boolean'];
    $opts['auto_tweet'] = $scriptProperties['auto_tweet'];
    $opts['auto_fb_post'] = $scriptProperties['auto_fb_post'];
    $opts['timewarp'] = $scriptProperties['timewarp'];
    $opts['to_name'] = $scriptProperties['to_name'];
    $opts['ecomm360'] = $scriptProperties['ecomm360'];

// content for the campaign
$content = array();
    if (!empty($scriptProperties['url'])) {
        $content['url'] = $modx->makeUrl($scriptProperties['url']);
    };
    if (!empty($scriptProperties['html'])) {
        $content['html'] = $scriptProperties['html'];
    };
    if (!empty($scriptProperties['text']) && $scriptProperties['text'] != '') {
        $content['text'] = $scriptProperties['text'];
    };
    if (!empty($scriptProperties['archive'])) {
        $content['archive'] = $scriptProperties['archive'];
    };
    if (!empty($scriptProperties['archive_type'])) {
        $content['archive_type'] = $scriptProperties['archive_type'];
    };

// segmentation options
$segment_opts = array();

// campaign type options
$type_opts = array();
    // RSS
    $type_opts['url'] = $scriptProperties['rss_url'];
    $type_opts['schedule'] = $scriptProperties['schedule'];
    $type_opts['schedule_hour'] = $scriptProperties['schedule_hour'];
    $type_opts['schedule_weekday'] = $scriptProperties['schedule_weekday'];
    $type_opts['schedule_monthday'] = $scriptProperties['schedule_monthday'];
    // A/B split
    $type_opts['split_test'] = $scriptProperties['split_test'];
    $type_opts['pick_winner'] = $scriptProperties['pick_winner'];
    $type_opts['wait_units'] = $scriptProperties['wait_units'];
    $type_opts['wait_time'] = $scriptProperties['wait_time'];
    $type_opts['split_size'] = $scriptProperties['split_size'];
    $type_opts['from_name_a'] = $scriptProperties['from_name_a'];
    $type_opts['from_name_b'] = $scriptProperties['from_name_b'];
    $type_opts['from_email_a'] = $scriptProperties['from_email_a'];
    $type_opts['from_email_b'] = $scriptProperties['from_email_b'];
    $type_opts['subject_a'] = $scriptProperties['subject_a'];
    $type_opts['subject_b'] = $scriptProperties['subject_b'];
    // auto responder
    $type_opts['offset-units'] = $scriptProperties['offset-units'];
    $type_opts['offset-time'] = $scriptProperties['offset-time'];
    $type_opts['offset-dir'] = $scriptProperties['offset-dir'];
    $type_opts['event'] = $scriptProperties['event'];
    $type_opts['event-datemerge'] = $scriptProperties['event-datemerge'];

$chimpXcreateCampaign = $api->campaignCreate($type, $opts, $content, $segment_opts, $type_opts);

if ($api->errorCode) {
    $modx->log(modX::LOG_LEVEL_ERROR, 'error n#: '. $api->errorCode .' message: '. $api->errorMessage);
    return $modx->error->failure('error n#: '. $api->errorCode .' message: '. $api->errorMessage);
} else {
    $modx->log(modX::LOG_LEVEL_ERROR, 'Campaign ID '. $chimpXcreateCampaign .' created.');
    return $modx->error->success('Successfully accomplished master!');
}