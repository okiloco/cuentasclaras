Ext.define('Admin.view.cargarcsv.cargarcsvview', {
    extend: 'Ext.panel.Panel',
    bodyPadding : 10,
    cls: 'share-panel',
    xtype: 'cargarcsvview',
    cls: 'shadow',
    activeTab: 0,
    margin: 20,
    layout:'fit',
    controller: 'cargarcsv',
    /*viewModel: {
        type: 'dashboard'
    },*/

    listeners: {
        hide: 'onHideView'
    },

    items: [
        {
            xtype:'grilla',
            columns:[
                {
                    text:'H1',
                    dataIndex:'h1'
                }
            ],
            store:{
                xtype:'uxstore',
                data:[
                    {
                        h1:'HOla'
                    },
                    {
                        h1:'HOla'
                    }
                ]
            }
        }
    ],
    dockedItems:[
        {
            xtype:'toolbar',
            items:[
                {
                    xtype:'searchbutton',
                    emptyText:'Buscar',
                    listeners:{

                    }
                },
                {
                    xtype:'listBox',
                    emptyText:'Saluda',
                    displayField:'text',
                    valueField:'value',
                    store:{
                        xtype:'uxstore',
                        fields: ['text', 'value'],
                        data:[
                            {
                                text:'Hi',
                                value:'1'
                            },
                            {
                                text:'HOla',
                                value:'2'
                            }
                        ]
                    }
                }
            ]
        }
    ]
});
