/**
 * @class chimpx.panel.Campaign
 * @extends MODx.FormPanel
 * @param config
 * @xtype chimpx-panel-campaign
 */
chimpx.panel.Campaign = function(config) {
    config = config || {record: {}};
    config.record = config.record || {};
    //console.log(config.record);

    Ext.apply(config, {
        cls: 'container'
        ,id: 'chimpx-panel-campaign'
        ,items: []
        ,listeners: {
            setup: {
                fn: this._init
                ,scope: this
            }
        }
    });
    chimpx.panel.Campaign.superclass.constructor.call(this, config);
    //this.on('render', this._init, this);
};
Ext.extend(chimpx.panel.Campaign, MODx.FormPanel, {
    initialized: false
    // Populate the form panel content
    ,_init: function() {
        this.add({
            html: '<h2>'+ _('chimpx.campaign') +'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'modx-tabs'
            ,id: 'tabs'
            ,defaults: {
                border: false
                ,autoHeight: true
            }
            ,border: true
            ,items: this.getTabs()
        });

        // Load the data, if any
        if (!this.initialized) {
            // Pre load the campaign type
            if (this.config.record.type) {
                var campaign_type_field = Ext.getCmp('campaign_type');
                campaign_type_field.setValue(this.config.record.type);
            }
            // Pre load the list id
            if (this.config.record.list_id) {
                var list_id_field = Ext.getCmp('list_id');
                list_id_field.setValue(this.config.record.list_id);
            }
            // Load the rest of the campaign data
            this.getForm().setValues(this.config.record);
        }
        this.fireEvent('ready');
        this.initialized = true;
    }
    // Populates the main tabs
    ,getTabs: function() {
        var tabs = [];
        // General tab
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
                    ,items: this.getLeftColumn()
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
                    ,items: this.getRightColumn()
                }]
            }]
        });
        return tabs;
    }
    // General tab, left column
    ,getLeftColumn: function() {
        var column = [];
        column.push({
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
        });
        column.push({
            title: 'Campaign content'
            ,layout: 'form'
            ,collapsible: true
            ,bodyCssClass: 'main-wrapper'
            ,style: 'margin-top: 25px'
            ,defaults: {
                anchor: '100%'
            }
            ,items: this.buildContent()
        });
        return column;
    }

    ,buildContent: function() {
        var content = [];
        content.push({
            xtype: 'textfield'
            ,fieldLabel: _('chimpx.campaign_url')
            ,description: _('chimpx.campaign_url_desc')
            ,name: 'url'
            ,allowBlank: false
        });
        /*content.push({
            xtype: 'modx-tabs'
            ,id: 'tabs'
            ,defaults: {
                border: false
                ,autoHeight: true
            }
            //,border: true
            ,items: this.buildContentTabs()
        });*/
        return content;
    }

    ,buildContentTabs: function() {
        var cTabs = [];
        cTabs.push({
            title: 'URL'
            ,bodyCssClass: 'main-wrapper'
            ,defaults: {
                border: false
                ,anchor: '100%'
            }
            ,items: [{
                xtype: 'textfield'
                ,fieldLabel: 'Resource ID'
            }]
        });

        cTabs.push({
            title: 'HTML'
            ,bodyCssClass: 'main-wrapper'
            ,layout: 'form'
            ,anchor: '100%'
            ,defaults: {
                border: false
                ,labelSeparator: ''
                ,labelAlign: 'top'
                ,msgTarget: 'under'
            }
            ,items: [{
                xtype: 'textarea'
                ,fieldLabel: 'Html'
                ,name: 'html'
                ,grow: true
            }]
        });

        cTabs.push({
            title: 'Text'
            ,bodyCssClass: 'main-wrapper'
            ,layout: 'form'
            ,anchor: '100%'
            ,defaults: {
                border: false
                ,labelSeparator: ''
                ,labelAlign: 'top'
                ,msgTarget: 'under'
            }
            ,items: [{
                xtype: 'textarea'
                ,fieldLabel: 'Text'
                ,name: 'text'
                ,grow: true
            }]
        });

        if (!this.config.record.id) {
            cTabs.push({
                title:'Archive'
                ,bodyCssClass:'main-wrapper'
                ,layout:'form'
                ,anchor:'100%'
                ,defaults:{
                    border:false
                    ,labelSeparator:''
                    ,labelAlign:'top'
                    ,msgTarget:'under'
                }
                , items:[]
            });
        }
        return cTabs;
    }
    // General tab, right column
    ,getRightColumn: function() {
        var column = [];
        column.push({
            xtype: 'chimpx-combo-mclists'
            ,id: 'list_id'
            ,fieldLabel: _('chimpx.campaign_list_select')
            ,description: _('chimpx.campaign_list_select_desc')
            ,allowBlank: false
            ,name: 'list_select'
            ,listeners: {
                select: this.onListSelect
            }
        },{
            xtype: 'chimpx-combo-mccampaigntype'
            ,id: 'campaign_type'
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
        return column;
    }

    // Sets the default list data to the appropriates fields
    ,onListSelect: function(e) {
        // Selected index
        var i = e.selectedIndex;
        var s = e.getStore();
        var record = s.getAt(i);
        //console.log(record);
        var nameValue = record.data.default_from_name;
        var mailValue = record.data.default_from_email;
        var subjectValue = record.data.default_subject;
        var name = Ext.getCmp('list_from_name');
        var mail = Ext.getCmp('list_from_email');
        var subject = Ext.getCmp('subject');
        if (name) {
            name.setValue(nameValue);
        }
        if (mail) {
            mail.setValue(mailValue);
        }
        if (subject && subject.getValue == '' && subjectValue != '') {
            subject.setValue(subjectValue);
        }
    }
});
Ext.reg('chimpx-panel-campaign', chimpx.panel.Campaign);