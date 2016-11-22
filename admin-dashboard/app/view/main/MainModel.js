/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Admin.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'Admin',
        username:JSON.parse(localStorage.getItem('usuario')).username.charAt(0).toUpperCase()+JSON.parse(localStorage.getItem('usuario')).username.slice(1),
        nombre:Ext.String.ellipsis(JSON.parse(localStorage.getItem('usuario')).nombres+' '+JSON.parse(localStorage.getItem('usuario')).apellidos,20),
        rol:JSON.parse(localStorage.getItem('usuario')).rol.toUpperCase(),
        imagen:(JSON.parse(localStorage.getItem('usuario')).imagen || 'resources/images/user-profile/2.png'),
        loremIpsum: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }

    //TODO - add data, formulas and/or methods to support your view
});
