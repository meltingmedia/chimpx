var chimpx = function(config) {
    config = config || {};
    chimpx.superclass.constructor.call(this,config);
};
Ext.extend(chimpx,Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},combo:{},config: {},view: {},ajax: {}
});
Ext.reg('chimpx',chimpx);

chimpx = new chimpx();