<?php
/**
 * chimpx
 *
 * Copyright 2011 by Romain Tripault <romain@meltingmedia.net>
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
 * Properties for the chimpx snippet.
 *
 * @package chimpx
 * @subpackage build
 */
$properties = array(
    array(
        'name' => 'tpl',
        'desc' => 'prop_chimpx.tpl_desc',
        'type' => 'textfield',
        'options' => '',
        'value' => 'Item',
        'lexicon' => 'chimpx:properties',
    ),
    array(
        'name' => 'sortBy',
        'desc' => 'prop_chimpx.sortby_desc',
        'type' => 'textfield',
        'options' => '',
        'value' => 'name',
        'lexicon' => 'chimpx:properties',
    ),
    array(
        'name' => 'sortDir',
        'desc' => 'prop_chimpx.sortdir_desc',
        'type' => 'textfield',
        'options' => '',
        'value' => 'ASC',
        'lexicon' => 'chimpx:properties',
    ),
    array(
        'name' => 'limit',
        'desc' => 'prop_chimpx.limit_desc',
        'type' => 'textfield',
        'options' => '',
        'value' => 5,
        'lexicon' => 'chimpx:properties',
    ),
    array(
        'name' => 'outputSeparator',
        'desc' => 'prop_chimpx.outputseparator_desc',
        'type' => 'textfield',
        'options' => '',
        'value' => '',
        'lexicon' => 'chimpx:properties',
    ),
    array(
        'name' => 'toPlaceholder',
        'desc' => 'prop_chimpx.toplaceholder_desc',
        'type' => 'textfield',
        'options' => '',
        'value' => true,
        'lexicon' => 'chimpx:properties',
    ),
/*
    array(
        'name' => '',
        'desc' => 'prop_chimpx.',
        'type' => 'textfield',
        'options' => '',
        'value' => '',
        'lexicon' => 'chimpx:properties',
    ),
    */
);

return $properties;