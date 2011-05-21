<?php
/**
 * Created by JetBrains PhpStorm.
 * User: korma
 * Date: 15/05/11
 * Time: 13:19
 * To change this template use File | Settings | File Templates.
 */
 
$api = new MCAPI($modx->getOption('chimpx_apikey'));
$campaignId = $scriptProperties['id'];

$retval = $api->campaignSendNow($campaignId);

if ($api->errorCode){
    $modx->log(modX::LOG_LEVEL_ERROR, 'error n#: '. $api->errorCode .' message: '. $api->errorMessage);
    return $modx->error->failure('error n#: '. $api->errorCode .' message: '. $api->errorMessage);
} else {
    $modx->log(modX::LOG_LEVEL_ERROR, 'Campaign sent!');
    return $modx->error->success('Campaign successfully sent!');
}