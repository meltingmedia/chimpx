/**
 * @class chimpx.combo.mcLists
 * @extends MODx.combo.ComboBox
 * @param config
 * @xtype chimpx-combo-mclists
 */
chimpx.combo.mcLists = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        name : 'list_lists'
        ,hiddenName : 'list_select'
        ,forceSelection: true
        ,selectOnFocus: true
        ,fields: ['id', 'name', 'default_from_name', 'default_from_email', 'default_subject']
        ,displayField : 'name'
        ,valueField : 'id'
        ,triggerAction : 'all'
        /*,editable : true
        ,typeAhead: true*/
        ,listWidth: 0
        ,blankText: _('chimpx.list_combo_blank')
        ,emptyText: _('chimpx.list_combo_empty')
        ,url: chimpx.config.connector_url
        ,baseParams: {
            action: 'mgr/list/getlist'
            ,combo: true
        }
    });
    chimpx.combo.mcLists.superclass.constructor.call(this, config);
};
Ext.extend(chimpx.combo.mcLists, MODx.combo.ComboBox);
Ext.reg('chimpx-combo-mclists', chimpx.combo.mcLists);

/**
 * @class chimpx.combo.mcCampaignTypes
 * @extends MODx.combo.ComboBox
 * @param config
 * @xtype chimpx-combo-mccampaigntype
 */
chimpx.combo.mcCampaignTypes = function(config) {
    config = config || {};
    var store = new Ext.data.SimpleStore({
        fields : ['id', 'campaign-type', 'description']
        ,data : [
            ['regular', _('chimpx.campaigntype_combo_regular'), _('chimpx.campaigntype_combo_regular_desc')]
            //,['plaintext', _('chimpx.campaigntype_combo_plaintext'), _('chimpx.campaigntype_combo_plaintext_desc')]
            /*,['absplit', _('chimpx.campaigntype_combo_absplit')]
            ,['rss', _('chimpx.campaigntype_combo_rss')]
            ,['trans', _('chimpx.campaigntype_combo_trans')]
            ,['auto', _('chimpx.campaigntype_combo_auto')]*/
        ]
    });

    Ext.applyIf(config, {
        name : 'campaign_type'
        ,hiddenName : 'campaign_type'
        ,forceSelection: true
        ,selectOnFocus: true
        ,displayField : 'campaign-type'
        ,valueField : 'id'
        ,triggerAction : 'all'
        ,mode : 'local'
        ,listWidth: 0
        ,editable: false
        ,blankText: _('chimpx.campaigntype_combo_blank')
        ,emptyText: _('chimpx.campaigntype_combo_empty')
        ,tpl: '<tpl for=".">' +
            '<div class="x-combo-list-item">' +
                '<p>{campaign-type}</p>' +
                '<span style="font-size: 70%; font-style: italic;">{description}</span>' +
            '</div>' +
            '</tpl>'
        ,store : store
    });
    chimpx.combo.mcCampaignTypes.superclass.constructor.call(this, config);
};
Ext.extend(chimpx.combo.mcCampaignTypes, MODx.combo.ComboBox);
Ext.reg('chimpx-combo-mccampaigntype', chimpx.combo.mcCampaignTypes);

/**
 * @class chimpx.combo.subscribersStatus
 * @extends MODx.combo.ComboBox
 * @param config
 * @xtype chimpx-combo-subscribers-status
 */
chimpx.combo.subscribersStatus = function(config) {
    config = config || {};
    var store = new Ext.data.SimpleStore({
        fields : ['value', 'display']
        ,data : [
            ['subscribed', _('chimpx.subscriber_status_subscribed')]
            ,['unsubscribed', _('chimpx.subscriber_status_unsubscribed')]
            ,['cleaned', _('chimpx.subscriber_status_cleaned')]
            ,['updated', _('chimpx.subscriber_status_updated')]
        ]
    });

    Ext.applyIf(config, {
        name : 'subscribers_status'
        ,hiddenName : 'subscribers_status'
        ,forceSelection: true
        ,selectOnFocus: true
        ,displayField : 'display'
        ,valueField : 'value'
        ,triggerAction : 'all'
        ,mode : 'local'
        ,listWidth: 0
        ,editable: false
        ,store : store
    });
    chimpx.combo.subscribersStatus.superclass.constructor.call(this, config);
};
Ext.extend(chimpx.combo.subscribersStatus, MODx.combo.ComboBox);
Ext.reg('chimpx-combo-subscribers-status', chimpx.combo.subscribersStatus);