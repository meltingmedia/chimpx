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
$_lang['chimpx.menu_desc'] = 'Verwalten Sie Ihre MailChimp Newsletters.';

$_lang['chimpx.intro_msg'] = 'Verwalten Sie Ihre MailChimp Kampagnen hier.';

// top buttons
$_lang['chimpx.check_mailchimp_status'] = 'Prüfe MailChimp Status';
$_lang['chimpx.mailchimp_account'] = 'Ihr MailChimp Account';
$_lang['chimpx_help'] = 'Hilfe';

// campaigns grid
$_lang['chimpx.campaigns'] = 'Alle Ihre Kampagnen';

$_lang['chimpx.campaign_err_nf'] = 'Kampagne nicht gefunden.';
$_lang['chimpx.campaign_err_ns'] = 'Kampagne nicht spezifiziert.';
$_lang['chimpx.campaign_err_remove'] = 'Es trat ein Fehler auf beim Versuch, die Kampagne zu entfernen.';
$_lang['chimpx.campaign_err_save'] = 'Es trat ein Fehler auf beim Versuch, die Kampagne zu speichern.';

$_lang['chimpx.campaign_create'] = 'neue Kampagne erstellen';
$_lang['chimpx.campaign_remove'] = 'Kampagne löschen';
$_lang['chimpx.campaign_remove_confirm'] = 'Sind Sie sicher, dass Sie die Kampagne entfernen möchten?';
$_lang['chimpx.campaign_send'] = 'Kampagne senden';
$_lang['chimpx.campaign_send_confirm'] = 'Sind Sie sicher, dass Sie die Kampagne jetzt absenden möchten?';
$_lang['chimpx.campaign_update'] = 'Kampagne updaten';
$_lang['chimpx.campaign_send_test'] = 'Kampagne testen';
$_lang['chimpx.campaign_send_test_email'] = 'Test senden an';
$_lang['chimpx.campaign_send_test_email_desc'] = 'E-Mail Adresse, an die der Test versendet wird';
$_lang['chimpx.campaign_test_sent'] = 'Test wurde gesendet. Prüfen Sie Ihren Posteingang!';
$_lang['chimpx.campaign_replicate'] = 'Kampagne duplizieren';
$_lang['chimpx.campaign_replicate_confirm'] = 'Sind Sie sicher, dass Sie diese Kampagne und ihre Einstellungen duplizieren möchten?';
$_lang['chimpx.campaign_stats'] = 'Kampagnen Statistik';
$_lang['chimpx.campaign_sending'] = 'Ihre Kampagne ist im MailChimp Queue und wird bald abgearbeitet.';
$_lang['chimpx.campaign_sending_title'] = 'Kampagne gesendet.';

// campaigns grid columns labels
$_lang['chimpx.campaign_list_name'] = 'Liste';
$_lang['chimpx.campaign_id'] = 'ID';
$_lang['chimpx.campaign_name'] = 'Titel';
$_lang['chimpx.campaign_subject'] = 'Betreff';
$_lang['chimpx.campaign_subject_desc'] = 'E-Mail Betreff, den die Abonnenten sehen werden';
$_lang['chimpx.campaign_sent'] = 'senden am';
$_lang['chimpx.campaign_status'] = 'Status';
$_lang['chimpx.campaign_recipients'] = 'Empfänger';

// create campaign window
$_lang['chimpx.campaign_list_select'] = 'Liste auswählen';
$_lang['chimpx.campaign_list_select_desc'] = 'Wählen Sie die Liste aus, an die Sie die Kampagne senden möchten';
$_lang['chimpx.campaign_campaign_type'] = 'Kampagnen Typ';
$_lang['chimpx.campaign_campaign_type_desc'] = "Sorte der zu erstellenden Kampfagne.<br />
<span style=\"color: red\">HINWEIS: </span>Zur Zeit werden nur reguläre Kampagnen unterstützt.";
$_lang['chimpx.campaign_title'] = 'Titel der Kampagne';
$_lang['chimpx.campaign_title_desc'] = 'Internet Titel der Kampagner (optional)';
$_lang['chimpx.campaign_url'] = 'Resource ID';
$_lang['chimpx.campaign_url_desc'] = 'Resource ID, die als HTML Inhalt für diese Kampagne verwendet wird.<br />
<span style="color: red">HINWEIS: </span>Diese Ressource muss veröffentlicht und vom Web aus erreichbar sein';

$_lang['chimpx.list_to_name'] = 'Name des Empfängers';
$_lang['chimpx.list_to_name_desc'] = 'Fügen Sie den Empfängernamen ein in die Nachricht, indem Sie merge-tags verwenden, um die Nachricht persönlicher zu machen und Spamfilter zu umgehen.<br />
Beispiel: *|FNAME|* *|LNAME|* zeigt an "An: Bob Smith" statt "An: bob@example.com"';
$_lang['chimpx.list_from_name'] = 'Name des Absender';
$_lang['chimpx.list_from_name_desc'] = 'Absendername, der dem Empfänger angezeigt wird';
$_lang['chimpx.list_from_email'] = 'Absender E-Mail';
$_lang['chimpx.list_from_email_desc'] = 'E-Mail Adresse, die zum Versenden des Newsletters verwendet wird.';
$_lang['chimpx.campaign_generate_text'] = 'Erstelle Textversion';
$_lang['chimpx.campaign_generate_text_desc'] = 'Erstelle automatisch eine Textversion der HTML Version.';
$_lang['chimpx.boolean_true'] = 'Ja';
$_lang['chimpx.boolean_false'] = 'Nein';

// create campaign errors
$_lang['chimpx.campaign_campaign_type_ns'] = 'Bitte wählen Sie einen Kampagnentyp aus (zur Zeit werden nur reguläre Kampagnen unterstützt).';
$_lang['chimpx.campaign_campaign_subject_ns'] = 'Bitte wählen Sie einen Betreff für die Kampagne aus.';
$_lang['chimpx.list_from_email_ns'] = 'Bitte geben Sie eine E-Mail Adresse an, von der die Kampagne verschickt wird.';
$_lang['chimpx.list_from_name_ns'] = 'Bitte geben Sie einen Absendernamen an.';
$_lang['chimpx.campaign_url_err'] = 'Sie müssen eine valide Ressourcen ID angeben.';

// update window
$_lang['chimpx.update_close'] = 'Schließen';

// campaign type combo box
$_lang['chimpx.campaigntype_combo_blank'] = 'Bitte wählen Sie einen Kampagnentyp';
$_lang['chimpx.campaigntype_combo_empty'] = 'Bitte wählen Sie einen Kampagnentyp';

$_lang['chimpx.campaigntype_combo_regular'] = 'Reguläre ol\' Kampagne';
$_lang['chimpx.campaigntype_combo_plaintext'] = 'Plain-text';
$_lang['chimpx.campaigntype_combo_absplit'] = 'A/B split';
$_lang['chimpx.campaigntype_combo_rss'] = 'RSS driven';
$_lang['chimpx.campaigntype_combo_trans'] = 'Trans [?]';
$_lang['chimpx.campaigntype_combo_auto'] = 'AutoResponder';

// lists grid
$_lang['chimpx.lists'] = 'Alle Ihre Listen';
$_lang['chimpx.lists_intro_msg'] = 'Sehen Sie Ihre MailChimp Listen ein. Wenn Sie eine neue anlegen möchten, müssen Sie dies über <a href="//login.mailchimp.com" target="_blank">MailChimp</a> direkt tun.';
$_lang['chimpx.list_id'] = 'ID';
$_lang['chimpx.list_web_id'] = 'Web ID';
$_lang['chimpx.list_name'] = 'Name';
$_lang['chimpx.list_date_created'] = 'Erstellt am';
$_lang['chimpx.list_email_type_option'] = 'HTML + text';
$_lang['chimpx.list_use_awesomebar'] = 'Awesome Bar';
$_lang['chimpx.list_list_rating'] = 'Listenbewertung';
$_lang['chimpx.list_member_count'] = 'Abonnenten';

// lists combo box
$_lang['chimpx.list_combo_blank'] = 'Liste auswöhlen';
$_lang['chimpx.list_combo_empty'] = 'Liste auswählen';

// MailChimp API error infos
$_lang['chimpx.error_info'] = 'Fehler n°: [[+number]]<br />Beschreibung: [[+message]]';