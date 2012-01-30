/**
 * @class chimpx.page.Subscriber
 * @extends MODx.Component
 * @param config
 * @xtype chimpx-page-subscriber
 */
chimpx.page.Subscriber = function(config) {
    config = config || {record: {}};
    config.record = config.record || {};

    Ext.applyIf(config, {
        components: [{
            xtype: 'chimpx-panel-subscriber'
            ,renderTo: 'chimpx-panel-subscriber-div'
            ,record: config.record
        }]
        ,buttons: [{
            text: 'Back'
            ,handler: function() {
                location.href = '?a='+ chimpx.action;
            }
        }]
    }); 
    chimpx.page.Subscriber.superclass.constructor.call(this, config);
};

Ext.extend(chimpx.page.Subscriber, MODx.Component);
Ext.reg('chimpx-page-subscriber', chimpx.page.Subscriber);