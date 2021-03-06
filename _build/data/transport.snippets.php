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
 * Add snippets to build
 * 
 * @package chimpx
 * @subpackage build
 */
$snippets = array();

$snippets[0]= $modx->newObject('modSnippet');
$snippets[0]->fromArray(array(
    'id' => 0,
    'name' => 'chimpxSubscribe',
    'description' => 'Create a subscription form for your MailChimp lists.',
    'snippet' => getSnippetContent($sources['source_core'].'/elements/snippets/chimpxSubscribe.php'),
),'',true,true);
$properties = include $sources['build'].'properties/properties.chimpxSubscribe.php';
$snippets[0]->setProperties($properties);
unset($properties);

$snippets[1]= $modx->newObject('modSnippet');
$snippets[1]->fromArray(array(
    'id' => 1,
    'name' => 'listCampaigns',
    'description' => 'List your MailChimp campaigns.',
    'snippet' => getSnippetContent($sources['source_core'].'/elements/snippets/listCampaigns.php'),
),'',true,true);
$properties = include $sources['build'].'properties/properties.listCampaigns.php';
$snippets[1]->setProperties($properties);
unset($properties);

return $snippets;