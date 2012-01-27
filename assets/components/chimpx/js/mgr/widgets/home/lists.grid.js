/**
 * @class chimpx.grid.Lists
 * @extends MODx.grid.Grid
 * @param config
 * @xtype chimpx-grid-lists
 */
chimpx.grid.Lists = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        id: 'chimpx-grid-lists'
        ,url: chimpx.config.connector_url
        ,baseParams: {
            action: 'mgr/list/getlist'
        }
        ,fields: ['id', 'web_id', 'name', 'date_created', 'member_count', 'stats']
        ,autoHeight: true
        ,paging: true
        ,remoteSort: true
        ,columns: [{
            header: 'ID'
            ,dataIndex: 'id'
            ,width: 50
        },{
            header: _('chimpx.list_name')
            ,dataIndex: 'name'
        },{
            header: _('chimpx.list_member_count')
            ,dataIndex: 'member_count'
            ,width: 50
        },{
            header: _('chimpx.list_date_created')
            ,dataIndex: 'date_created'
            ,width: 100
        }]
    });
    chimpx.grid.Lists.superclass.constructor.call(this, config);
};
Ext.extend(chimpx.grid.Lists, MODx.grid.Grid);
Ext.reg('chimpx-grid-lists', chimpx.grid.Lists);