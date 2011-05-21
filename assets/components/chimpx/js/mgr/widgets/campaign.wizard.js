/**
 * Generates the Package Installer wizard.
 *
 * @class MODx.window.PackageInstaller
 * @extends MODx.Wizard
 * @param {Object} config An object of options.
 * @xtype modx-window-package-installer
 */
chimpx.window.CampaignWizard = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('package_installer')
        ,id: 'chimpx-window-campaign-wizard'
        ,resizable: true
        ,forceLayout: true
        ,autoHeight: true
        ,autoScroll: false
        ,stateful: false
        ,shadow: false
        ,width: '90%'
        ,anchor: '90%'
        ,hideMode: 'offsets'
        ,modal: Ext.isIE ? false : true
        ,firstPanel: 'chimpx-cw-step1'
        ,lastPanel: 'chimpx-cw-step5'
        ,items: [{
            xtype: 'chimpx-cw-step1'
        },{
            xtype: 'chimpx-cw-step5'
        }]
    });
    chimpx.window.CampaignWizard.superclass.constructor.call(this,config);
    //this.on('show',this.resetForms,this);
    //this.on('finish',this.resetForms,this);
};

Ext.extend(chimpx.window.CampaignWizard,MODx.Wizard,{
    resetForms: function() {
        var b = Ext.getCmp('chimpx-cw-step1');
        if (b) { b.setValue(''); }

        b = Ext.getCmp('chimpx-cw-step5');
        if (b) { b.setValue(''); }
/*
        var el = Ext.getCmp('modx-setup-options').getEl();
        if (el) { el.update(''); }
*/
    }
});
Ext.reg('chimpx-window-campaign-wizard',chimpx.window.CampaignWizard);

chimpx.panel.step1 = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'chimpx-cw-step1'
        ,back: 'chimpx-cw-step1'
        ,hideLabels: true
        ,defaults: { labelSeparator: '', border: false }
        ,items: [{
            html: '<h2>Step ouane</h2>'
            ,autoHeight: true
        },{
            html: '<p>blahblabh</p>'
            ,style: 'padding-bottom: 20px'
            ,autoHeight: true
        }/*,{
            xtype: 'chimpx-combo-listlists'
            ,fieldLabel: _('chimpx.campaign_list_select')
            ,name: 'list_select'
            ,width: 300
            ,listWidth: 350
        },{
            xtype: 'chimpx-combo-campaigntype'
            ,fieldLabel: _('chimpx.campaign_campaign_type')
            ,name: 'campaign_type'
            ,width: 300
            ,listWidth: 350
        },{
            xtype: 'textfield'
            ,fieldLabel: _('chimpx.campaign_subject')
            ,name: 'subject'
            ,id: 'chimpx-'+this.ident+'-subject'
            ,width: 300
            ,allowBlank: false
        },{
            xtype: 'textfield'
            ,fieldLabel: _('chimpx.campaign_title')
            ,name: 'title'
            ,id: 'chimpx-'+this.ident+'-title'
            ,width: 300
        },{
            xtype: 'textarea'
            ,name: 'license'
            ,id: 'modx-pi-license-box'
            ,width: '90%'
            ,height: 250
            ,value: ''
        },{
            boxLabel: _('license_agree')
            ,xtype: 'radio'
            ,inputValue: 'agree'
            ,name: 'agree'
        },{
            boxLabel: _('license_disagree')
            ,xtype: 'radio'
            ,inputValue: 'disagree'
            ,name: 'agree'
        }*/]
    });
    chimpx.panel.step1.superclass.constructor.call(this,config);
};

Ext.extend(chimpx.panel.step1,MODx.panel.WizardPanel,{
    submit: function() {
        var va = this.getForm().getValues();
        if (!va.agree) {

        } else if (va.agree === 'disagree') {
           Ext.getCmp('chimpx-window-campaign-wizard').hide();
        } else {
           Ext.getCmp('chimpx-window-campaign-wizard').fireEvent('proceed','chimpx-cw-step5');
        }
    }
/*
    ,fetch: function() {
        var sig = Ext.getCmp('modx-grid-package').menu.record.signature;
        MODx.Ajax.request({
            url: MODx.config.connectors_url+'workspace/packages.php'
            ,params: {
                action: 'getAttribute'
                ,signature: sig
                ,attributes: 'license'
            }
            ,listeners: {
                'success': {fn:function(r) {
                    var a = r.object['license'];
                    var b = Ext.getCmp('modx-pi-license-box');
                    if (a !== null && a !== 'null' && a !== '') {
                        b.setValue(a);
                    } else {
                        b.setValue('');
                        Ext.getCmp('modx-window-package-installer').fireEvent('proceed','modx-pi-readme');
                    }
                },scope:this}
            }
        });
    }*/
});
Ext.reg('chimpx-cw-step1',chimpx.panel.step1);

chimpx.panel.step5 = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'chimpx-cw-step5'
        ,back: 'chimpx-cw-step1'
        ,hideLabels: true
        ,defaults: { labelSeparator: '', border: false }
        ,items: [{
            html: '<h2>'+_('readme')+'</h2>'
            ,autoHeight: true
        },{
            html: '<p>'+_('readme_desc')+'</p>'
            ,style: 'padding-bottom: 20px'
            ,autoHeight: true
        }/*,{
            xtype: 'textarea'
            ,name: 'readme'
            ,id: 'modx-pi-readme-box'
            ,width: '90%'
            ,height: 200
            ,value: ''
        },{
            html: '<h2>'+_('changelog')+'</h2>'
            ,autoHeight: true
            ,id: 'modx-pi-changelog-header'
        },{
            html: '<p>'+_('changelog_desc')+'</p>'
            ,style: 'padding-bottom: 20px'
            ,autoHeight: true
            ,id: 'modx-pi-changelog-desc'
        },{
            xtype: 'textarea'
            ,name: 'changelog'
            ,id: 'modx-pi-changelog-box'
            ,width: '90%'
            ,height: 200
            ,value: ''
        }*/]
    });
    chimpx.panel.step5.superclass.constructor.call(this,config);
};

Ext.extend(chimpx.panel.step5,MODx.panel.WizardPanel,{
/*
    submit: function() {
        var va = this.getForm().getValues();
        Ext.getCmp('modx-window-package-installer').fireEvent('proceed','modx-pi-install');
    }
    ,fetch: function() {
        var sig = Ext.getCmp('modx-grid-package').menu.record.signature;
        MODx.Ajax.request({
            url: MODx.config.connectors_url+'workspace/packages.php'
            ,params: {
                action: 'getAttribute'
                ,signature: sig
                ,attributes: 'readme,changelog'
            }
            ,listeners: {
                'success': {fn:function(r) {
                    var a = r.object['readme'];
                    var proceed = true;

                    var b = Ext.getCmp('modx-pi-readme-box');
                    if (a !== null && a !== 'null' && a !== '') {
                        b.setValue(a);
                        proceed = false;
                    } else {
                        b.setValue('');
                    }

                    a = r.object['changelog'];
                    b = Ext.getCmp('modx-pi-changelog-box');
                    if (a !== null && a !== 'null' && a !== '') {
                        Ext.getCmp('modx-pi-changelog-box').show();
                        Ext.getCmp('modx-pi-changelog-header').show();
                        Ext.getCmp('modx-pi-changelog-desc').show();
                        Ext.getCmp('modx-window-package-installer').center();
                        b.setValue(a);
                        proceed = false;
                    } else {
                        b.setValue('');
                        Ext.getCmp('modx-pi-changelog-box').hide();
                        Ext.getCmp('modx-pi-changelog-header').hide();
                        Ext.getCmp('modx-pi-changelog-desc').hide();
                        Ext.getCmp('modx-window-package-installer').center();
                    }

                    if (proceed) {
                        Ext.getCmp('modx-window-package-installer').fireEvent('proceed','modx-pi-install');
                    }
                },scope:this}
            }
        });
    }
*/
});
Ext.reg('chimpx-cw-step5',chimpx.panel.step5);

/*
MODx.panel.PIInstall = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'modx-pi-install'
        ,back: 'modx-pi-readme'
        ,hideLabels: true
        ,defaults: { labelSeparator: '', border: false }
        ,bodyStyle: 'padding: 30px'
        ,items: [{
            html: '<h2>'+_('setup_options')+'</h2>'
            ,id: 'modx-setup-options-header'
        },{
            html: '<p>'+_('setup_options_desc')+'</p>'
            ,style: 'padding-bottom: 20px'
            ,id: 'modx-setup-options-desc'
        },{
            html: ''
            ,id: 'modx-setup-options'
        }]
    });
    MODx.panel.PIInstall.superclass.constructor.call(this,config);
};
Ext.extend(MODx.panel.PIInstall,MODx.panel.WizardPanel,{
    submit: function() {
        var va = this.getForm().getValues();
        var pi = Ext.getCmp('modx-window-package-installer');
        pi.fireEvent('finish',va);
    }
    ,fetch: function() {
        var sig = Ext.getCmp('modx-grid-package').menu.record.signature;
        MODx.Ajax.request({
            url: MODx.config.connectors_url+'workspace/packages.php'
            ,params: {
                action: 'getAttribute'
                ,signature: sig
                ,attributes: 'setup-options'
            }
            ,listeners: {
                'success': {fn:function(r) {
                    var a = r.object['setup-options'];
                    var el = Ext.getCmp('modx-setup-options').getEl();
                    if (a !== null && a !== 'null' && a !== '') {
                        el.update(a);
                    } else {
                        var va = this.getForm().getValues();
                        Ext.getCmp('modx-window-package-installer').fireEvent('finish',va);
                    }
                },scope:this}
            }
        });
    }
});
Ext.reg('modx-panel-pi-install',MODx.panel.PIInstall);
*/