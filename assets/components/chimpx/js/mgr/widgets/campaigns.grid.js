chimpx.grid.Campaigns = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'chimpx-grid-campaigns'
        ,url: chimpx.config.connector_url
        ,baseParams: {
            action: 'mgr/campaign/getlist'
        }
        ,fields: [
            'id','title','send_time','emails_sent','status','subject'
            ,'web_id','list_id','folder_id','template_id','content_type','type','create_time','from_name','from_email'
            ,'to_name','archive_url','inline_css','analytics','analytics_tag','authenticate','ecomm360','auto_tweet'
            ,'auto_fb_post','auto_footer','timewarp','timewarp_schredule','segment_text','segment_opts','type_opts'
        ]
        ,autoHeight: true
        ,paging: true
        ,remoteSort: true
        ,columns: [{
            header: _('chimpx.campaign_list_name')
            ,dataIndex: 'list_id'
            ,width: 70
            ,editor: { xtype: 'chimpx-combo-listlists' ,renderer: true }
        },{
            header: _('chimpx.campaign_name')
            ,dataIndex: 'title'
            ,width: 100
            ,sortable: true
        },{
            header: _('chimpx.campaign_subject')
            ,dataIndex: 'subject'
            ,width: 250
        },{
            header: _('chimpx.campaign_status')
            ,dataIndex: 'status'
            ,width: 50
        }]
        ,tbar: [{
            text: _('chimpx.campaign_create')
            ,handler: this.createCampaign
            ,scope: this
        }]
    });
    chimpx.grid.Campaigns.superclass.constructor.call(this,config);
};

// grid menus + functions
Ext.extend(chimpx.grid.Campaigns,MODx.grid.Grid,{
    windows: {}

    ,getMenu: function() {
        var m = [];
        // for saved campaigns
        if (this.menu.record.status == 'save') {
            m.push({
                text: _('chimpx.campaign_update')
                ,handler: this.updateCampaign
            });
            m.push('-');
            m.push({
                text: _('chimpx.campaign_send_test')
                ,handler: this.sendTest
            });
            m.push({
                text: _('chimpx.campaign_send')
                ,handler: this.sendCampaign
            });
            // @TODO: schredule
            m.push('-');
        }
        // for sent campaigns
        /*if (this.menu.record.status == 'sent') {
            m.push({
                text: _('chimpx.campaign_stats')
                ,handler: ''
            });
            m.push('-');
        }*/
        // for all campaigns
        m.push({
            text: _('chimpx.campaign_replicate')
            ,handler: this.replicateCampaign
        });
        m.push({
            text: _('chimpx.campaign_remove')
            ,handler: this.removeCampaign
        });
        this.addContextMenuItem(m);
    }

    ,createCampaign: function(btn,e) {
        if (!this.windows.createCampaign) {
            this.windows.createCampaign = MODx.load({
                xtype: 'chimpx-window-campaign-create'
                ,listeners: {
                    'success': {fn:function() { this.refresh(); },scope:this}
                }
            });
        }
        this.windows.createCampaign.fp.getForm().reset();
        this.windows.createCampaign.show(e.target);
    }

// @TODO: campaign wizard
/*
    ,createCampaign: function(btn,e,r) {
        this.loadWindow(btn,e,{
            xtype: 'chimpx-window-campaign-wizard'
            ,listeners: {
                'finish': {fn: function(va) { this._install(this.menu.record,va); },scope:this}
            }
        });
    }

*/

    ,updateCampaign: function(btn,e) {
        if (!this.menu.record || !this.menu.record.id) return false;
        var r = this.menu.record;

        if (!this.windows.updateCampaign) {
            this.windows.updateCampaign = MODx.load({
                xtype: 'chimpx-window-campaign-update'
                ,record: r
                ,listeners: {
                    'success': {fn:function() { this.refresh(); },scope:this}
                }
            });
        }
        this.windows.updateCampaign.fp.getForm().reset();
        this.windows.updateCampaign.fp.getForm().setValues(r);
        this.windows.updateCampaign.show(e.target);
    }

    ,removeCampaign: function(btn,e) {
        if (!this.menu.record) return false;
        
        MODx.msg.confirm({
            title: _('chimpx.campaign_remove')
            ,text: _('chimpx.campaign_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/campaign/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:function(r) { this.refresh(); },scope:this}
            }
        });
    }

    ,replicateCampaign: function(btn,e) {
        if (!this.menu.record) return false;

        MODx.msg.confirm({
            title: _('chimpx.campaign_replicate')
            ,text: _('chimpx.campaign_replicate_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/campaign/replicate'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:function(r) { this.refresh(); },scope:this}
            }
        });
    }

    ,sendCampaign: function(btn,e) {
        if (!this.menu.record) return false;

        MODx.msg.confirm({
            title: _('chimpx.campaign_send')
            ,text: _('chimpx.campaign_send_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/campaign/send'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:function(r) { this.refresh(); },scope:this}
            }
        });
    }

    ,sendTest: function(btn,e) {
        if (!this.menu.record || !this.menu.record.id) return false;
        var r = this.menu.record;

        if (!this.windows.sendTest) {
            this.windows.sendTest = MODx.load({
                xtype: 'chimpx-window-campaign-send_test'
                ,record: r
                ,listeners: {
                    'success': {fn:function() { this.refresh(); },scope:this}
                }
            });
        }
        this.windows.sendTest.fp.getForm().reset();
        this.windows.sendTest.fp.getForm().setValues(r);
        this.windows.sendTest.show(e.target);
    }
});
Ext.reg('chimpx-grid-campaigns',chimpx.grid.Campaigns);



// create campaign window
chimpx.window.CreateCampaign = function(config) {
    config = config || {};
    this.ident = config.ident || 'cxcampaign'+Ext.id();
    Ext.applyIf(config,{
        title: _('chimpx.campaign_create')
        ,id: this.ident
        ,height: 150
        ,width: 575
        //,layout: 'card'
        //,modal: true
        ,url: chimpx.config.connector_url
        ,action: 'mgr/campaign/create'
        //,layout: 'card'
        ,fields: [{
            xtype: 'chimpx-combo-listlists'
            ,fieldLabel: _('chimpx.campaign_list_select')
            ,description: _('chimpx.campaign_list_select_desc')
            ,labelStyle: 'width: 180px'
            ,name: 'list_select'
            ,width: 300
            ,listWidth: 350
        },{
            xtype: 'chimpx-combo-campaigntype'
            ,fieldLabel: _('chimpx.campaign_campaign_type')
            ,description: _('chimpx.campaign_campaign_type_desc')
            ,labelStyle: 'width: 180px'
            ,name: 'campaign_type'
            ,width: 300
            ,listWidth: 350
        },{
            xtype: 'textfield'
            ,fieldLabel: _('chimpx.campaign_subject')
            ,description: _('chimpx.campaign_subject_desc')
            ,labelStyle: 'width: 180px'
            ,name: 'subject'
            ,id: 'chimpx-'+this.ident+'-subject'
            ,width: 300
            ,allowBlank: false
            //,description: 'i am little helper!! DO THIS!'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('chimpx.campaign_title')
            ,description: _('chimpx.campaign_title_desc')
            ,labelStyle: 'width: 180px'
            ,name: 'title'
            ,id: 'chimpx-'+this.ident+'-title'
            ,width: 300
        },{
            xtype: 'textfield'
            ,fieldLabel: _('chimpx.campaign_url')
            ,description: _('chimpx.campaign_url_desc')
            ,labelStyle: 'width: 180px'
            ,name: 'url'
            ,id: 'chimpx-'+this.ident+'-url'
            ,width: 300
            ,allowBlank: false
        }/*,{
            //xtype: 'chimpx-combo-list_to_name'
            xtype: 'textfield'
            ,fieldLabel: _('chimpx.list_to_name')
            ,labelStyle: 'width: 180px'
            ,description: _('chimpx.list_to_name_desc')
            ,name: 'to_name'
            ,id: 'chimpx-'+this.ident+'-to_name'
            ,width: 300
        }*/,{
            xtype: 'textfield'
            ,fieldLabel: _('chimpx.list_from_name')
            ,description: _('chimpx.list_from_name_desc')
            ,labelStyle: 'width: 180px'
            ,name: 'from_name'
            ,id: 'chimpx-'+this.ident+'-from_name'
            ,width: 300
            ,allowBlank: false
        },{
            xtype: 'textfield'
            ,fieldLabel: _('chimpx.list_from_email')
            ,description: _('chimpx.list_from_email_desc')
            ,labelStyle: 'width: 180px'
            ,name: 'from_email'
            ,id: 'chimpx-'+this.ident+'-from_email'
            ,width: 300
            ,allowBlank: false
        },{
            //xtype: 'combo-boolean'
            xtype: 'chimpx-boolean'
            ,fieldLabel: _('chimpx.campaign_generate_text')
            ,description: _('chimpx.campaign_generate_text_desc')
            ,labelStyle: 'width: 180px'
            ,name: 'generate_text'
            ,id: 'chimpx-'+this.ident+'-generate_text'
            ,width: 300
        }]
        /*,buttons: [{
            text: config.cancelBtnText || _('cancel')
            ,scope: this
            ,handler: function() { this.hide(); }
        },{
            text: config.saveBtnText || _('save')
            ,scope: this
            ,handler: function() { this.submit(false); }
        },{
            text: config.saveBtnText || _('save_and_close')
            ,scope: this
            ,handler: this.submit
        }]*/
    });
    chimpx.window.CreateCampaign.superclass.constructor.call(this,config);
};
Ext.extend(chimpx.window.CreateCampaign,MODx.Window);
Ext.reg('chimpx-window-campaign-create',chimpx.window.CreateCampaign);

// update campaign window @ TODO: save per field basis (only allowed by API)
chimpx.window.updateCampaign = function(config) {
    config = config || {};
    this.ident = config.ident || 'cxupdate'+Ext.id();
    Ext.applyIf(config,{
        title: _('chimpx.campaign_update')
        ,id: this.ident
        ,height: 150
        ,width: 475
        ,url: chimpx.config.connector_url
        ,action: 'mgr/campaign/update'
        ,html: '<p>Just a test</p>'
        ,fields: [{
            fieldLabel: 'id'
            ,xtype: 'textfield'
            ,name: 'id'
            ,id: 'chimpx-'+this.ident+'-id'
            ,dataIndex: 'id'
            ,editable: false
            ,hidden: true
        },{
            xtype: 'chimpx-combo-listlists'
            ,fieldLabel: _('chimpx.campaign_list_select')
            ,name: 'list_select'
            ,width: 300
            ,listWidth: 350
        },{
            xtype: 'chimpx-combo-campaigntype'
            ,fieldLabel: _('chimpx.campaign_campaign_type')
            ,name: 'campaign_type'
            ,width: 300
            ,listWidth: 350
        },{
            xtype: 'textfield'
            ,fieldLabel: _('chimpx.campaign_subject')
            ,name: 'subject'
            ,id: 'chimpx-'+this.ident+'-subject'
            ,width: 300
            ,allowBlank: false
        },{
            xtype: 'textfield'
            ,fieldLabel: _('chimpx.campaign_title')
            ,name: 'title'
            ,id: 'chimpx-'+this.ident+'-title'
            ,width: 300
        },{
            xtype: 'textfield'
            ,fieldLabel: _('chimpx.campaign_url')
            ,name: 'url'
            ,id: 'chimpx-'+this.ident+'-url'
            ,width: 300
            ,allowBlank: false
        },{
            //xtype: 'chimpx-combo-list_to_name'
            xtype: 'textfield'
            ,fieldLabel: _('chimpx.list_to_name')
            ,name: 'to_name'
            ,id: 'chimpx-'+this.ident+'-to_name'
            ,width: 300
        },{
            xtype: 'textfield'
            ,fieldLabel: _('chimpx.list_from_name')
            ,name: 'from_name'
            ,id: 'chimpx-'+this.ident+'-from_name'
            ,width: 300
            ,allowBlank: false
        },{
            xtype: 'textfield'
            ,fieldLabel: _('chimpx.list_from_email')
            ,name: 'from_email'
            ,id: 'chimpx-'+this.ident+'-from_email'
            ,width: 300
            ,allowBlank: false
        },{
            //xtype: 'combo-boolean'
            xtype: 'chimpx-boolean'
            ,fieldLabel: _('chimpx.campaign_generate_text')
            ,name: 'generate_text'
            ,id: 'chimpx-'+this.ident+'-generate_text'
            ,width: 300
        }],buttons: [{
            text: _('chimpx.update_close')
            ,scope: this
            ,handler: function() { this.hide(); }
        }/*,{
            text: config.saveBtnText || _('save')
            ,scope: this
            ,handler: function() { this.submit(false); }
        },{
            text: config.saveBtnText || _('save_and_close')
            ,scope: this
            ,handler: this.submit
        }*/]
    });
    chimpx.window.updateCampaign.superclass.constructor.call(this,config);
};
Ext.extend(chimpx.window.updateCampaign,MODx.Window);
Ext.reg('chimpx-window-campaign-update',chimpx.window.updateCampaign);


// send test window
chimpx.window.sendTest = function(config) {
    config = config || {};
    this.ident = config.ident || 'cxsendTest'+Ext.id();
    Ext.applyIf(config,{
        title: _('chimpx.campaign_send_test')
        ,id: this.ident
        ,height: 150
        ,width: 475
        ,url: chimpx.config.connector_url
        ,action: 'mgr/campaign/sendTest'
        ,fields: [{
            xtype: 'textfield'
            ,fieldLabel: 'id'
            ,name: 'id'
            ,id: 'chimpx-'+this.ident+'-id'
            ,dataIndex: 'id'
            ,hidden: true
        },{
            xtype: 'textfield'
            ,fieldLabel: _('chimpx.campaign_send_test_email')
            ,name: 'test_email'
            ,id: 'chimpx-'+this.ident+'-test_email'
            ,dataIndex: 'test_email'
            ,vtype: 'email'
            ,allowBlank: false
        }]
    });
    chimpx.window.sendTest.superclass.constructor.call(this,config);
};
Ext.extend(chimpx.window.sendTest,MODx.Window);
Ext.reg('chimpx-window-campaign-send_test',chimpx.window.sendTest);

// MailChimp lists combo box
chimpx.combo.listLists = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        name : 'list_lists'
        ,hiddenName : 'list_select'
        ,forceSelection: true
        ,selectOnFocus: true
        ,fields: ['id', 'name']
        ,displayField : 'name'
        ,valueField : 'id'
        ,triggerAction : 'all'
        ,lazyRender: true
        ,editable : false
        ,typeAhead: false
        ,width : 150
        ,listWidth: 200
        ,blankText: _('chimpx.list_combo_blank')
        ,emptyText: _('chimpx.list_combo_empty')
        ,allowBlank: false
        ,url: chimpx.config.connector_url
        ,baseParams: {
            action: 'mgr/list/getlist'
            ,combo: true
        }
    });
    chimpx.combo.listLists.superclass.constructor.call(this, config);
};
Ext.extend(chimpx.combo.listLists, MODx.combo.ComboBox);
Ext.reg('chimpx-combo-listlists', chimpx.combo.listLists);

// campaigns types combo box
chimpx.combo.CampaignTypes = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        name : 'campaign_type'
        ,hiddenName : 'campaign_type'
        ,forceSelection: true
        ,selectOnFocus: true
        ,displayField : 'campaign-type'
        ,valueField : 'id'
        ,triggerAction : 'all'
        ,lazyRender: true
        ,mode : 'local'
        ,typeAhead: true
        ,width : 150
        ,listWidth: 200
        ,editable: false
        ,blankText: _('chimpx.campaigntype_combo_blank')
        ,emptyText: _('chimpx.campaigntype_combo_empty')
        ,allowBlank: false
        ,store : new Ext.data.SimpleStore({
            fields : ['id', 'campaign-type']
            ,data : [
                ['regular', _('chimpx.campaigntype_combo_regular')]
                ,['plaintext', _('chimpx.campaigntype_combo_plaintext')]
                ,['absplit', _('chimpx.campaigntype_combo_absplit')]
                ,['rss', _('chimpx.campaigntype_combo_rss')]
                ,['trans', _('chimpx.campaigntype_combo_trans')]
                ,['auto', _('chimpx.campaigntype_combo_auto')]
            ]
        })
        //,url: Cours.config.connector_url
        ,baseParams: {
            //action: 'mgr/questions/getlist'
            combo: true
        }
    });
    chimpx.combo.CampaignTypes.superclass.constructor.call(this, config);
};
Ext.extend(chimpx.combo.CampaignTypes, MODx.combo.ComboBox);
Ext.reg('chimpx-combo-campaigntype', chimpx.combo.CampaignTypes);

// MailChimp list to_name combo box @ TODO: grab default to_name field/value (merge tags) from list settings + allow override
/*
chimpx.combo.to_name = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        name : 'chimpx-combo-list_to_name'
        ,hiddenName : 'to_name'
        ,forceSelection: true
        ,selectOnFocus: true
        ,fields: ['id', 'name']
        ,displayField : 'name'
        ,valueField : 'id'
        ,triggerAction : 'all'
        ,lazyRender: true
        ,editable : false
        ,typeAhead: false
        ,width : 150
        ,listWidth: 200
        ,blankText: _('chimpx.list_combo_blank')
        ,emptyText: _('chimpx.list_combo_empty')
        ,allowBlank: false
        ,url: chimpx.config.connector_url
        ,baseParams: {
            action: 'mgr/list/to_name'
            ,combo: true
        }
    });
    chimpx.combo.to_name.superclass.constructor.call(this, config);
};
Ext.extend(chimpx.combo.to_name, MODx.combo.ComboBox);
Ext.reg('chimpx-combo-listlists', chimpx.combo.to_name);
*/

// booleans (used for generate_text)
chimpx.combo.yesno = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        name : 'chimpx_boolean'
        ,hiddenName : 'chimpx_boolean'
        ,forceSelection: true
        ,selectOnFocus: true
        ,displayField : 'value'
        ,valueField : 'id'
        ,triggerAction : 'all'
        ,lazyRender: true
        ,mode : 'local'
        ,typeAhead: false
        ,width : 150
        ,listWidth: 200
        ,editable: false
        //,blankText: _('chimpx.boolean_true')
        //,emptyText: _('chimpx.boolean_true')
        ,allowBlank: false
        ,store : new Ext.data.SimpleStore({
            fields : ['id', 'value']
            ,data : [
                ['true', _('chimpx.boolean_true')]
                ,['false', _('chimpx.boolean_false')]
            ]
        })
        //,url: Cours.config.connector_url
        ,baseParams: {
            //action: 'mgr/questions/getlist'
            combo: true
        }
    });
    chimpx.combo.yesno.superclass.constructor.call(this, config);
};
Ext.extend(chimpx.combo.yesno, MODx.combo.ComboBox);
Ext.reg('chimpx-boolean', chimpx.combo.yesno);