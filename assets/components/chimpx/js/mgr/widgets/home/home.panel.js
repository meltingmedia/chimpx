/**
 * @class chimpx.panel.Home
 * @extends MODx.FormPanel
 * @param config
 * @xtype chimpx-panel-home
 */
chimpx.panel.Home = function(config) {
    config = config || {};

    var tabs = [];
    tabs.push({
        title: _('chimpx.tab_campaigns')
        ,autoHeight: true
        ,items: [{
            html: _('chimpx.intro_msg')
            ,border: false
            ,bodyCssClass: 'panel-desc'
        },{
            xtype: 'chimpx-grid-campaigns'
            ,id: 'chimpx-grid-campaigns'
            ,preventRender: true
            ,cls: 'main-wrapper'
        }]
    });
    tabs.push({
        title: _('chimpx.tab_lists')
        ,autoHeight: true
        ,items: [{
            html: _('chimpx.lists_intro_msg')
            ,border: false
            ,bodyCssClass: 'panel-desc'
        },{
            xtype: 'chimpx-grid-lists'
            ,id: 'chimpx-grid-lists'
            ,preventRender: true
            ,cls: 'main-wrapper'
        }]
    });

    Ext.applyIf(config, {
        id: 'chimpx-panel-home'
        ,bodyStyle: ''
        ,cls: 'container'
        ,items: [{
            html: '<h2>'+ _('chimpx') +'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
            ,id: 'modx-home-header'
        },MODx.getPageStructure(tabs)]
    });
    chimpx.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(chimpx.panel.Home, MODx.FormPanel);
Ext.reg('chimpx-panel-home', chimpx.panel.Home);