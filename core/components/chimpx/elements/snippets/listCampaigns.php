<?php
/**
 * Retrieve campaigns archives for a given MailChimp list
 *
 * @package chimpx
 */

$chimpx = $modx->getService('chimpx','chimpx',$modx->getOption('chimpx.core_path',null,$modx->getOption('core_path').'components/chimpx/').'model/chimpx/',$scriptProperties);
if (!($chimpx instanceof chimpx)) return 'phoque';

$output = '';
$api = new MCAPI($modx->getOption('chimpx_apikey'));

$tpl = $modx->getOption('tpl',$scriptProperties,'campaignTpl');

$limit = $modx->getOption('limit',$scriptProperties,25);
$offset = $modx->getOption('offset',$scriptProperties,0);

$listId = $scriptProperties['list_id'];
$status = $modx->getOption('status',$scriptProperties,'');
// available status: "sent", "save", "paused", "schedule", "sending", empty means all

//$placeholderPrefix = $modx->getOption('placeholderPrefix',$scriptProperties,'chimpx.');
$placeholderPrefix = $modx->getOption('placeholderPrefix',$scriptProperties,'');

// filters to apply to the query
$filters = array();


if (!$listId) {
    // @TODO: i18n (lexicon)
    return 'Set a list ID first!';
}


$filters['list_id'] = $listId;
$filters['status'] = $status;

$campaigns = $api->campaigns($filters,$offset,$limit);


if ($api->errorCode){
    $modx->log(modX::LOG_LEVEL_ERROR, 'Uhoh, error n#: '. $api->errorCode .' message: '. $api->errorMessage);
    return $modx->error->failure('error n#: '. $api->errorCode .' message: '. $api->errorMessage);
} else {
    $count = $campaigns['total'];
    $modx->setPlaceholder('total', $count);

    $list = array();
    foreach ($campaigns['data'] as $campaign) {
        //$campaignArray = $campaign;
        //$output .= $chimpx->getChunk($tpl,$campaignArray) ."\n";
        $list[] = $chimpx->getChunk($tpl,$campaign);
    }

    //return $output;
    /* set total placeholders */
    /*$placeholders = array(
        'total' => $count,
        'start' => $offset,
        'limit' => $limit,
    );
    $modx->setPlaceholders($placeholders,$placeholderPrefix);*/


    /* output */
    $outputSeparator = $modx->getOption('outputSeparator',$scriptProperties,"\n");
    $output = implode($list,$outputSeparator);
    /*$toPlaceholder = $modx->getOption('toPlaceholder',$scriptProperties,false);
    if (!empty($toPlaceholder)) {
        $modx->setPlaceholder($toPlaceholder,$output);
        return '';
    }*/
    return $output;
}