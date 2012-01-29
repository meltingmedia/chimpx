/**
 * @class chimpx.panel.Account
 * @extends MODx.FormPanel
 * @param config
 * @xtype chimpx-panel-account
 */
chimpx.panel.Account = function(config) {
    config = config || {};
    //console.log(config);

    Ext.applyIf(config, {
        id: 'chimpx-panel-account'
        ,bodyStyle: ''
        ,cls: 'container'
        ,items: []
        ,listeners: {
            setup: {
                fn: this._init
                ,scope: this
            }
        }
    });
    chimpx.panel.Account.superclass.constructor.call(this, config);
};
Ext.extend(chimpx.panel.Account, MODx.FormPanel, {
    initialized: false
    // Populate the form panel content
    ,_init: function() {
        this.add({
            html: '<h2>'+ _('chimpx') +'</h2>'
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
            ,items: this.buildTabs()
        });

        // Load the data, if any
        if (!this.initialized) {
            this.getForm().setValues(this.config.record);
        }
        this.fireEvent('ready');
        this.initialized = true;
    }
    // Loads tabs
    ,buildTabs: function() {
        var tabs = [];
        tabs.push({
            title: 'Account summary'
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
                    ,items: this.buildLeftSummary()
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
                    ,items: this.buildRightSummary()
                }]
            }]
        });
        // Contact
        /*tabs.push({
            title: 'Contact'
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
                    ,items: []
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
                    ,items: []
                }]
            }]
        });
        // Modules
        tabs.push({
            title: 'Modules'
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
                    ,items: []
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
                    ,items: []
                }]
            }]
        });
        // Orders
        tabs.push({
            title: 'Orders'
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
                    ,items: []
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
                    ,items: []
                }]
            }]
        });
        // Rewards
        tabs.push({
            title: 'Rewards'
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
                    ,items: []
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
                    ,items: []
                }]
            }]
        });*/
        return tabs;
    }
    //
    ,buildLeftSummary: function() {
        var data = [];
        data.push({
            xtype: 'statictextfield'
            ,fieldLabel: 'Username'
            ,name: 'username'
        });
        return data;
    }
    //
    ,buildRightSummary: function() {
        var data = [];
        data.push({
            xtype: 'statictextfield'
            ,fieldLabel: 'Member since'
            ,name: 'member_since'
        },{
            xtype: 'statictextfield'
            ,fieldLabel: 'Last login'
            ,name: 'last_login'
        });
        return data;
    }
});
Ext.reg('chimpx-panel-account', chimpx.panel.Account);