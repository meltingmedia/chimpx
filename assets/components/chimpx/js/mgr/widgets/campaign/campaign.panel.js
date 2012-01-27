

chimpx.panel.Campaign = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        cls: 'main-wrapper'
        ,items: []
    });
    chimpx.panel.Campaign.superclass.constructor.call(this,config);
    this.on('render', this._init, this);
};
Ext.extend(chimpx.panel.Campaign, Ext.form.FormPanel, {
    _init: function() {
        console.log('test');
    }
});
Ext.reg('chimpx-panel-campaign', chimpx.panel.Campaign);