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
        ,fields: ['email', 'moduser']
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
Ext.extend(chimpx.grid.Subscribers, MODx.grid.Grid);
Ext.reg('chimpx-grid-list-subscribers', chimpx.grid.Subscribers);