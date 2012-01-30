/**
 * @class chimpx.grid.MergeVars
 * @extends MODx.grid.Grid
 * @param config
 * @xtype chimpx-grid-list-mergevars
 */
chimpx.grid.MergeVars = function(config) {
    config = config || {};
    /*this.exp = new Ext.grid.RowExpander({
        tpl : new Ext.Template(
            '<div class="desc">{helptext}</div>'
        )
    });*/

    Ext.applyIf(config, {
        id: 'chimpx-grid-list-mergevars'
        ,url: chimpx.config.connector_url
        ,baseParams: {
            action: 'mgr/list/getmergevars'
            ,list: config.list
        }
        ,plugins: this.exp
        ,fields: ['name', 'req', 'required', 'field_type', 'public', 'show', 'order', 'default', 'size', 'tag', 'choices', 'helptext']
        ,autoHeight: true
        //,paging: true
        ,remoteSort: true
        ,columns: [/*this.exp, */{
            header: 'Name'
            ,dataIndex: 'name'
        },{
            header: 'Tag'
            ,dataIndex: 'tag'
        },{
            header: 'Required'
            ,dataIndex: 'required'
        }]
        ,tbar: [{
            text: _('chimpx.mergevar_create')
            ,handler: this.createCampaign
            ,scope: this
            ,disabled: true
        }]
    });
    chimpx.grid.MergeVars.superclass.constructor.call(this, config);
};

// grid menus + functions
Ext.extend(chimpx.grid.MergeVars, MODx.grid.Grid,{
    windows: {}

    /*,getMenu: function() {
        var m = [];
        if (this.menu.record.status == _('chimpx.campaign_status_save')) {
            m.push({
                text: _('chimpx.campaign_update')
                ,handler: function() {
                    location.href = '?a='+ chimpx.action +'&action=campaign&id='+ this.menu.record.id;
                }
            });
            m.push('-');
            m.push({
                text: _('chimpx.campaign_send_test')
                ,handler: this.sendTest
            });
            m.push({
                text: _('chimpx.campaign_send')
                ,handler: this.sendCampaign
            });
            m.push('-');
        }
        this.addContextMenuItem(m);
    }

    ,createCampaign: function(btn,e) {
        if (!this.windows.createCampaign) {
            this.windows.createCampaign = MODx.load({
                xtype: 'chimpx-window-campaign-create'
                ,listeners: {
                    'success': {fn:function() {
                        this.refresh();
                    },scope:this}
                    ,'failure': {fn:function() {
                        MODx.msg.alert();
                    },scope:this}
                }
            });
        }
        this.windows.createCampaign.fp.getForm().reset();
        this.windows.createCampaign.show(e.target);
    }

    ,updateCampaign: function(btn,e) {
        if (!this.menu.record || !this.menu.record.id) return false;
        var r = this.menu.record;

        if (!this.windows.updateCampaign) {
            this.windows.updateCampaign = MODx.load({
                xtype: 'chimpx-window-campaign-update'
                ,record: r
                ,listeners: {
                    'success': {fn:function() {
                        this.refresh();
                    },scope:this}
                }
            });
        }
        this.windows.updateCampaign.fp.getForm().reset();
        this.windows.updateCampaign.fp.getForm().setValues(r);
        this.windows.updateCampaign.show(e.target);
    }

    ,removeCampaign: function(btn,e) {
        if (!this.menu.record) return false;
        
        MODx.msg.confirm({
            title: _('chimpx.campaign_remove')
            ,text: _('chimpx.campaign_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/campaign/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn: function(r) {
                    this.refresh();
                },scope:this}
                ,'failure': {fn: function(r) {
                    MODx.msg.alert();
                },scope:this}
            }
        });
    }*/
});
Ext.reg('chimpx-grid-list-mergevars', chimpx.grid.MergeVars);