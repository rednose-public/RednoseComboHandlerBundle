
var yuiPublicPath = {
    getPath: function(yui) {
        var fileName = 'yui-settings';
        var path = '';

        if (yui) {
            fileName = '/yui/yui'; 
        }        

        var scriptElement = document.getElementsByTagName('script');
        
        for (var offset = 0; offset < scriptElement.length; offset++) {
            if (scriptElement[offset].src.indexOf(fileName) > -1) {
                
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
    }
    
}

YUI_config = {
    debug: false,
    combine: true,
    comboBase: yuiPublicPath.getPath() + '/minify/?base=' + yuiPublicPath.getPathYui() + '/&f[]=',
    root: '',
    filter: { 
	        'searchExp': "s&",
	        'replaceStr': "s&f[]="
    },
    
    groups: {
        /*yui2: {
            base: '',
            combine: true,
            comboBase: 'bundles/libbityui/minify/?base=/js/vendor/yui2/&f[]=',
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
        },*/
        
        gallery: {
            base: '',
            combine: true,
            comboBase: yuiPublicPath.getPath() + '/minify/?base=/js/vendor/lib/&f[]=',
            root: '',
            patterns: {
                "gallery-": {
                    configFn: function(me) {
                        me.path = me.name + '/js/' + me.name + '.js'
                    }
                }
            }
        }
    }
};

if (typeof(libbitYuiRequired) != 'undefined') {
    YUI(YUI_config).use(libbitYuiRequired, function(Y) {
        Y.on("domready", function() {
            libbitYuiInit(Y);
        });
    });
}
