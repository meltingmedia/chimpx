/*Ext.onReady(function() {
    MODx.load({ xtype: 'chimpx-page-campaign'});
});*/

/**
 * @class chimpx.page.Campaign
 * @extends MODx.Component
 * @param config
 * @xtype chimpx-page-campaign
 */
chimpx.page.Campaign = function(config) {
    config = config || {record: {}};
    config.record = config.record || {};

    Ext.applyIf(config, {
        components: [{
            xtype: 'chimpx-panel-campaign'
            ,renderTo: 'chimpx-panel-campaign-div'
            ,record: config.record
        }]
        ,buttons: [{
            text: 'Back'
            ,handler: function() {
                location.href = '?a='+ chimpx.action;
            }
        },'-',{
            text: _('chimpx_help')
            ,handler: this.mailchimpHelp
        }]
    }); 
    chimpx.page.Campaign.superclass.constructor.call(this, config);
};

Ext.extend(chimpx.page.Campaign, MODx.Component, {
    config: {}
    ,util:{}, window:{}, panel:{}, tree:{}, form:{}, grid:{}, combo:{}, toolbar:{}, page:{}, msg:{}

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
Ext.reg('chimpx-page-campaign', chimpx.page.Campaign);