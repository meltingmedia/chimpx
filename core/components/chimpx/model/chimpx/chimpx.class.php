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
 * The base class for chimpx.
 *
 * @package chimpx
 */
class chimpx {
    public $mc = null;

    function __construct(modX &$modx, array $config = array()) {
        $this->modx =& $modx;

        $corePath = $this->modx->getOption('chimpx.core_path', $config, $this->modx->getOption('core_path').'components/chimpx/');
        $assetsUrl = $this->modx->getOption('chimpx.assets_url', $config, $this->modx->getOption('assets_url').'components/chimpx/');
        $connectorUrl = $assetsUrl.'connector.php';

        $this->config = array_merge(array(
            'assetsUrl' => $assetsUrl,
            'cssUrl' => $assetsUrl.'css/',
            'jsUrl' => $assetsUrl.'js/',
            'imagesUrl' => $assetsUrl.'images/',

            'connectorUrl' => $assetsUrl.'connector.php',

            'corePath' => $corePath,
            'modelPath' => $corePath.'model/',
            'chunksPath' => $corePath.'elements/chunks/',
            'chunkSuffix' => '.chunk.tpl',
            'snippetsPath' => $corePath.'elements/snippets/',
            'processorsPath' => $corePath.'processors/',
            'templatesPath' => $corePath.'templates/',
        ), $config);

        // Let's load the MailChimp API
        if (!$this->mc) {
            if (!$this->modx->loadClass('mailchimp.MCAPI', $this->config['modelPath'], true, true)) {
                $this->modx->log(modX::LOG_LEVEL_ERROR, '[chimpx] - unable to load MailChimp API');
                return false;
            }
            $mc = new MCAPI($this->modx->getOption('chimpx.apikey'), true);
            $this->mc = $mc;
        }

        $this->modx->addPackage('chimpx', $this->config['modelPath']);
        $this->modx->lexicon->load('chimpx:default');
    }

    /**
     * Initializes chimpx into different contexts.
     *
     * @access public
     * @param string $ctx The context to load. Defaults to web.
     */
    public function initialize($ctx = 'web') {
        switch ($ctx) {
            case 'mgr':
                if (!$this->modx->loadClass('chimpxControllerRequest', $this->config['modelPath'].'chimpx/request/', true, true)) {
                    return 'Could not load controller request handler.';
                }
                $this->request = new chimpxControllerRequest($this);
                return $this->request->handleRequest();
            break;
            case 'connector':
                if (!$this->modx->loadClass('chimpxConnectorRequest', $this->config['modelPath'].'chimpx/request/', true, true)) {
                    return 'Could not load connector request handler.';
                }
                $this->request = new chimpxConnectorRequest($this);
                return $this->request->handle();
            break;
            default:
                /* if you wanted to do any generic frontend stuff here.
                 * For example, if you have a lot of snippets but common code
                 * in them all at the beginning, you could put it here and just
                 * call $chimpx->initialize($modx->context->get('key'));
                 * which would run this.
                 */
            break;
        }
    }

    /**
     * Gets a Chunk and caches it; also falls back to file-based templates
     * for easier debugging.
     *
     * @access public
     * @param string $name The name of the Chunk
     * @param array $properties The properties for the Chunk
     * @return string The processed content of the Chunk
     */
    public function getChunk($name, array $properties = array()) {
        $chunk = null;
        if (!isset($this->chunks[$name])) {
            $chunk = $this->modx->getObject('modChunk', array('name' => $name), true);
            if (empty($chunk)) {
                $chunk = $this->_getTplChunk($name, $this->config['chunkSuffix']);
                if ($chunk == false) return false;
            }
            $this->chunks[$name] = $chunk->getContent();
        } else {
            $o = $this->chunks[$name];
            $chunk = $this->modx->newObject('modChunk');
            $chunk->setContent($o);
        }
        $chunk->setCacheable(false);
        return $chunk->process($properties);
    }

    /**
     * Returns a modChunk object from a template file.
     *
     * @access private
     * @param string $name The name of the Chunk. Will parse to name.chunk.tpl by default.
     * @param string $suffix The suffix to add to the chunk filename.
     * @return modChunk/boolean Returns the modChunk object if found, otherwise
     * false.
     */
    private function _getTplChunk($name, $suffix = '.chunk.tpl') {
        /** @var $chunk modChunk */
        $chunk = false;
        $f = $this->config['chunksPath'].strtolower($name).$suffix;
        if (file_exists($f)) {
            $o = file_get_contents($f);
            $chunk = $this->modx->newObject('modChunk');
            $chunk->set('name', $name);
            $chunk->setContent($o);
        }
        return $chunk;
    }

    /**
     * Retrieve a list of MailChimp campaigns
     * http://apidocs.mailchimp.com/1.3/campaigns.func.php
     *
     * @param array $filters
     * @param boolean $start
     * @param boolean $limit
     * @return array The campaigns list
     */
    public function getCampaigns($filters = array(), $start = false, $limit = false) {
        // @todo: introduce ACLs (filter some lists is the user is not allowed)
        $campaigns = $this->mc->campaigns($filters, $start, $limit);
        return $campaigns;
    }

    /**
     * Prepares the data to be displayed in the manager page
     *
     * @param array $campaigns An of MailChimp campaigns
     * @return array The list
     */
    public function displayCampaigns($campaigns = array()) {
        $list = array();
        foreach ($campaigns['data'] as $campaign) {
            $listname = $this->mc->lists(array('list_id' => $campaign['list_id']));
            $campaign['listname'] = $listname['data'][0]['name'];
            $campaign['status'] = $this->modx->lexicon('chimpx.campaign_status_'.$campaign['status']);
            $list[] = $campaign;
        }
        return $list;
    }

    /**
     * Deletes the given campaign
     * http://apidocs.mailchimp.com/1.3/campaigndelete.func.php
     *
     * @param string $id The campaign ID
     */
    public function campaignDelete($id) {
        // @todo: ACLs (is user allowed to delete a campaign)
        $this->mc->campaignDelete($id);
    }

    /**
     * Clones the given campaign
     * http://apidocs.mailchimp.com/1.3/campaignreplicate.func.php
     *
     * @param string $id The campaign ID
     */
    public function campaignReplicate($id) {
        $this->mc->campaignReplicate($id);
    }

    /**
     * Sends the given campaign
     * http://apidocs.mailchimp.com/1.3/campaignsendnow.func.php
     *
     * @param string $id The campaign ID
     */
    public function campaignSend($id) {
        $this->mc->campaignSendNow($id);
    }

    /**
     * Sends a campaign test to the given addresses
     * http://apidocs.mailchimp.com/1.3/campaignsendtest.func.php
     *
     * @param string $id The campaign ID
     * @param string $to A comma separated list of emails
     */
    public function campaignSendtest($id, $to) {
        $emails = array();
        $emailList = explode(',', $to);
        foreach ($emailList as $email) {
            $emails[] = trim($email);
        }
        $this->mc->campaignSendTest($id, $emails);
    }

    /**
     * Updates the given campaign data
     * http://apidocs.mailchimp.com/1.3/campaignupdate.func.php
     *
     * @param string $id The campaign ID
     * @param array $data An array of fields => values
     */
    public function campaignUpdate($id, array $data = array()) {
        // @todo: control the $_POST data & unset unwanted ones, make sure the campaign is not already sent
        unset ($data['id']);
        foreach ($data as $field => $value) {
            $this->mc->campaignUpdate($id, $field, $value);
        }
    }

    /**
     * Creates a new campaign
     * http://apidocs.mailchimp.com/1.3/campaigncreate.func.php
     *
     * @param array $data The campaign data
     */
    public function campaignCreate(array $data = array()) {
        $type = $data['campaign_type'];
        $options = array();
        $content = array();
        $segmentOptions = null;
        $typeOptions = null;
        $this->mc->campaignCreate($type, $options, $content, $segmentOptions, $typeOptions);
    }

    /**
     * Returns an array of lists attached to the MailChimp account
     * http://apidocs.mailchimp.com/1.3/lists.func.php
     *
     * @param array $filters An array of options to filter the lists
     * @param null||int $start
     * @param null||int $limit
     * @return array The list(s) details
     */
    public function getLists(array $filters = array(), $start = null, $limit = null) {
        $lists = $this->mc->lists($filters, $start, $limit);
        return $lists;
    }

    /**
     * Prepares the lists data to be used in the MODX manager
     *
     * @param array $data The list(s) data from MailChimp API
     * @param boolean $mergeTags Whether or not to include the list merge tags
     * @param boolean $location Whether or not to include list's subscribers locations
     * @return array The list(s) details
     */
    public function displayLists(array $data = array(), $mergeTags = false, $location = false) {
        $output = array();
        foreach ($data['data'] as $listData) {
            $stats = $listData['stats'];
            unset ($listData['stats']);
            // Threat the stats data (prefixed with "stats-")
            foreach ($stats as $key => $value) {
                $listData['stats-'. $key] = $value;
            }
            // Threat the merge tags
            if ($mergeTags) {
                $listData['mergevars'] = $this->listMergeVars($listData['id']);
            }
            // Threat subscribers locations
            if ($location) {
                $listData['locations'] = $this->listLocations($listData['id']);
            }
            $output[] = $listData;
        }
        return $output;
    }

    /**
     * Returns a list of merge tags for a given MailChimp list
     * http://apidocs.mailchimp.com/api/1.3/listmergevars.func.php
     *
     * @param string $id The list ID
     * @return array The merge tags list
     */
    public function listMergeVars($id) {
        $merge = $this->mc->listMergeVars($id);
        $output = array();
        foreach ($merge as $tag) {
            /*if ($tag['helptext'] === null) {
                // @todo: i18n
                $tag['helptext'] = 'not defined';
            }*/

            if ($tag['req']) {
                $tag['required'] = $this->modx->lexicon('yes');
            } else {
                $tag['required'] = $this->modx->lexicon('no');
            }
            $output[] = $tag;
        }

        return $output;
    }

    /**
     * Creates a new merge to for a given MailChimp list
     * http://apidocs.mailchimp.com/api/1.3/listmergevaradd.func.php
     *
     * @param array $data The merge tag data
     * @return boolean Whether of not the action went fine
     */
    public function listMergeVarAdd(array $data = array()) {
        $id = $data['id'];
        $tag = $data['tag'];
        $name = $data['name'];
        $options = $data['options'];
        $response = $this->mc->listMergeVarAdd($id, $tag, $name, $options);
        return $response;
    }

    /**
     * Returns a list of members of the given MailChimp list
     * http://apidocs.mailchimp.com/api/1.3/listmembers.func.php
     *
     * @param string $id The list ID to grab members from
     * @param array $params An array of options to filter the members
     * @param null||int $start
     * @param null||int $limit
     * @return array The list of members found
     */
    public function listMembers($id, array $params = array(), $start = null, $limit = null) {
        $status = $params['status'];
        $since = $params['since'];
        $subscribers = $this->mc->listMembers($id, $status, $since, $start, $limit);
        return $subscribers;
    }

    /**
     * Prepares the members list to be used in the MODX manager
     *
     * @param array $data
     * @return array The list of members
     */
    public function displayMembers(array $data) {
        $output = array();
        foreach ($data as $subscriber) {
            $inDb = $this->isModUser($subscriber['email']);
            if ($inDb) {
                $subscriber['moduser'] = $this->isModUser($subscriber['email'], true);
            } else {
                // @todo: i18n
                $subscriber['moduser'] = 'not found in your user list';
            }
            $output[] = $subscriber;
        }
        return $output;
    }

    /**
     * Checks if a modUser is found using the same email address
     *
     * @param string $mail The user email address to look for
     * @param boolean $return Whether or not to return the modUser username if a match if found
     * @return boolean|mixed Whether true/false if a matching modUser is found, or the user username if found
     */
    public function isModUser($mail, $return = false) {
        /** @var $profile modUserProfile */
        $profile = $this->modx->getObject('modUserProfile', array('email' => $mail));
        if ($profile) {
            if ($return) {
                /** @var $user modUser */
                $user = $profile->getOne('User');
                return $user->get('username');
            }
            return true;
        }
        return false;
    }

    /**
     * Retrieves a list of subscribers locations for the given MailChimp list
     * http://apidocs.mailchimp.com/api/1.3/listlocations.func.php
     *
     * @param string $id The list ID to retrieve subscribers' locations from
     * @return array The locations
     */
    public function listLocations($id) {
        $locations = $this->mc->listLocations($id);
        return $locations;
    }

    /**
     * Checks if there is any error coming from the MailChimp API
     *
     * @return boolean
     */
    public function isError() {
        if ($this->mc->errorCode){
            return true;
        }
        return false;
    }

    /**
     * Returns error message from MailChimp API
     * http://apidocs.mailchimp.com/api/1.3/exceptions.field.php
     *
     * @return array|string The error message
     */
    public function getError() {
        if ($this->mc->errorCode){
            // @todo: provide more readable error messages
            /*$code = ltrim($this->mc->errorCode, '-');
            $i18n = $this->modx->lexicon('chimpx_error_'. $code);*/
            $msg = $this->modx->lexicon('chimpx.error_info', array(
                'number' => $this->mc->errorCode,
                'message' => $this->mc->errorMessage,
            ));
            return $this->modx->error->failure($msg);
        }
    }
}