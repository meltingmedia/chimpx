
chimpx.grid.Chatters = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'chimpx-grid-chatters'
        ,url: chimpx.config.connector_url
        ,baseParams: {
            action: 'mgr/chatters/getlist'
        }
        ,fields: ['message','type','url','list_id','campaign_id','update_time']
        ,autoHeight: true
        ,paging: true
        ,remoteSort: true
        ,columns: [{
            header: 'update_time'
            ,dataIndex: 'update_time'
            ,width: 70
        },{
            header: 'type'
            ,dataIndex: 'type'
            ,width: 100
            //,sortable: true
        },{
            header: 'message'
            ,dataIndex: 'message'
            ,width: 250
        },{
            header: 'url'
            ,dataIndex: 'url'
            ,width: 100
        },{
            header: 'list_id'
            ,dataIndex: 'list_id'
            ,width: 50
        },{
            header: 'campaign_id'
            ,dataIndex: 'campaign_id'
            ,width: 50
        },{
            header: 'update_time'
            ,dataIndex: 'update_time'
            ,width: 50
        }]
    });
    chimpx.grid.Chatters.superclass.constructor.call(this,config);
};

Ext.extend(chimpx.grid.Lists,MODx.grid.Grid,{
    windows: {}
});
Ext.reg('chimpx-grid-chatters',chimpx.grid.Chatters);