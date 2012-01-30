/**
 * @class chimpx.panel.Subscriber
 * @extends MODx.FormPanel
 * @param config
 * @xtype chimpx-panel-subscriber
 */
chimpx.panel.Subscriber = function(config) {
    config = config || {};
    //console.log(config.record);

    Ext.applyIf(config, {
        id: 'chimpx-panel-subscriber'
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
    chimpx.panel.Subscriber.superclass.constructor.call(this, config);
};
Ext.extend(chimpx.panel.Subscriber, MODx.FormPanel, {
    initialized: false
    // Populate the form panel content
    ,_init: function() {
        this.add({
            html: '<h2>'+ _('chimpx.subscriber_tab_overview') + this.config.record.email +'</h2>'
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
            /*var subsCombo = Ext.getCmp('subscribers-status');
            if (subsCombo) {
                subsCombo.setValue('subscribed');
            }*/
            this.getForm().setValues(this.config.record);
        }
        this.fireEvent('ready');
        this.initialized = true;
    }
    // Loads tabs
    ,buildTabs: function() {
        var tabs = [];
        tabs.push({
            title: _('chimpx.list_tab_details')
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
        return tabs;
    }
    //
    ,buildLeftSummary: function() {
        var data = [];
        data.push({
            xtype: 'statictextfield'
            ,fieldLabel: 'email'
            ,name: 'email'
        });
        return data;
    }
    //
    ,buildRightSummary: function() {
        var data = [];
        data.push({
            xtype: 'statictextfield'
            ,fieldLabel: 'List'
            ,dataIndex: 'list_name'
        },{
            xtype: 'statictextfield'
            ,fieldLabel: 'Status'
            ,dataIndex: 'status'
        });
        if (this.config.record.moduserid) {
            var userid = this.config.record.moduserid;
            var username = this.config.record.moduser;
            data.push({
                html: '<a href="javascript:;" onclick="location.href = \'?a='+ MODx.action["security/user/update"] +'&id='+ userid +'\'">'+ username +'</a>'
                ,title: 'modUser'
                ,border: false
            });
        }
        return data;
    }
});
Ext.reg('chimpx-panel-subscriber', chimpx.panel.Subscriber);