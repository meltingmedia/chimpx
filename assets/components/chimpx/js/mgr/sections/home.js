Ext.onReady(function() {
    MODx.load({ xtype: 'chimpx-page-home'});
});

chimpx.page.Home = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        components: [{
            xtype: 'chimpx-panel-home'
            ,renderTo: 'chimpx-panel-home-div'
        }]
        ,buttons: [{
            text: _('chimpx.check_mailchimp_status')
            ,handler: this.checkStatus
            //,scope: this
            ,disabled: true
        },{
            text: _('chimpx.mailchimp_account')
            ,handler: function() {
                alert('Your mailchimp account infos!')
            }
            //,enableToggle: true
            ,disabled: true
        },{
            text: _('chimpx_help')
            ,handler: this.mailchimpHelp
            //,disabled: true
        }]
    }); 
    chimpx.page.Home.superclass.constructor.call(this,config);
};
//Ext.extend(chimpx.page.Home,MODx.Component);
//Ext.reg('chimpx-page-home',chimpx.page.Home);

Ext.extend(chimpx.page.Home,MODx.Component,{
    config: {}
    ,util:{},window:{},panel:{},tree:{},form:{},grid:{},combo:{},toolbar:{},page:{},msg:{}

    /*,checkStatus: function(btn,e) {
        if (!this.windows.checkStatus) {
            this.windows.checkStatus = MODx.load({
                xtype: 'chimpx-window-check-status'
                ,listeners: {
                    'success': {fn:function() { this.refresh(); },scope:this}
                }
            });
        }
        //this.windows.createCampaign.fp.getForm().reset();
        this.windows.checkStatus.show(e.target);
    }*/
    ,checkStatus: function(config) {
        config = config || {};
        //if (this.fireEvent('beforeReleaseLocks')) {
            MODx.Ajax.request({
                //url: this.config.connectors_url+'mgr/helper/ping.php'
                url: chimpx.config.connector_url
                //url: 'http://dev.lepimentbleu.fr/chimpx/core/components/chimpx/processors/mgr/helper/ping.php'
                ,baseParams: {
                    action: 'mgr/helper/ping'
                }
                //,waitMsg: 'please wait'
                //,success: function() { msg('Success', 'all good') }
                //,failure: function() { msg('Uhoh', 'Huston, we got a problem!') }
                /*,listeners: {
                    'success':{fn:function(r) { this.fireEvent('afterReleaseLocks',r); },scope:this}
                }*/
            });
        //}
    }

    ,mailchimpHelp: function(b) {
        var url = 'http://kb.mailchimp.com';
        if (!url) { return false; }
        chimpx.helpWindow = new Ext.Window({
            title: 'MailChimp Knowledge Base'
            ,width: 850
            ,height: 500
            ,modal: Ext.isIE ? false : true
            ,layout: 'fit'
            ,html: '<iframe src="' + url + '" width="100%" height="100%" frameborder="0"></iframe>'
        });
        chimpx.helpWindow.show(b);
        return true;
    }
});
Ext.reg('chimpx-page-home',chimpx.page.Home);



// check status window
/*
chimpx.window.checkStatus = function(config) {
    config = config || {};
    this.ident = config.ident || 'cxcheckstatus'+Ext.id();
    Ext.applyIf(config,{
        title: 'Is MailChimp 100% functionnal ?'
        ,id: this.ident
        ,height: 150
        ,width: 475
        ,url: chimpx.config.connector_url
        ,action: 'mgr/helper/ping'
        ,html: '<span style="margin-left: 20px">i\'m just a test</span>'
    });
    chimpx.window.checkStatus.superclass.constructor.call(this,config);
};
Ext.extend(chimpx.window.checkStatus,MODx.Window);
Ext.reg('chimpx-window-check-status',chimpx.window.checkStatus);
*/
/*
chimpx.ajax.checkStatus = function(config) {
    config = config || {};
    this.ident = config.ident || 'cxcheckstatus'+Ext.id();
    Ext.applyIf(config,{
        title: 'Is MailChimp 100% functionnal ?'
        ,id: this.ident
        ,height: 150
        ,width: 475
        ,url: chimpx.config.connector_url
        ,action: 'mgr/helper/ping'
        ,html: '<span style="margin-left: 20px">i\'m just a test</span>'
    });
    chimpx.ajax.checkStatus.superclass.constructor.call(this,config);
};
Ext.extend(chimpx.window.checkStatus,MODx.Ajax);
Ext.reg('chimpx-window-check-status',chimpx.ajax.checkStatus);
*/