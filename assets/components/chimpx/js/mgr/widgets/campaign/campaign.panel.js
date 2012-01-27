/**
 * @class chimpx.panel.Campaign
 * @extends MODx.FormPanel
 * @param config
 * @xtype chimpx-panel-campaign
 */
chimpx.panel.Campaign = function(config) {
    config = config || {};

    var tabs = [];
    var t1LeftColumn = [];
    t1LeftColumn.push({
        xtype: 'textfield'
        ,fieldLabel: _('chimpx.campaign_subject')
        ,description: _('chimpx.campaign_subject_desc')
        ,name: 'subject'
        ,allowBlank: false
    },{
        xtype: 'textfield'
        ,fieldLabel: _('chimpx.campaign_title')
        ,description: _('chimpx.campaign_title_desc')
        ,name: 'title'
    },{
        xtype: 'textfield'
        ,fieldLabel: _('chimpx.campaign_url')
        ,description: _('chimpx.campaign_url_desc')
        ,name: 'url'
        ,allowBlank: false
    });
    var t1RightColumn = [];
    t1RightColumn.push({
        xtype: 'chimpx-combo-mclists'
        ,fieldLabel: _('chimpx.campaign_list_select')
        ,description: _('chimpx.campaign_list_select_desc')
        ,allowBlank: false
        ,name: 'list_select'
        ,listeners: {
            select: this.setListDefaults
        }
    },{
        xtype: 'chimpx-combo-mccampaigntype'
        ,fieldLabel: _('chimpx.campaign_campaign_type')
        ,description: _('chimpx.campaign_campaign_type_desc')
        ,allowBlank: false
        ,name: 'campaign_type'
    },{
        xtype: 'textfield'
        ,id: 'list_from_name'
        ,fieldLabel: _('chimpx.list_from_name')
        ,description: _('chimpx.list_from_name_desc')
        ,allowBlank: false
        ,name: 'from_name'
    },{
        xtype: 'textfield'
        ,id: 'list_from_email'
        ,fieldLabel: _('chimpx.list_from_email')
        ,description: _('chimpx.list_from_email_desc')
        ,allowBlank: false
        ,name: 'from_email'
    });
    // Campaign data tab
    tabs.push({
        title: 'Campaign data'
        ,bodyCssClass: 'main-wrapper'
        ,layout: 'form'
        ,defaults: {
            border: false
        }
        ,items: [{
            layout:'column'
            ,border: false
            ,anchor: '100%'
            ,defaults: {
                labelSeparator: ''
                ,labelAlign: 'top'
                ,border: false
                ,msgTarget: 'under'
            }
            ,items:[{
                columnWidth: .67
                ,layout: 'form'
                ,defaults: {
                    msgTarget: 'under'
                    ,anchor: '100%'
                }
                ,items: t1LeftColumn
            },{
                columnWidth: .33
                ,layout: 'form'
                ,labelWidth: 0
                ,border: false
                ,style: 'margin-right: 0'
                ,defaults: {
                    msgTarget: 'under'
                    ,anchor: '100%'
                }
                ,items: t1RightColumn
            }]
        }]
    });

    var items = [];
    // Header
    items.push({
        html: '<h2>'+ _('chimpx.campaign') +'</h2>'
        ,border: false
        ,cls: 'modx-page-header'
    });
    // Populate the tabs
    items.push(MODx.getPageStructure(
        tabs
    ));

    Ext.apply(config, {
        cls: 'container'
        ,layout: 'form'
        ,items: items
    });
    chimpx.panel.Campaign.superclass.constructor.call(this, config);
};
Ext.extend(chimpx.panel.Campaign, MODx.FormPanel, {
    // Sets the default list data to the appropriates fields
    setListDefaults: function(e) {
        console.log(this.record);
        //console.log(e);
        var name = Ext.getCmp('list_from_name');
        var mail = Ext.getCmp('list_from_email');
        //console.log(name.getValue());
        /*if (name) {
            name.setValue(e.fields[2]);
        }*/
    }
});
Ext.reg('chimpx-panel-campaign', chimpx.panel.Campaign);