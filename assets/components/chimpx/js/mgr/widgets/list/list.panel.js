/**
 * @class chimpx.panel.List
 * @extends MODx.FormPanel
 * @param config
 * @xtype chimpx-panel-list
 */
chimpx.panel.List = function(config) {
    config = config || {};
    console.log(config.record);

    Ext.applyIf(config, {
        id: 'chimpx-panel-list'
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
    chimpx.panel.List.superclass.constructor.call(this, config);
};
Ext.extend(chimpx.panel.List, MODx.FormPanel, {
    initialized: false
    // Populate the form panel content
    ,_init: function() {
        this.add({
            html: '<h2>'+ _('chimpx.list_overview') + this.config.record.name +'</h2>'
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
        if (this.config.record.mergevars.length >= 1) {
            tabs.push({
                title: _('chimpx.list_tab_mergevars')
                ,defaults: {
                    border: false
                }
                ,items: [{
                    html: _('chimpx.list_tab_mergevars_desc')
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                    xtype: 'chimpx-grid-list-mergevars'
                    //,record: this.config.record.mergevars
                    ,preventRender: true
                    ,cls: 'main-wrapper'
                    ,list: this.config.record.id
                }]
            });
        }
        return tabs;
    }
    //
    ,buildLeftSummary: function() {
        var data = [];
        data.push({
            xtype: 'statictextfield'
            ,fieldLabel: _('chimpx.list_name')
            ,name: 'name'
        });
        return data;
    }
    //
    ,buildRightSummary: function() {
        var data = [];
        data.push({
            xtype: 'statictextfield'
            ,fieldLabel: _('chimpx.list_member_count')
            ,dataIndex: 'stats-member_count'
        },{
            xtype: 'statictextfield'
            ,fieldLabel: 'Unsubscribes'
            ,dataIndex: 'stats-unsubscribe_count'
        },{
            xtype: 'statictextfield'
            ,fieldLabel: 'Cleaned count'
            ,dataIndex: 'stats-cleaned_count'
        },{
            xtype: 'statictextfield'
            ,fieldLabel: 'Campaign count'
            ,dataIndex: 'stats-campaign_count'
        });
        data.push({
            html: '<hr />'
        },{
            html: '<h3>Actived modules</h3>'
        });
        return data;
    }
});
Ext.reg('chimpx-panel-list', chimpx.panel.List);