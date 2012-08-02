var yuiPublicPath = {
    getPath: function(yui, element) {
        var fileName = 'yui-settings';
        var path = '';

        if (yui) {
            fileName = '/yui/yui';
        }

        var scriptElement = document.getElementsByTagName('script');
        
        for (var offset = 0; offset < scriptElement.length; offset++) {
            if (scriptElement[offset].src.indexOf(fileName) > -1) {
                
                if (element != null) {
                    return scriptElement[offset];
                }
                
                path = scriptElement[offset].src.substring(
                    0,
                    scriptElement[offset].src.indexOf(fileName)
                );
                
                path = path.replace('http://', '');
                path = path.substr(path.indexOf('/'));
                
                return path;
            }
        }
        
        if (path == '') {
            alert('Error: Minify path could not be detected! (Expected filename: ' + fileName + ')');
        }
        
        return path;
    },
    
    getPathYui: function() {
        return yuiPublicPath.getPath(true).replace(yuiPublicPath.getPath(), '/');
    },
    
    getLocale: function() {
        var element = yuiPublicPath.getPath(false, true);
        var locale = element.src;
        
        locale = locale.substring(locale.indexOf('locale=') + 'locale='.length);
        
        return locale;
    }
}

YUI_config = {
    debug: false,
    combine: true,
    //comboBase: yuiPublicPath.getPath() + '/minify/?public=' + yuiPublicPath.getPath() + '&base=' + yuiPublicPath.getPathYui() + '/&f[]=',
    comboBase : yuiPublicPath.getPath() + 'minify/?b=docgen-standard/web/bundles/libbityui/yui3.6&f=',
    root: '',
    lang: yuiPublicPath.getLocale(),
    	filter : {
	'searchExp': '(^(?:[^&]+&[^&]+)|[^&]+)&', 
        'replaceStr': '$1,'
	},
        ////filter: {
	       // 'searchExp': "s&",
	        //'replaceStr': "s&f[]="
    //},
    
    groups: {
        yui2: {
            base: '',
            combine: true,
            comboBase: yuiPublicPath.getPath() + '/minify/?public=' + yuiPublicPath.getPath() + '&base=/yui2in3/&f[]=',
            root: '',
            patterns: {
                "yui2-": {
                    configFn: function(me) {
                        if(/-skin|reset|fonts|grids|base/.test(me.name)) {
                            me.type = 'css';
                            me.path = me.path.replace(/\.js/, '.css');
                        }
                    }
                }
            }
        },
        
        gallery: {
            base: '',
            combine: true,
            comboBase: yuiPublicPath.getPath() + '/minify/?public=' + yuiPublicPath.getPath() + '&base=/gallery/&f[]=',
            root: '',
            patterns: {
                "gallery-": {
                    configFn: function(me) {
                        if(/-skin/.test(me.name)) {
                            me.name = me.name.replace('-skin', '');
                            me.path = me.name + '/assets/' + me.name + '.js'
                            me.type = 'css';
                            me.path = me.path.replace(/\.js/, '.css');
                        } else {
                            me.path = me.name + '/js/' + me.name + '.js'
                        }
                    }
                }
            }
        }
    }
};

if (typeof(libbitYuiRequired) != 'undefined') {
    YUI(YUI_config).use(libbitYuiRequired, function(Y) {
        Y.on("domready", function() {
            document.Y = Y;
            
            libbitYuiInit(document.Y);
        });
    });
}
