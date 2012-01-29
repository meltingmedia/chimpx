Ext.onReady(function() {
    MODx.load({ xtype: 'chimpx-page-home'});
});

/**
 * @class chimpx.page.Home
 * @extends MODx.Component
 * @param config
 * @xtype chimpx-page-home
 */
chimpx.page.Home = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        components: [{
            xtype: 'chimpx-panel-home'
            ,renderTo: 'chimpx-panel-home-div'
        }]
        ,buttons: [{
            text: _('chimpx.check_mailchimp_status')
            ,handler: this.checkStatus
        },{
            text: _('chimpx.mailchimp_account')
            ,handler: function() {
                location.href = '?a='+ chimpx.action + '&action=account';
            }
        },{
            text: _('chimpx_help')
            ,handler: this.mailchimpHelp
        }]
    }); 
    chimpx.page.Home.superclass.constructor.call(this, config);
};

Ext.extend(chimpx.page.Home, MODx.Component, {
    config: {}
    ,util:{}, window:{}, panel:{}, tree:{}, form:{}, grid:{}, combo:{}, toolbar:{}, page:{}, msg:{}
    // Loads MailChimp Knowledge Base
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
    // Checks MailChimp status
    ,checkStatus: function() {
        MODx.Ajax.request({
            url: chimpx.config.connectorUrl
            ,params: {
                action: 'mgr/helpers/ping'
            }
            ,listeners: {
                success: {
                    fn: function(r) {
                        MODx.msg.alert(_('chimpx.ping_ok_title'), r.message);
                    }
                    ,scope: this
                }
                ,failure: {
                    fn: function(r) {
                        MODx.msg.alert(_('chimpx.ping_error_title'), r.message);
                    }
                    ,scope: this
                }
            }
        });
    }
});
Ext.reg('chimpx-page-home', chimpx.page.Home);