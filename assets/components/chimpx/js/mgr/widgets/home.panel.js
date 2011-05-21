chimpx.panel.Home = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'chimpx-panel-home'
        ,bodyStyle: ''
        ,items: [{
            html: '<h2>'+_('chimpx')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
            ,id: 'modx-home-header'
        },MODx.getPageStructure([
        // campaign tab
        {
            title: _('chimpx.campaigns')
            ,bodyStyle: 'padding: 15px;'
            ,autoHeight: true
            ,items: [{
                html: '<p>'+_('chimpx.intro_msg')+'</p>'
                ,border: false
            },{
                xtype: 'chimpx-grid-campaigns'
                ,id: 'chimpx-grid-campaigns'
                ,preventRender: true
            }]
        }
        // list tab
        ,{
            title: _('chimpx.lists')
            ,bodyStyle: 'padding: 15px;'
            ,autoHeight: true
            ,items: [{
                html: '<p>'+_('chimpx.lists_intro_msg')+'</p>'
                ,border: false
            },{
                xtype: 'chimpx-grid-lists'
                ,id: 'chimpx-grid-lists'
                ,title: ''
                ,preventRender: true
            }]
        }])]
    });
    chimpx.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(chimpx.panel.Home,MODx.FormPanel);
Ext.reg('chimpx-panel-home',chimpx.panel.Home);