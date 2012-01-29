/*Ext.onReady(function() {
    MODx.load({ xtype: 'chimpx-page-account'});
});*/

/**
 * @class chimpx.page.Account
 * @extends MODx.Component
 * @param config
 * @xtype chimpx-page-account
 */
chimpx.page.Account = function(config) {
    config = config || {record: {}};
    config.record = config.record || {};
    config.contact = config.contact || {};
    config.modules = config.modules || {};
    config.orders = config.orders || {};
    config.rewards = config.rewards || {};

    Ext.applyIf(config, {
        components: [{
            xtype: 'chimpx-panel-account'
            ,renderTo: 'chimpx-panel-account-div'
            ,record: config.record
            ,contact: config.contact
            ,modules: config.modules
            ,orders: config.orders
            ,rewards: config.rewards
        }]
        ,buttons: [{
            text: 'Back'
            ,handler: function() {
                location.href = '?a='+ chimpx.action;
            }
        }]
    }); 
    chimpx.page.Account.superclass.constructor.call(this, config);
};

Ext.extend(chimpx.page.Account, MODx.Component);
Ext.reg('chimpx-page-account', chimpx.page.Account);