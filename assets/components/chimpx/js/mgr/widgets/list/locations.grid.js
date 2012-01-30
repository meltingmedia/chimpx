/**
 * @class chimpx.grid.Locations
 * @extends MODx.grid.Grid
 * @param config
 * @xtype chimpx-grid-list-locations
 */
chimpx.grid.Locations = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        id: 'chimpx-grid-list-locations'
        ,url: chimpx.config.connector_url
        ,baseParams: {
            action: 'mgr/list/getlocations'
            ,list: config.list
        }
        ,fields: ['country', 'cc', 'percent', 'total']
        ,autoHeight: true
        ,remoteSort: true
        ,singleText: _('chimpx.campaign')
        ,pluralText: _('chimpx.mergevars')
        ,columns: [{
            header: 'Country'
            ,dataIndex: 'country'
        },{
            header: '%'
            ,dataIndex: 'percent'
            ,width: 20
        },{
            header: 'Total'
            ,dataIndex: 'total'
            ,width: 20
        }]
    });
    chimpx.grid.Locations.superclass.constructor.call(this, config);
};

// grid menus + functions
Ext.extend(chimpx.grid.Locations, MODx.grid.Grid);
Ext.reg('chimpx-grid-list-locations', chimpx.grid.Locations);