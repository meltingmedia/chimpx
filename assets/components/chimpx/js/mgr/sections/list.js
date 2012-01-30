/**
 * @class chimpx.page.List
 * @extends MODx.Component
 * @param config
 * @xtype chimpx-page-list
 */
chimpx.page.List = function(config) {
    config = config || {record: {}};
    config.record = config.record || {};

    Ext.applyIf(config, {
        components: [{
            xtype: 'chimpx-panel-list'
            ,renderTo: 'chimpx-panel-list-div'
            ,record: config.record
        }]
        ,buttons: [{
            text: 'Back'
            ,handler: function() {
                location.href = '?a='+ chimpx.action;
            }
        }]
    }); 
    chimpx.page.List.superclass.constructor.call(this, config);
};

Ext.extend(chimpx.page.List, MODx.Component);
Ext.reg('chimpx-page-list', chimpx.page.List);