<?php
/**
 * Created by JetBrains PhpStorm.
 * User: korma
 * Date: 16/05/11
 * Time: 08:19
 * To change this template use File | Settings | File Templates.
 */
 
$api = new MCAPI($modx->getOption('chimpx_apikey'));

$mcPing = $api->ping();


if ($mcPing == "Everything's Chimpy!"){
    //echo "Success, $result\n";
    $modx->log(modX::LOG_LEVEL_ERROR, $mcPing);
    return $modx->error->failure($mcPing);
} else {
    //echo "Problems are a foot: $result\n";
    $modx->log(modX::LOG_LEVEL_ERROR, $mcPing);
    return $modx->error->failure($mcPing);
}