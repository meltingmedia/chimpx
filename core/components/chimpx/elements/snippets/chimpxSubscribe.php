<?php
/**
 * MailChimp Subscribe snippet.
 *
 * @author Garry Nutting (11/09/08)
 * @author ecreate (http://modxcms.com/forums/index.php?action=profile;u=35415)
 * @author Romain Tripault // Melting Media <romain@melting-media.com>
 *
 * @package chimpx
 */
$chimpx = $modx->getService('chimpx','chimpx',$modx->getOption('chimpx.core_path',null,$modx->getOption('core_path').'components/chimpx/').'model/chimpx/',$scriptProperties);
if (!($chimpx instanceof chimpx)) return '';

$api = new MCAPI($modx->getOption('chimpx.apikey'));

$listId = $modx->getOption('listId',$scriptProperties,'');
$debug = $modx->getOption('debug',$scriptProperties,false);
$formTpl = $modx->getOption('formTpl',$scriptProperties,'formTpl');
//@TODO: i18n with lexicons
$errorMsg = $modx->getOption('errorMsg',$scriptProperties,'There was a problem subscribing you.');
$successMsg = $modx->getOption('successMsg',$scriptProperties,'You were successfully subscribed.');

if ($formTpl != null && $modx->getChunk($formTpl) != null) {
    if (isset($_POST['subscribe'])) {
        if ($api->errorCode != '') {
            if ($debug == true) {
                $debugOutput .= "code:".$api->errorCode."\n";
                $debugOutput .= "msg :".$api->errorMessage."\n";
                return $modx->getChunk($formTpl);
            } else {
                $modx->setPlaceholder('MailChimp.message', 'Login to remote service failed');
                return $modx->parseChunk($formTpl, $modx->placeholders, '[[+',']]');
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
            $modx->setPlaceholder('MailChimp.error', $errorMsg);
        } else {
            if ($debug == true) {
                $debugOutput .= "Returned: ".$retVal."\n";
            }
            $modx->setPlaceholder('MailChimp.success', $successMsg);
        }
    }

    if ($debug == true) echo $debugOutput;
    if (is_array($modx->placeholders)) {
        $ph = array_merge($modx->config, $modx->placeholders);
    } else {
        $ph = $modx->config;
    }
    return $modx->parseChunk($formTpl, $ph, '[[+',']]');
} else {
    return 'Please specify a valid form chunk.';
}