
chimpx.grid.Items = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'chimpx-grid-items'
        ,url: chimpx.config.connector_url
        ,baseParams: {
            action: 'mgr/campaign/getlist'
        }
        ,fields: ['id','title','subject','send_time','status','emails_sent']
        ,autoHeight: true
        ,paging: true
        ,remoteSort: true
        ,columns: [{
            header: _('id')
            ,dataIndex: 'id'
            ,width: 70
        },{
            header: 'Campaign name'
            ,dataIndex: 'title'
            ,width: 100
            //,sortable: true
        },{
            header: 'Email subject'
            ,dataIndex: 'subject'
            ,width: 250
        },{
            header: 'Sent on'
            ,dataIndex: 'send_time'
            ,width: 100
        },{
            header: 'Status'
            ,dataIndex: 'status'
            ,width: 50
        },{
            header: 'Recipients'
            ,dataIndex: 'emails_sent'
            ,width: 50
        }]
        ,tbar: [{
            text: _('chimpx.campaign_create')
            ,handler: this.createItem
            ,scope: this
        }]
    });
    chimpx.grid.Items.superclass.constructor.call(this,config);
};
Ext.extend(chimpx.grid.Items,MODx.grid.Grid,{
    windows: {}

    ,getMenu: function() {
        var m = [];
        m.push({
            text: _('chimpx.campaign_update')
            ,handler: this.updateItem
        });
        m.push('-');
        m.push({
            text: _('chimpx.campaign_remove')
            ,handler: this.removeItem
        });
        this.addContextMenuItem(m);
    }
    
    ,createItem: function(btn,e) {
        if (!this.windows.createItem) {
            this.windows.createItem = MODx.load({
                xtype: 'chimpx-window-item-create'
                ,listeners: {
                    'success': {fn:function() { this.refresh(); },scope:this}
                }
            });
        }
        this.windows.createItem.fp.getForm().reset();
        this.windows.createItem.show(e.target);
    }
    ,updateItem: function(btn,e) {
        if (!this.menu.record || !this.menu.record.id) return false;
        var r = this.menu.record;

        if (!this.windows.updateItem) {
            this.windows.updateItem = MODx.load({
                xtype: 'chimpx-window-item-update'
                ,record: r
                ,listeners: {
                    'success': {fn:function() { this.refresh(); },scope:this}
                }
            });
        }
        this.windows.updateItem.fp.getForm().reset();
        this.windows.updateItem.fp.getForm().setValues(r);
        this.windows.updateItem.show(e.target);
    }
    
    ,removeItem: function(btn,e) {
        if (!this.menu.record) return false;
        
        MODx.msg.confirm({
            title: _('chimpx.item_remove')
            ,text: _('chimpx.item_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/item/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:function(r) { this.refresh(); },scope:this}
            }
        });
    }
});
Ext.reg('chimpx-grid-items',chimpx.grid.Items);




chimpx.window.CreateItem = function(config) {
    config = config || {};
    this.ident = config.ident || 'mecitem'+Ext.id();
    Ext.applyIf(config,{
        title: _('chimpx.campaign_create')
        ,id: this.ident
        ,height: 150
        ,width: 475
        ,url: chimpx.config.connector_url
        ,action: 'mgr/item/create'
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
    chimpx.window.CreateItem.superclass.constructor.call(this,config);
};
Ext.extend(chimpx.window.CreateItem,MODx.Window);
Ext.reg('chimpx-window-item-create',chimpx.window.CreateItem);


chimpx.window.UpdateItem = function(config) {
    config = config || {};
    this.ident = config.ident || 'meuitem'+Ext.id();
    Ext.applyIf(config,{
        title: _('chimpx.item_update')
        ,id: this.ident
        ,height: 150
        ,width: 475
        ,url: chimpx.config.connector_url
        ,action: 'mgr/item/update'
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
            ,id: 'chimpx-'+this.ident+'-id'
        },{
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
    chimpx.window.UpdateItem.superclass.constructor.call(this,config);
};
Ext.extend(chimpx.window.UpdateItem,MODx.Window);
Ext.reg('chimpx-window-item-update',chimpx.window.UpdateItem);