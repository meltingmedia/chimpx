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
 * Default French Lexicon Entries for chimpx
 *
 * @package chimpx
 * @subpackage lexicon
 */

// menus & actions
$_lang['chimpx'] = 'Chimpx';
$_lang['chimpx.menu_desc'] = 'Gérez vos campagnes e-mailling avec MailChimp.';

$_lang['chimpx.intro_msg'] = 'Gérez vos campagnes MailChimp ici.';

// top buttons
$_lang['chimpx.check_mailchimp_status'] = 'Vérifier l\'état de MailChimp';
$_lang['chimpx.mailchimp_account'] = 'Votre compte MailChimp';
$_lang['chimpx_help'] = 'Aide';

// campaigns grid
$_lang['chimpx.campaigns'] = 'Toutes vos campagnes';

$_lang['chimpx.campaign'] = 'campagne';
$_lang['chimpx.campaignss'] = 'campagnes';
$_lang['chimpx.campaign_err_nf'] = 'Campagne non trouvée.';
$_lang['chimpx.campaign_err_ns'] = 'Campagne non indiquée.';
$_lang['chimpx.campaign_err_remove'] = 'Une erreur est survenue lors de la suppression de votre campagne.';
$_lang['chimpx.campaign_err_save'] = 'Une erreur est survenue lors de la sauvegarde de votre campagne.';

$_lang['chimpx.campaign_create'] = 'Créer une nouvelle campagne';
$_lang['chimpx.campaign_remove'] = 'Supprimer la campagne';
$_lang['chimpx.campaign_remove_confirm'] = 'Êtes-vous sûr de vouloir supprimer cette campagne ? Cette opération est irréversible.';
$_lang['chimpx.campaign_send'] = 'Envoyer cette campagne';
$_lang['chimpx.campaign_send_confirm'] = 'Êtes-vous sûr de vouloir envoyer cette campagne maintenant ?';
$_lang['chimpx.campaign_update'] = 'Modifier cette campagne';
$_lang['chimpx.campaign_send_test'] = 'Tester cette campagne';
$_lang['chimpx.campaign_send_test_email'] = 'Envoyer le test à';
$_lang['chimpx.campaign_send_test_email_desc'] = 'Adresse e-mail à laquelle envoyer le test';
$_lang['chimpx.campaign_status_save'] = 'Enregistrée';
$_lang['chimpx.campaign_status_sent'] = 'Envoyée';
$_lang['chimpx.campaign_test_sent'] = 'Le test est envoyé. Vérifiez vos e-mails!';
$_lang['chimpx.campaign_replicate'] = 'Dupliquer cette campagne';
$_lang['chimpx.campaign_replicate_confirm'] = 'Êtes-vous sûr de vouloir dupliquer cette campagne et ses paramètres ?';
$_lang['chimpx.campaign_stats'] = 'Stats de cette campagne';
$_lang['chimpx.campaign_sending'] = 'Votre campagne est placée dans la file d\'attente de MailChimp et sera bientôt envoyée.';
$_lang['chimpx.campaign_sending_title'] = 'Campagne envoyée.';

// campaigns grid columns
$_lang['chimpx.campaign_list_name'] = 'Liste';
$_lang['chimpx.campaign_id'] = 'ID';
$_lang['chimpx.campaign_name'] = 'Titre';
$_lang['chimpx.campaign_subject'] = 'Sujet';
$_lang['chimpx.campaign_subject_desc'] = 'Initulé de l\'e-mail que recevront vos abonnés';
$_lang['chimpx.campaign_sent'] = 'Envoyé le';
$_lang['chimpx.campaign_status'] = 'État';
$_lang['chimpx.campaign_recipients'] = 'Destinataires';

// create campaign window
$_lang['chimpx.campaign_list_select'] = 'Sélectionnez votre liste';
$_lang['chimpx.campaign_list_select_desc'] = 'Sélectionnez la liste à laquelle envoyer votre campagne';
$_lang['chimpx.campaign_campaign_type'] = 'Type de campagne';
$_lang['chimpx.campaign_campaign_type_desc'] = 'Quel type de campagne voulez-vous créer ?<br />
<span style="color: red">NOTE: </span>Seules les campagnes traditionnelles sont supportées pour le moment';
$_lang['chimpx.campaign_title'] = 'Titre de la campagne';
$_lang['chimpx.campaign_title_desc'] = 'Nom interne de la campagne (facultatif)';
$_lang['chimpx.campaign_url'] = 'ID de la ressource';
$_lang['chimpx.campaign_url_desc'] = 'ID de la ressource à utiliser comme model de newsletter.<br />
<span style="color: red">NOTE: </span>cette ressource doit être publiée ET accessible depuis internet';

$_lang['chimpx.list_to_name'] = 'Destinataire';
$_lang['chimpx.list_to_name_desc'] = 'Inclue le nom du destinataire dans le message en utilisant les « merge tags » pour rendre l\'e-mail plus personnel et pour aider à passer les filtres anti-spam.<br />
exemple: *|FNAME|* *|LNAME|* affichera "Pour: Bob Smith" dans l\'e-mail au lieu de "Pour: bob@example.com"';
$_lang['chimpx.list_from_name'] = 'Nom de l\'emetteur';
$_lang['chimpx.list_from_name_desc'] = 'Nom de l\'expéditeur affiché à vos abonnés';
$_lang['chimpx.list_from_email'] = 'E-mail de l\'emetteur';
$_lang['chimpx.list_from_email_desc'] = 'E-mail utilisée pour envoyer votre newsletter';
$_lang['chimpx.campaign_generate_text'] = 'Générer une version texte';
$_lang['chimpx.campaign_generate_text_desc'] = 'Générer une version texte automatiquement depuis votre version HTML';
$_lang['chimpx.boolean_true'] = 'Oui';
$_lang['chimpx.boolean_false'] = 'Non';

// create campaign errors
$_lang['chimpx.campaign_campaign_type_ns'] = 'Veuillez choisir un type de campagne (seules les campagnes « traditionnelles » sont supportées pour le moment).';
$_lang['chimpx.campaign_campaign_subject_ns'] = 'Veuillez indiquer le sujet de votre e-mail.';
$_lang['chimpx.list_from_email_ns'] = 'Veuillez indiquer une adresse e-mail depuis laquelle envoyer votre e-mail.';
$_lang['chimpx.list_from_name_ns'] = 'Veuillez indiquer un nom d\'expéditeur.';
$_lang['chimpx.campaign_url_err'] = 'Vous devez indiquer un ID de ressource valide.';

// update window
$_lang['chimpx.update_close'] = 'Fermer';

// campaign type combo box
$_lang['chimpx.campaigntype_combo_blank'] = 'Veuillez indiquer un type de campagne';
$_lang['chimpx.campaigntype_combo_empty'] = 'Veuillez indiquer un type de campagne';

$_lang['chimpx.campaigntype_combo_regular'] = 'Traditionnelle';
$_lang['chimpx.campaigntype_combo_plaintext'] = 'Texte seulement';
$_lang['chimpx.campaigntype_combo_absplit'] = 'A/B split';
$_lang['chimpx.campaigntype_combo_rss'] = 'Campagne RSS';
$_lang['chimpx.campaigntype_combo_trans'] = 'Campagne trans [?]';
$_lang['chimpx.campaigntype_combo_auto'] = 'Répondeur automatique';

// lists grid
$_lang['chimpx.lists'] = 'Toutes vos listes';
$_lang['chimpx.lists_intro_msg'] = 'Visionnez vos listes MailChimp. Si vous souhaitez créer une nouvelle liste, vous devez vous rendre sur <a href="//login.mailchimp.com" target="_blank">MailChimp</a>.';
$_lang['chimpx.list_id'] = 'ID';
$_lang['chimpx.list_web_id'] = 'Web ID';
$_lang['chimpx.list_name'] = 'Nom';
$_lang['chimpx.list_date_created'] = 'Créée le';
$_lang['chimpx.list_email_type_option'] = 'HTML + texte';
$_lang['chimpx.list_use_awesomebar'] = 'Awesome Bar';
$_lang['chimpx.list_list_rating'] = 'Classement';
$_lang['chimpx.list_member_count'] = 'Inscrits';

// lists combo box
$_lang['chimpx.list_combo_blank'] = 'Choisissez votre liste';
$_lang['chimpx.list_combo_empty'] = 'Choisissez votre liste';

// MailChimp API error infos
$_lang['chimpx.error_info'] = 'Erreur n°: [[+number]]<br />Message: [[+message]]';