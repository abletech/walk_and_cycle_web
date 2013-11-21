!function(){define(["jquery","marionette","lib/jp_map","app/routers/default","app/collections/example_journeys","app/views/composites/example_list"],function(e,t,n,i,o,r){return window.App=new t.Application,App.addRegions({resultsRegion:e("#results"),examplesRegion:e("#examples"),journeyFields:e("#journey_form fieldset"),detailContent:e("#detail_content")}),App.addInitializer(function(){return e(window).resize(function(){var t;return t=e(window).height()-150,e(".left_sidebar").height(t),e(".right_body").css("height",t)}),e(window).trigger("resize")}),App.addInitializer(function(){return this.map=new n(document.getElementById("mapdiv")),null!=e.cookie("jp_overlay")?this.map.updateOverlay(e.cookie("jp_overlay")):void 0}),App.addInitializer(function(){var e=this;return this.all_examples=new o,this.all_examples.fetch({success:function(){return e.example_view=new r,e.examplesRegion.show(e.example_view)}})}),App.addInitializer(function(){var t=this;return this.toggleDetailsPanel=function(n,i){return null==n&&(n=!0),null==i&&(i=null),e(".right_body").toggleClass("expanded",n),n?e("#detail_toggle").html("<i class='icon-double-angle-down'></i> hide"):e("#detail_toggle").html("<i class='icon-double-angle-up'></i> expand"),google.maps.event.trigger(t.map,"resize")}}),App.addInitializer(function(){var t=this;return this.showResults=function(){var n,i,o;return e("#body-content .right_body").removeClass("examples"),t.toggleDetailsPanel(!0),null!=(n=t.example_view)&&n.collection.hideOverlays(),null!=(i=t.router)?null!=(o=i.journey)?o.showOverlays(t.map):void 0:void 0},this.showExamples=function(){var n,i,o;return e("#body-content .right_body").addClass("examples"),t.toggleDetailsPanel(!1),null!=(n=t.example_view)&&n.collection.showOverlays(t.map),null!=(i=t.router)?null!=(o=i.journey)?o.hideOverlays():void 0:void 0},e("a[href='#examples']").on("show",this.showExamples),e("a[href='#results']").on("show",this.showResults)}),App.addInitializer(function(){var t=this;return e("#overlay-options li a[data-overlay]").click(function(n){return t.map.updateOverlay(e(n.target).data("overlay")),e("#overlay-options").dropdown("toggle"),!1}),e("#maptype-options li a").click(function(n){return t.map.updateMaptype(e(n.target).data("maptype")),e("#maptype-options").dropdown("toggle"),!1})}),App.addInitializer(function(){var t=this;return e("#journey_form").submit(function(){var n;return n=unescape(e("#journey_form").serialize()),t.router.navigate("?"+n,{trigger:!0,replace:!0}),!1})}),App.addInitializer(function(){var t=this;return e("#region_id").change(function(){var n;return t.current_region=e("#region_id").val(),null!=(n=t.example_view)?n.resetData(!0):void 0})}),App.addInitializer(function(){var t=this;return e("#detail_toggle").click(function(){return t.toggleDetailsPanel(!e(".right_body").hasClass("expanded")),!1})}),App.addInitializer(function(){return e("#print-share").click(function(){return window.location="/print_journey"+location.search,!1}),e("#facebook-share").click(function(){return window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(location.href),"facebook-share-dialog","width=626,height=436"),!1}),e("#twitter-share").click(function(){return window.open("https://twitter.com/share?url="+encodeURIComponent(location.href)+"&via=greaterwgtn","twitter-share-dialog","width=626,height=436"),!1}),e("#googleplus-share").click(function(){return window.open("https://plus.google.com/share?url="+encodeURIComponent(location.href),"gplus-share-dialog","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=600,height=600"),!1})}),App.addInitializer(function(){return this.router=new i,this.on("initialize:after",function(){return Backbone.history?Backbone.history.start({pushState:!0,root:document.location.pathname,hashChange:!1}):void 0})})})}.call(this);