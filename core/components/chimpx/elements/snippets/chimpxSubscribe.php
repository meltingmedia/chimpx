<?php
/**
 * The base chimpx snippet.
 *
 * @package chimpx
 */
$chimpx = $modx->getService('chimpx','chimpx',$modx->getOption('chimpx.core_path',null,$modx->getOption('core_path').'components/chimpx/').'model/chimpx/',$scriptProperties);
if (!($chimpx instanceof chimpx)) return '';

$api = new MCAPI($modx->getOption('chimpx_apikey'));


/**
* MailChimp Subscribe Snippet
* Author: Garry Nutting
* Date: 11/09/08
*
* Subscribes visitor to a MailChimp mailing list via the MailChimp API
*/

$listId = isset($listId) ? $listId : '';
$debug = isset($debug) ? $debug : false;
$form = isset($form) ? $form : null;

if ($form != null && $modx->getChunk($form) != null) {
    if (isset($_POST['subscribe'])) {
        require_once MODX_BASE_PATH.'assets/snippets/mailchimp/classes/MCAPI.class.php';
        require_once MODX_BASE_PATH.'assets/snippets/mailchimp/includes/config.inc.php';

        // Connect to the MailChimp server with the user's credentials.
        //$api = new MCAPI($apikey);
        if ($api->errorCode != '') {
            if ($debug == true) {
                $debugOutput .= "code:".$api->errorCode."\n";
                $debugOutput .= "msg :".$api->errorMessage."\n";
                return $modx->getChunk($form);
            } else {
                $modx->setPlaceholder('MailChimp.message', 'Login to remote service failed');
                return $modx->parseChunk($form, $modx->placeholders, '[[+',']]');
            }
        }

        $mergeVars = array();
        foreach($_POST as $key => $value) {
            if(substr($key,0,3) == 'mc_') {
                $fieldName = ltrim($key, 'mc_');
                $mergeVars[$fieldName] = $value;
            }
        }

        if(empty($mergeVars)) {
            $mergeVars = array('');
        }

        $retVal = $api->listSubscribe($listId, $_POST['mc_EMAIL'], $mergeVars);

        if (!$retVal) {
            if ($debug == true) {
                $debugOutput .= "Unable to load listSubscribe()!\n";
                $debugOutput .= "\tCode=".$api->errorCode."\n";
                $debugOutput .= "\tMsg=".$api->errorMessage."\n";
            }
            $modx->setPlaceholder('MailChimp.message', 'There was a problem subscribing you.');
        } else {
            if ($debug == true) {
                $debugOutput .= "Returned: ".$retVal."\n";
            }
            $modx->setPlaceholder('MailChimp.message', 'You were successfully subscribed');
        }
    }

    if ($debug == true) echo $debugOutput;
    if (is_array($modx->placeholders)) {
        $ph = array_merge($modx->config, $modx->placeholders);
    } else {
        $ph = $modx->config;
    }
    return $modx->parseChunk($form, $ph, '[[+',']]');
} else {
    // @TODO: i18n via lexicon
    return 'Please specify a valid form.';
}