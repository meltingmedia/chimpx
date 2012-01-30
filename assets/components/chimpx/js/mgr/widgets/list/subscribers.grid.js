/**
 * @class chimpx.grid.Subscribers
 * @extends MODx.grid.Grid
 * @param config
 * @xtype chimpx-grid-list-subscribers
 */
chimpx.grid.Subscribers = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        id: 'chimpx-grid-list-subscribers'
        ,url: chimpx.config.connector_url
        ,baseParams: {
            action: 'mgr/list/getsubscribers'
            ,list: config.list
        }
        ,fields: ['email', 'moduser', 'moduserid']
        ,autoHeight: true
        ,remoteSort: true
        ,paging: true
        ,columns: [{
            header: 'Email'
            ,dataIndex: 'email'
        },{
            header: 'modUser'
            ,dataIndex: 'moduser'
        }]
        ,tbar: ['->',{
            xtype: 'chimpx-combo-subscribers-status'
            ,id: 'subscribers-status'
            ,listeners: {
                select: {
                    fn: function(cb, rec) {
                        this.getStore().baseParams['status'] = rec.data.value;
                        this.getBottomToolbar().changePage(1);
                        this.refresh();
                    }
                    ,scope: this
                }
            }
        }]
    });
    chimpx.grid.Subscribers.superclass.constructor.call(this, config);
};

// grid menus + functions
Ext.extend(chimpx.grid.Subscribers, MODx.grid.Grid, {
    // Grid menu
    getMenu: function() {
        var m = [];
        m.push({
            text: 'MailChimp profile'
            ,handler: function() {
                location.href = '?a='+ chimpx.action +'&action=subscriber&id='+ this.menu.record.email +'&list='+ this.config.list;
            }
        });
        // If modUser is found, display a menu to go to the modUser update page
        if (this.menu.record.moduserid) {
            // @todo: i18n
            m.push({
                text: 'View the MODX profile'
                ,handler: function() {
                    location.href = '?a='+ MODx.action['security/user/update'] +'&id='+ this.menu.record.moduserid
                }
            });
            // @todo: offer a way to sync user data
        }
        this.addContextMenuItem(m);
    }
});
Ext.reg('chimpx-grid-list-subscribers', chimpx.grid.Subscribers);