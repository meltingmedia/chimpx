<?php
/**
 * chimpx
 *
 * Copyright 2011 by Romain Trupault <romain@melting-media.com>
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
 * Default English Lexicon Entries for chimpx
 *
 * @package chimpx
 * @subpackage lexicon
 */

// menus & actions
$_lang['chimpx'] = 'Chimpx';
$_lang['chimpx.menu_desc'] = 'Manage your MailChimp newsletters.';

$_lang['chimpx.intro_msg'] = 'Manage your MailChimp campaigns here.';

// top buttons
$_lang['chimpx.check_mailchimp_status'] = 'Check MailChimp status';
$_lang['chimpx.mailchimp_account'] = 'Your MailChimp Account';
$_lang['chimpx_help'] = 'Help';

// campaigns grid
$_lang['chimpx.campaigns'] = 'All your campaigns';

$_lang['chimpx.campaign_err_nf'] = 'Campaign not found.';
$_lang['chimpx.campaign_err_ns'] = 'Campaign not specified.';
$_lang['chimpx.campaign_err_remove'] = 'An error occurred while trying to remove the campaing.';
$_lang['chimpx.campaign_err_save'] = 'An error occurred while trying to save the campaign.';

$_lang['chimpx.campaign_create'] = 'Create a new campaign';
$_lang['chimpx.campaign_remove'] = 'Delete campaign';
$_lang['chimpx.campaign_remove_confirm'] = 'Are you sure you want to remove this campaign?';
$_lang['chimpx.campaign_send'] = 'Send this campaign';
$_lang['chimpx.campaign_send_confirm'] = 'Are you sure you want to send this campaign right now?';
$_lang['chimpx.campaign_update'] = 'Update this campaign';
$_lang['chimpx.campaign_send_test'] = 'Test this campaign';
$_lang['chimpx.campaign_send_test_email'] = 'Send test to';
$_lang['chimpx.campaign_send_test_email_desc'] = 'Email address to send the test to';
$_lang['chimpx.campaign_test_sent'] = 'The test is sent. Check your inbox!';
$_lang['chimpx.campaign_replicate'] = 'Replicate this campaign';
$_lang['chimpx.campaign_replicate_confirm'] = 'Are you sure you want to replicate this campaign and its settings?';
$_lang['chimpx.campaign_stats'] = 'Campaign stats';
$_lang['chimpx.campaign_sending'] = 'Your campaign is in MailChimp queue & will be processed soon.';
$_lang['chimpx.campaign_sending_title'] = 'Campaign sent.';

// campaigns grid columns labels
$_lang['chimpx.campaign_list_name'] = 'List';
$_lang['chimpx.campaign_id'] = 'ID';
$_lang['chimpx.campaign_name'] = 'Title';
$_lang['chimpx.campaign_subject'] = 'Subject';
$_lang['chimpx.campaign_subject_desc'] = 'Email subject your subscribers will receive';
$_lang['chimpx.campaign_sent'] = 'Sent on';
$_lang['chimpx.campaign_status'] = 'Status';
$_lang['chimpx.campaign_recipients'] = 'Recipients';

// create campaign window
$_lang['chimpx.campaign_list_select'] = 'Select your list';
$_lang['chimpx.campaign_list_select_desc'] = 'Select the list to which you want to send the campaign';
$_lang['chimpx.campaign_campaign_type'] = 'Campaign type';
$_lang['chimpx.campaign_campaign_type_desc'] = "What sort of campaign would you like to create?<br />
<span style=\"color: red\">NOTE: </span>Only regular campaigns are supported for now.";
$_lang['chimpx.campaign_title'] = 'Campaign title';
$_lang['chimpx.campaign_title_desc'] = 'Internal title of the campaign (optionnal)';
$_lang['chimpx.campaign_url'] = 'Resource ID';
$_lang['chimpx.campaign_url_desc'] = 'Resource ID to be used as HTML content for this campaign.<br />
<span style="color: red">NOTE: </span>this resource must be published AND browsable from the web';

$_lang['chimpx.list_to_name'] = 'To name';
$_lang['chimpx.list_to_name_desc'] = 'Include the recipient\'s name in the message using merge tags to make it more personal and help avoid spam filters.<br />
example: *|FNAME|* *|LNAME|* will show "To: Bob Smith" in the email instead of "To: bob@example.com"';
$_lang['chimpx.list_from_name'] = 'From name';
$_lang['chimpx.list_from_name_desc'] = 'Sender name shown to your subscribers';
$_lang['chimpx.list_from_email'] = 'From email';
$_lang['chimpx.list_from_email_desc'] = 'Email address used to send the newsletter';
$_lang['chimpx.campaign_generate_text'] = 'Generate text version';
$_lang['chimpx.campaign_generate_text_desc'] = 'Automaticly generate the text version from your HTML version';
$_lang['chimpx.boolean_true'] = 'Yes';
$_lang['chimpx.boolean_false'] = 'No';

// create campaign errors
$_lang['chimpx.campaign_campaign_type_ns'] = 'Please choose a campaign type (actually, only regular campaigns are supported).';
$_lang['chimpx.campaign_campaign_subject_ns'] = 'Please set a subject for your email campaign.';
$_lang['chimpx.list_from_email_ns'] = 'Please set an email adress to send your email campaign from.';
$_lang['chimpx.list_from_name_ns'] = 'Please set a sender name.';
$_lang['chimpx.campaign_url_err'] = 'You must set a valid resource ID.';

// update window
$_lang['chimpx.update_close'] = 'Close';

// campaign type combo box
$_lang['chimpx.campaigntype_combo_blank'] = 'Please choose a campaign type';
$_lang['chimpx.campaigntype_combo_empty'] = 'Please choose a campaign type';

$_lang['chimpx.campaigntype_combo_regular'] = 'Regular ol\' campaign';
$_lang['chimpx.campaigntype_combo_plaintext'] = 'Plain-text';
$_lang['chimpx.campaigntype_combo_absplit'] = 'A/B split';
$_lang['chimpx.campaigntype_combo_rss'] = 'RSS driven';
$_lang['chimpx.campaigntype_combo_trans'] = 'Trans [?]';
$_lang['chimpx.campaigntype_combo_auto'] = 'AutoResponder';

// lists grid
$_lang['chimpx.lists'] = 'All your lists';
$_lang['chimpx.lists_intro_msg'] = 'View your MailChimp lists. If you want to create a new list, you have to make it through <a href="//login.mailchimp.com" target="_blank">MailChimp</a> directly.';
$_lang['chimpx.list_id'] = 'ID';
$_lang['chimpx.list_web_id'] = 'Web ID';
$_lang['chimpx.list_name'] = 'Name';
$_lang['chimpx.list_date_created'] = 'Created on';
$_lang['chimpx.list_email_type_option'] = 'HTML + text';
$_lang['chimpx.list_use_awesomebar'] = 'Awesome Bar';
$_lang['chimpx.list_list_rating'] = 'List rating';
$_lang['chimpx.list_member_count'] = 'Subscribers';

// lists combo box
$_lang['chimpx.list_combo_blank'] = 'Choose a list';
$_lang['chimpx.list_combo_empty'] = 'Choose a list';

// MailChimp API error infos
$_lang['chimpx.error_info'] = 'Error n°: [[+number]]<br />Message: [[+message]]';