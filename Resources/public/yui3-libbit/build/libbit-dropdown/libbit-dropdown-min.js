YUI.add("libbit-dropdown",function(e,t){var n;n=e.Base.create("dropdown",e.Bootstrap.Dropdown,[],{initializer:function(){var t=this._node,n=this.config.content?this.config.content:"",r=this.config.dropup?"dropup":"dropdown";t.wrap('<div class="dropdown-wrapper '+r+'"></div>'),t.addClass("dropdown-toggle"),t.setAttribute("data-toggle","dropdown"),t.get("parentNode").append(e.Node.create(n)),t.get("parentNode").all("a").on("click",function(e){e.preventDefault(),t.dropdown.toggle()})}},{NS:"dropdown",ATTRS:{}}),e.namespace("Libbit").Dropdown=n},"1.0.0",{requires:["gallery-bootstrap-dropdown"]});