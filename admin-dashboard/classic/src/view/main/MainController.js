Ext.define('Admin.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'onRouteChange'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },

    lastView: null,

    setCurrentView: function(hashTag) {
        hashTag = (hashTag || '').toLowerCase();

        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationTreeList,
            store = navigationList.getStore(),
            node = store.findNode('routeId', hashTag) ||
                   store.findNode('viewType', hashTag),
            view = (node && node.get('viewType')) || ((hashTag=='login' || hashTag=='passwordreset') || 'page404'),
            lastView = me.lastView,
            existingItem = mainCard.child('component[routeId=' + hashTag + ']'),
            newView;

        if(view!='page404'){

            //Muestras Login
           if(window.localStorage.getItem('logIn')!=1){
               if(hashTag=='login' || hashTag=='passwordreset'){
                    view=hashTag;
               }else{
                    hashTag='login';
                    view=hashTag;
                    node=null;                    
               }    
           }else{
                /*Si ya está logueado y se desea resetear el password*/
              if(hashTag=='passwordreset'){  
                  view=hashTag;
               }else{
                 hashTag=Admin.getApplication()._defaultToken;
               }
           } 
       }       
        // Kill any previously routed window
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = mainLayout.getActiveItem();
        if (!existingItem && view!=true) {
            newView = Ext.create({
                xtype: view,
                routeId: hashTag,  // for existingItem search later
                hideMode: 'offsets'
            });
        }
        if(node!=null){

            if (!newView || !newView.isWindow) {
                // !newView means we have an existing view, but if the newView isWindow
                // we don't add it to the card layout.
                if (existingItem) {
                    // We don't have a newView, so activate the existing view.
                    if (existingItem !== lastView) {
                        mainLayout.setActiveItem(existingItem);
                    }
                    newView = existingItem;
                }
                else {
                    // newView is set (did not exist already), so add it and make it the
                    // activeItem.
                    Ext.suspendLayouts();
                    mainLayout.setActiveItem(mainCard.add(newView));
                    Ext.resumeLayouts(true);
                }
            }
           
            navigationList.setSelection(node);
            

            if (newView.isFocusable(true)) {
                newView.focus();
            }
        }else{
           this.redirectTo(hashTag); 
        }

        me.lastView = newView;
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));

        if (to) {
            this.redirectTo(to);
        }
    },

    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 250;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.senchaLogo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);
            }

            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({dynamic: true, to: {width: new_width}});

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({isRoot: true});
            navigationList.el.addCls('nav-tree-animating');

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                        navigationList.el.removeCls('nav-tree-animating');
                    },
                    single: true
                });
            }
        }
    },

    onMainViewRender:function() {
        Ext.fly("appLoadingIndicator").destroy();
        if (!window.location.hash) {
            console.log('Loaded!');

            /*if(window.localStorage.getItem('logIn')!=1){
             //Muestras Login
               this.redirectTo("login");
           }
            else{
                this.redirectTo("cargarcsv");   
                //Ext.getBody().unmask();           
            }*/
           
        }

    },

    onRouteChange:function(id){
        this.setCurrentView(id);
    },

    onSearchRouteChange: function () {
        this.setCurrentView('searchresults');
    },

    onSwitchToModern: function () {
        Ext.Msg.confirm('Switch to Modern', 'Are you sure you want to switch toolkits?',
                        this.onSwitchToModernConfirmed, this);
    },

    onSwitchToModernConfirmed: function (choice) {
        if (choice === 'yes') {
            var s = location.search;

            // Strip "?classic" or "&classic" with optionally more "&foo" tokens
            // following and ensure we don't start with "?".
            s = s.replace(/(^\?|&)classic($|&)/, '').replace(/^\?/, '');

            // Add "?modern&" before the remaining tokens and strip & if there are
            // none.
            location.search = ('?modern&' + s).replace(/&$/, '');
        }
    },

    onEmailRouteChange: function () {
        this.setCurrentView('email');
    },
    onClickUser:function(self,el){
        var mainCardPanel=this.lookupReference('mainCardPanel'),
        usuarioview=mainCardPanel.down("usuarioview"),
        gridUsuarios=usuarioview.down("grid");

        Ext.create('Ext.menu.Menu', {
            width: 200,
            margin: '10px 10px 10px 0px',
            cls:'x-menu',
            padding:'0',
            bodyStyle:'border-radius:7px;',
            frame:false,
            plain:true,
            defaults:{
                pakcage:'center',
                cls:'item-menu',
                xtype:'menuitem'
            },
            items: [
            /*{
                text: 'Mi Perfil',
                iconCls:'fa fa-user',
                selector:el,
                handler:'onProfile'
            },*/
            Ext.create('Admin.view.profile.Social',{
                autoScroll:true
            }),
            {
                text: 'Cambiar Contraseña',
                iconCls:'fa fa-key',
                handler:'onChangePass'
            },{
                text: 'Salir',
                iconCls:'fa fa-sign-out',
                handler:'onLogout'
            }]
        }).showBy(Ext.get(el),'c-bl',[-40,140]);
    },
    onLogout:function(self){
        var me=this;
        Ext.Msg.confirm('Cerrar Sesión?', 'Desea cerrar la sesión?', function(buttonId, text, v) {
            if(buttonId == 'yes') {
                Ext.Ajax.request({
                    scope: this,
                    url: constants.URL_LOGOUT_APP,
                    success: function(response) {
                        var responseObject = Ext.decode(response.responseText);
                        localStorage.clear();
                        me.redirectTo('login', true);      
                    },
                    failure: function(response) {
                        Ext.Msg.show({
                            title: 'Error',
                            msg: 'Error al procesar la petición.',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                    }
                });
            }
        }, this);
    },
    onChangePass:function(self){
        var me=this;
        me.redirectTo('passwordreset',true);
         // Ext.create('Admin.view.authentication.PasswordReset').show();
        /*Ext.create('Ext.window.Window', {
            title: 'Cambiar Contraseña',
            height: 200,
            width: 400,
            layout: 'fit',
            modal: true,
            constrainHeader: true,
            resizable: false,
            items: [
                Ext.create('Admin.view.authentication.PasswordReset')
            ]
        }).show();*/
    },
    onProfile:function(self){

        Ext.create('Ext.menu.Menu', {
            width: 250,
            margin: '10px 10px 10px 0px',
            cls:'x-menu',
            padding:'0',
            bodyStyle:'border-radius:7px;',
            frame:false,
            plain:true,
            defaults:{
                pakcage:'center',
                cls:'item-menu',
                xtype:'menuitem'
            },
            items: [
                Ext.create('Admin.view.profile.Social',{
                    autoScroll:true
                }) 
            ]
        }).showBy(Ext.get(self.selector),'c-bl',[-70,0]);
    },
    onViewPerfil:function(self){
        var mainCardPanel=this.lookupReference('mainCardPanel'),
        usuarioview=mainCardPanel.down("usuarioview"),
        grid=usuarioview.down("grid");

        Ext.create('Ext.window.Window', {
            title: 'Editar Perfil',
            width: 550,
            layout: 'fit',
            modal: true,
            constrainHeader: true,
            resizable: false,
            items: [
                Ext.create('Admin.view.usuario.Perfil',{
                    grid:grid
                })
            ]
        }).show();
    },
    onRender:function(self){
        var record=JSON.parse(localStorage.getItem('usuario')),
        Perfil=Ext.create('Admin.model.usuario.Perfil',record);
        self.loadRecord(Perfil);
    },
    onGuardar:function(self){
        var form=self.up("form");
        var mainCardPanel=this.lookupReference('mainCardPanel'),
        usuarioview=mainCardPanel.down("usuarioview"),
        gridUsuarios=usuarioview.down("grid");

        form.getForm().submit({
            scope: this, 
            submitEmptyText: false,
            url: constants.URL_ACTUALIZAR_PERFIL,
            success: function(f, action) {
                var usuario = action.result.usuario;
                window.localStorage.setItem('usuario', JSON.stringify(usuario));
                this.getViewModel().set('nombre',Ext.String.ellipsis(usuario.nombres+' '+usuario.apellidos,20));
                this.getViewModel().set('imagen',usuario.imagen);
                
                form.grid.getStore().reload();
                self.up("window").close();
            },
            failure: function(f, action) {
                var result = action.result;
                Ext.Msg.show({
                    title: 'Error',
                    msg: result.msg,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR                    
                });
            }
        });
    }
});
