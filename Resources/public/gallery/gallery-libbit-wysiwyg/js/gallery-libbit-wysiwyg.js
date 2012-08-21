YUI.add('gallery-libbit-wysiwyg', function(Y) {

    Y.LibbitWYSIWYG = {
        
        randomId: {},
        
        toolbar: [
            ['Bold', 'Italic', 'Underline', 'Strike', 'NumberedList', 'BulletedList', 'Link', 'Unlink'],
            ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', 'Undo', 'Redo'],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Source'],
            ['/'],
            ['Format', 'FontSize'],
            ['TextColor'],
        ],
        disabledButton: 'save',

        toolBars: function(set)
        {
            if (set == null) {
                return Y.LibbitWYSIWYG.toolbar;
            } else {
                Y.LibbitWYSIWYG.toolbar = set;
            }
        },

        embed: function(parentNode, wysiwygId) {
            var ckEditorUrl = '/gallery/gallery-libbit-wysiwyg/ckeditor/ckeditor.js';
            var headEl = Y.one('head');

            if (typeof(yuiPublicPath) != 'undefined') {
                var basePath = yuiPublicPath.getPath();
                var textEl = Y.Node.create('<textarea></textarea>');
                var scriptEl = document.createElement('script');
                var height = 0;
                                
                height = parseInt(parentNode.getStyle('height')) - 75;
                
                if (height <= 0) {
                    height = 400;
                }

                Y.LibbitWYSIWYG.randomId[wysiwygId] = (Math.random() * 9191919191);

                ckEditorUrl = basePath + ckEditorUrl;

                scriptEl.type = 'text/javascript';
                scriptEl.src = ckEditorUrl;
                scriptEl.id = 'ckEditorMutex';

                scriptEl.onload = scriptEl.onreadystatechange = function() {
                    if ((!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                        CKEDITOR.replace(
                            'ckT' + Y.LibbitWYSIWYG.randomId[wysiwygId],
                            {
                                skin: 'BootstrapCK-Skin',
                                height: height,
                                toolbar: Y.LibbitWYSIWYG.toolBars()
                            }
                        );
                    }
                };

                textEl
                    .setAttribute('id', 'ckT' + Y.LibbitWYSIWYG.randomId[wysiwygId])
                    .setAttribute('name', wysiwygId)
                    .setAttribute('style', 'display: none;')
                    .set('innerHTML', parentNode.get('innerHTML'));

                parentNode
                    .set('innerHTML', '')
                    .append(textEl)
                    .setAttribute('style', '');

                if (Y.one('#ckEditorMutex') == null) {
                    headEl.append(scriptEl);
                } else {
                    CKEDITOR.replace(
                        'ckT' + Y.LibbitWYSIWYG.randomId[wysiwygId],
                        {
                            skin: 'BootstrapCK-Skin',
                            height: height,
                            toolbar: Y.LibbitWYSIWYG.toolBars()
                        }
                    );
                }
            }

            return false;
        },
    
        getData: function(wysiwygId) {
            for (id in CKEDITOR.instances) {
                if (id == 'ckT' + Y.LibbitWYSIWYG.randomId[wysiwygId]) {
                    return CKEDITOR.instances[id].getData();
                }
            }
            
            return '';
        }
    }

}, '1.0', { requires: ['node'] });
