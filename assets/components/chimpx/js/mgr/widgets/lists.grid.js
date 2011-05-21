chimpx.grid.Lists = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'chimpx-grid-lists'
        ,url: chimpx.config.connector_url
        ,baseParams: {
            action: 'mgr/list/getlist'
        }
        ,fields: [
            'id','web_id','name','date_created','email_type_option','use_awesomebar','member_count','stats'
        ]
        ,autoHeight: true
        ,paging: true
        ,remoteSort: true
        ,columns: [/*{
            header: _('id')
            ,dataIndex: 'id'
            ,width: 70
            ,editor: { xtype: 'field' }
        },{
            header: 'web_id'
            ,dataIndex: 'web_id'
            ,width: 100
            //,sortable: true
        },*/{
            header: _('chimpx.list_name')
            ,dataIndex: 'name'
            ,width: 250
        }/*,{
            header: 'email_type_option'
            ,dataIndex: 'email_type_option'
            ,width: 50
        },{
            header: 'use_awesomebar'
            ,dataIndex: 'use_awesomebar'
            ,width: 50
        },{
            header: 'stats'
            ,dataIndex: 'stats'
            ,width: 50
        }*/,{
            header: _('chimpx.list_member_count')
            ,dataIndex: 'member_count'
            ,width: 50
        },{
            header: _('chimpx.list_date_created')
            ,dataIndex: 'date_created'
            ,width: 100
        }]
        /*,tbar: [{
            text: _('chimpx.item_create')
            ,handler: this.createList
            ,scope: this
        }]*/
    });
    chimpx.grid.Lists.superclass.constructor.call(this,config);
};

// grid menus + functions
Ext.extend(chimpx.grid.Lists,MODx.grid.Grid,{
    windows: {}
/*
    ,getMenu: function() {
        var m = [];
        m.push({
            text: _('chimpx.item_update')
            ,handler: this.updateList
        });
        m.push('-');
        m.push({
            text: _('chimpx.item_remove')
            ,handler: this.removeList
        });
        this.addContextMenuItem(m);
    }
    
    ,createList: function(btn,e) {
        if (!this.windows.createList) {
            this.windows.createList = MODx.load({
                xtype: 'chimpx-window-list-create'
                ,listeners: {
                    'success': {fn:function() { this.refresh(); },scope:this}
                }
            });
        }
        this.windows.createList.fp.getForm().reset();
        this.windows.createList.show(e.target);
    }
    ,updateList: function(btn,e) {
        if (!this.menu.record || !this.menu.record.id) return false;
        var r = this.menu.record;

        if (!this.windows.updateList) {
            this.windows.updateList = MODx.load({
                xtype: 'chimpx-window-list-update'
                ,record: r
                ,listeners: {
                    'success': {fn:function() { this.refresh(); },scope:this}
                }
            });
        }
        this.windows.updateList.fp.getForm().reset();
        this.windows.updateList.fp.getForm().setValues(r);
        this.windows.updateList.show(e.target);
    }
    
    ,removeList: function(btn,e) {
        if (!this.menu.record) return false;
        
        MODx.msg.confirm({
            title: _('chimpx.item_remove')
            ,text: _('chimpx.item_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/list/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:function(r) { this.refresh(); },scope:this}
            }
        });
    }
*/
});
Ext.reg('chimpx-grid-lists',chimpx.grid.Lists);



/*
chimpx.window.CreateList = function(config) {
    config = config || {};
    this.ident = config.ident || 'meclist'+Ext.id();
    Ext.applyIf(config,{
        title: _('chimpx.item_create')
        ,id: this.ident
        ,height: 150
        ,width: 475
        ,url: chimpx.config.connector_url
        ,action: 'mgr/list/create'
        ,fields: [{
            xtype: 'textfield'
            ,fieldLabel: _('name')
            ,name: 'name'
            ,id: 'chimpx-'+this.ident+'-name'
            ,width: 300
        },{
            xtype: 'textarea'
            ,fieldLabel: _('description')
            ,name: 'description'
            ,id: 'chimpx-'+this.ident+'-description'
            ,width: 300
        }]
    });
    chimpx.window.CreateList.superclass.constructor.call(this,config);
};
Ext.extend(chimpx.window.CreateList,MODx.Window);
Ext.reg('chimpx-window-list-create',chimpx.window.CreateList);
*/

/*
chimpx.window.UpdateList = function(config) {
    config = config || {};
    this.ident = config.ident || 'meulist'+Ext.id();
    Ext.applyIf(config,{
        title: _('chimpx.item_update')
        ,id: this.ident
        ,height: 150
        ,width: 475
        ,url: chimpx.config.connector_url
        ,action: 'mgr/list/update'
        ,fields: [{
            fieldLabel: 'id'
            ,name: 'id'
            ,id: 'chimpx-'+this.ident+'-id'
            //,dataIndex: 'id'
        },{
            fieldLabel: 'phoque bibi'
            ,name: 'title'
            ,id: 'chimpx-'+this.ident+'-title'
            ,width: 300
            ,dataIndex: 'title'
        },{
            fieldLabel: _('name')
            ,name: 'from_name'
            ,id: 'chimpx-'+this.ident+'-name'
            ,width: 300
            ,dataIndex: 'from_name'
        },{
            fieldLabel: _('description')
            ,name: 'description'
            ,id: 'chimpx-'+this.ident+'-description'
            ,width: 300
        }]
    });
    chimpx.window.UpdateList.superclass.constructor.call(this,config);
};
Ext.extend(chimpx.window.UpdateList,MODx.Window);
Ext.reg('chimpx-window-list-update',chimpx.window.UpdateList);
*/