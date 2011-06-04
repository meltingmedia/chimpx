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
            ,disabled: true
        },{
            text: _('chimpx.mailchimp_account')
            ,disabled: true
        },{
            text: _('chimpx_help')
            ,handler: this.mailchimpHelp
        }]
    }); 
    chimpx.page.Home.superclass.constructor.call(this,config);
};

Ext.extend(chimpx.page.Home,MODx.Component,{
    config: {}
    ,util:{},window:{},panel:{},tree:{},form:{},grid:{},combo:{},toolbar:{},page:{},msg:{}

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