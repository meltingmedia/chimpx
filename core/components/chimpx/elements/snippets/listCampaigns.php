<?php
/**
 * Retrieve campaigns archives for a given MailChimp list
 *
 * @package chimpx
 */

$chimpx = $modx->getService('chimpx','chimpx',$modx->getOption('chimpx.core_path',null,$modx->getOption('core_path').'components/chimpx/').'model/chimpx/',$scriptProperties);
if (!($chimpx instanceof chimpx)) return 'phoque';

$tpl = $modx->getOption('tpl',$scriptProperties,'campaignTpl');
$limit = $modx->getOption('limit',$scriptProperties,25);
$offset = $modx->getOption('offset',$scriptProperties,0);
$listId = $scriptProperties['list_id'];
$status = $modx->getOption('status',$scriptProperties,'');
$outputSeparator = $modx->getOption('outputSeparator',$scriptProperties,"\n");

if (!$listId) {
    // @TODO: i18n (lexicon)
    return 'Set a list ID first!';
}

$api = new MCAPI($modx->getOption('chimpx_apikey'));

// filters to apply to the query
$filters = array();
    $filters['list_id'] = $listId;
    $filters['status'] = $status;

$campaigns = $api->campaigns($filters,$offset,$limit);

$output = '';

if ($api->errorCode){
    $modx->log(modX::LOG_LEVEL_ERROR, 'Uhoh, error n#: '. $api->errorCode .' message: '. $api->errorMessage);
    return $modx->error->failure('error n#: '. $api->errorCode .' message: '. $api->errorMessage);
} else {
    $count = $campaigns['total'];
    $modx->setPlaceholder('total', $count);

    $list = array();
    foreach ($campaigns['data'] as $campaign) {
        $list[] = $chimpx->getChunk($tpl,$campaign);
    }

    $output = implode($list,$outputSeparator);
    return $output;
}