!function(){"use strict";window.JourneyPlanner={Models:{},Collections:{},Views:{},App:new Marionette.Application},JourneyPlanner.SPEEDS={walking:{slow:3,average:5,fast:6.5},cycling:{slow:10,average:20,fast:30}},JourneyPlanner.CAR_COST={walking:.7,cycling:.65},JourneyPlanner.HEALTH_COST={walking:3.53,cycling:1.77},JourneyPlanner.EFFORT={walking:{slow:.0471,average:.0761,fast:.0971},cycling:{slow:.069,average:.15,fast:.2401}},JourneyPlanner.App.addRegions({resultsRegion:$("#results"),examplesRegion:$("#examples"),journeyFields:$("#journey_form fieldset"),detailContent:$("#detail_content")}),JourneyPlanner.App.addInitializer(function(){return $(window).resize(function(){var t;return t=$(window).height()-150,$(".left_sidebar").height(t),$(".right_body").css("height",t)}),$(window).trigger("resize")}),JourneyPlanner.App.addInitializer(function(){return this.map=new JPMap(document.getElementById("mapdiv")),null!=$.cookie("jp_overlay")?this.map.updateOverlay($.cookie("jp_overlay")):void 0}),JourneyPlanner.App.addInitializer(function(){return this.walking_examples=new JourneyPlanner.Collections.ExampleJourneys,this.examplesRegion.show(new JourneyPlanner.Views.ExampleList({collection:this.walking_examples}))}),JourneyPlanner.App.addInitializer(function(){var t=this;return this.showResults=function(){var e,n;return t.walking_examples.hideOverlays(),null!=(e=t.router)?null!=(n=e.journey)?n.showOverlays(t.map):void 0:void 0},this.showExamples=function(){var e,n;return t.walking_examples.showOverlays(t.map),null!=(e=t.router)?null!=(n=e.journey)?n.hideOverlays():void 0:void 0},$("a[href='#examples']").on("show",this.showExamples),$("a[href='#results']").on("show",this.showResults)}),JourneyPlanner.App.addInitializer(function(){var t=this;return $("#overlay-options li a").click(function(e){return t.map.updateOverlay($(e.target).data("overlay")),$("#overlay-options").dropdown("toggle"),!1}),$("#maptype-options li a").click(function(e){return t.map.updateMaptype($(e.target).data("maptype")),$("#maptype-options").dropdown("toggle"),!1})}),JourneyPlanner.App.addInitializer(function(){var t=this;return $("#journey_form").submit(function(){var e;return e=unescape($("#journey_form").serialize()),t.router.navigate("?"+e,{trigger:!0,replace:!0}),!1})}),JourneyPlanner.App.addInitializer(function(){var t=this;return $("#detail_toggle").click(function(){return $(".right_body").hasClass("expanded")?($(".right_body").removeClass("expanded"),$("#detail_toggle").html("<i class='icon-double-angle-up'></i> expand")):($(".right_body").addClass("expanded"),$("#detail_toggle").html("<i class='icon-double-angle-down'></i> hide")),setTimeout(function(){return google.maps.event.trigger(t.map,"resize")},500),!1})}),JourneyPlanner.App.addInitializer(function(){return this.router=new JourneyPlanner.DefaultRouter,this.on("initialize:after",function(){return Backbone.history?Backbone.history.start({pushState:!0,root:document.location.pathname,hashChange:!1}):void 0})}),$(document).ready(function(){return JourneyPlanner.App.start(),setTimeout(function(){return window.scrollTo(0,1)},1e3)})}.call(this),function(){var t,e,n=function(t,e){return function(){return t.apply(e,arguments)}},o={}.hasOwnProperty,r=function(t,e){function n(){this.constructor=t}for(var r in e)o.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};JourneyPlanner.Models.PointOfInterest=function(e){function o(){return this.exit=n(this.exit,this),this.enter=n(this.enter,this),t=o.__super__.constructor.apply(this,arguments)}return r(o,e),o.prototype.sprite_coords={airport:[2,2],bike_shop:[26,2],bus_stop:[50,2],church:[74,2],council_building:[98,2],cycle_rake:[2,26],drinking_fountain:[26,26],hospital:[50,26],information:[74,26],landmark:[98,26],library:[2,50],museum:[26,50],park:[50,50],playground:[74,50],pool:[98,50],post_office:[2,74],rec_centre:[26,74],reserve:[50,74],school:[74,74],seat:[98,74],shopping_mall:[2,98],skatepark:[26,98],steps:[50,98],streetlight:[74,98],theatre:[98,98],toilet:[122,2],trafficlight:[122,26],zebracrossing:[122,50]},o.prototype.initialize=function(){return this.on("add",this.enter),this.on("remove",this.exit)},o.prototype.enter=function(){return this.marker().setMap(JourneyPlanner.App.map)},o.prototype.exit=function(){return this.marker().setMap(null)},o.prototype.marker=function(){return this._marker||(this._marker=new google.maps.Marker({position:this.latlng(),title:this.get("title"),icon:this.icon()}))},o.prototype.icon=function(){return{url:"img/poi_markers.png",anchor:new google.maps.Point(10,10),origin:function(t,e,n){n.prototype=t.prototype;var o=new n,r=t.apply(o,e);return Object(r)===r?r:o}(google.maps.Point,this.sprite_coords[this.get("poi_type")],function(){}),size:new google.maps.Size(20,20)}},o.prototype.latlng=function(){return this._latlng||(this._latlng=new google.maps.LatLng(this.get("y"),this.get("x")))},o.prototype.parse=function(t){return t.points_of_interest},o}(Backbone.Model),JourneyPlanner.Collections.PointsOfInterest=function(t){function o(){return this.updateMap=n(this.updateMap,this),e=o.__super__.constructor.apply(this,arguments)}return r(o,t),o.prototype.model=JourneyPlanner.Models.PointOfInterest,o.prototype.url=function(){return"http://staging.journeyplanner.org.nz/api/poi.json?callback=?&bounds="+this.bounds+"&zoom="+this.zoom},o.prototype.setMap=function(t){return null!=t?this.show():this.hide()},o.prototype.show=function(){return this.forEach(function(t){return t.enter()}),this.updateMap(),this.listener=google.maps.event.addListener(JourneyPlanner.App.map,"idle",this.updateMap)},o.prototype.updateMap=function(){var t;return t=JourneyPlanner.App.map,null!=t.getBounds()?(this.bounds=t.getBounds().toUrlValue(),this.zoom=t.getZoom(),this.fetch()):void 0},o.prototype.hide=function(){return this.listener&&google.maps.event.removeListener(this.listener),this.forEach(function(t){return t.exit()})},o}(Backbone.Collection)}.call(this),function(){var t,e,n=function(t,e){return function(){return t.apply(e,arguments)}},o={}.hasOwnProperty,r=function(t,e){function n(){this.constructor=t}for(var r in e)o.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};JourneyPlanner.Models.Waypoint=function(e){function o(){return this.updateWaypoint=n(this.updateWaypoint,this),t=o.__super__.constructor.apply(this,arguments)}return r(o,e),o.prototype.defaults=function(){return{a:"",x:"",y:""}},o.prototype.getMarker=function(){return null!=this._marker?this._marker:(this._marker=new google.maps.Marker({icon:this.iconStyle(),title:this.get("a"),position:this.getLatLng(),draggable:!0}),google.maps.event.addListener(this._marker,"dragend",this.updateWaypoint),this._marker)},o.prototype.index=function(){return this.collection.indexOf(this)},o.prototype.iconStyle=function(){switch(this.get("type")){case"start":return{url:"img/waypoint_markers/start.png",scaledSize:new google.maps.Size(52,27),anchor:new google.maps.Point(19,27)};case"via":return{url:"img/waypoint_markers/via.png",scaledSize:new google.maps.Size(40,27),anchor:new google.maps.Point(14,27)};case"end":return{url:"img/waypoint_markers/end.png",scaledSize:new google.maps.Size(41,27),anchor:new google.maps.Point(14,27)};default:return{}}},o.prototype.getLatLng=function(){return this._latlng||(this._latlng=new google.maps.LatLng(this.get("y"),this.get("x")))},o.prototype.streetName=function(){return this.get("a").split(",")[0]},o.prototype.queryStr=function(){return"waypoints["+this.index()+"][a]="+escape(this.get("a"))+"&waypoints["+this.index()+"][x]="+escape(this.get("x"))+"&waypoints["+this.index()+"][y]="+escape(this.get("y"))},o.prototype.validate=function(t){var e;return e=[],t.x||e.push("missing x coordinate"),t.y?void 0:e.push("missing y coordinate")},o.prototype.updateWaypoint=function(){var t,e=this;return t=this.getMarker().getPosition(),AddressService.ClosestAddress.find(t.lat(),t.lng(),function(t){return t?(e.set({a:t.a,x:t.x,y:t.y}),e.trigger("update_point")):void 0})},o}(Backbone.Model),JourneyPlanner.Collections.Waypoints=function(t){function n(){return e=n.__super__.constructor.apply(this,arguments)}return r(n,t),n.prototype.model=JourneyPlanner.Models.Waypoint,n}(Backbone.Collection)}.call(this),function(){var t,e,n={}.hasOwnProperty,o=function(t,e){function o(){this.constructor=t}for(var r in e)n.call(e,r)&&(t[r]=e[r]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t};JourneyPlanner.Models.Step=function(e){function n(){return t=n.__super__.constructor.apply(this,arguments)}return o(n,e),n.prototype.latlng=function(){return new google.maps.LatLng(this.get("y"),this.get("x"))},n}(Backbone.Model),JourneyPlanner.Collections.Steps=function(t){function n(){return e=n.__super__.constructor.apply(this,arguments)}return o(n,t),n.prototype.model=JourneyPlanner.Models.Step,n.prototype.bounding_box=function(){var t;return t=new google.maps.LatLngBounds,this.each(function(e){return t.extend(e.latlng())}),t},n}(Backbone.Collection)}.call(this),function(){var t,e={}.hasOwnProperty,n=function(t,n){function o(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return o.prototype=n.prototype,t.prototype=new o,t.__super__=n.prototype,t};JourneyPlanner.Models.Journey=function(e){function o(){return t=o.__super__.constructor.apply(this,arguments)}return n(o,e),o.prototype.defaults={mode:"walking",altitude_factor:1.13046330315024},o.prototype.initialize=function(){var t=this;return this.waypoints=new JourneyPlanner.Collections.Waypoints,this.waypoints.journey=this,this.steps=new JourneyPlanner.Collections.Steps,this.set("pace",$.cookie("jp_speed")||"average"),this.on("change",function(){return t.waypoints.reset(t.get("waypoints")),t.steps.reset(t.get("steps"))}),this.on("change:pace",function(){return $.cookie("jp_speed",t.get("pace"),{path:"/",expires:365})}),this.on("sync",function(){return t.get("encoded_polyline")&&t.updateMap(),$("a[href='#results']").show().tab("show")})},o.prototype.validate=function(t){var e,n;return e=[],this.get("example")||(_(["walking","cycling"]).indexOf(t.mode)>=0||e.push(""+t.mode+" is not a valid mode"),n=this.waypoints.filter(function(t){return t.isValid()}),n.length>1||e.push("you need a minimum of two waypoints")),e.length>0?e:void 0},o.prototype.url=function(){var t;return t="mode="+this.get("mode"),this.waypoints.each(function(e){return t+="&"+e.queryStr()}),"http://staging.journeyplanner.org.nz/api/route.json?callback=?&"+t},o.prototype.parse=function(t){return t.success&&t.total>0?t.journeys[0]:void 0},o.prototype.total_time=function(){return 60*(this.get("total_distance")/(1e3*this.currentSpeed()))},o.prototype.car_cost=function(){return JourneyPlanner.CAR_COST[this.get("mode")]*(this.get("total_distance")/1e3)},o.prototype.health_cost=function(){return JourneyPlanner.HEALTH_COST[this.get("mode")]*(this.get("total_distance")/1e3)},o.prototype.carbon_saving=function(){return.214*(this.get("total_distance")/1e3)},o.prototype.calculate_calories=function(t){return Math.round(t*this.total_time()*this.currentEffort()*this.get("altitude_factor"))},o.prototype.currentSpeed=function(){return JourneyPlanner.SPEEDS[this.get("mode")][this.get("pace")]},o.prototype.currentEffort=function(){return JourneyPlanner.EFFORT[this.get("mode")][this.get("pace")]},o.prototype.elevation_marker=function(){return this._elevation_marker||(this._elevation_marker=new google.maps.Marker({map:JourneyPlanner.App.map,icon:this.elevation_icon()}))},o.prototype.elevation_icon=function(){return{anchor:new google.maps.Point(14,34),url:"img/elevation_markers/icon_"+this.get("mode")+".png"}},o.prototype.showElevationMarker=function(t){var e;return null==t&&(t=0),e=t*this.get("total_distance"),this.elevation_marker().setOptions({position:this.pointAlongPath(e),visible:!0})},o.prototype.hideElevationMarker=function(){return this.elevation_marker().setVisible(!1)},o.prototype.pointAlongPath=function(t){var e,n,o=this;return null==t&&(t=0),n=null,null!=this.polyline()&&(e=0,this.polyline().getPath().forEach(function(r,i){var a,s,l;if(i>0&&null===n){if(s=o.polyline().getPath().getAt(i-1),l=google.maps.geometry.spherical.computeDistanceBetween(s,r),!(e+l>t))return e+=l;a=(t-e)/l,n=google.maps.geometry.spherical.interpolate(s,r,a)}})),n},o.prototype.showOverlays=function(t){var e,n,o,r,i,a;for(null!=(r=this.polyline())&&r.setMap(t),i=this.waypointMarkers(),a=[],n=0,o=i.length;o>n;n++)e=i[n],a.push(e.setMap(t));return a},o.prototype.hideOverlays=function(){return this.showOverlays(null)},o.prototype.polyline=function(){return this.get("encoded_polyline")?this._polyline||(this._polyline=new google.maps.Polyline({map:JourneyPlanner.App.map,path:google.maps.geometry.encoding.decodePath(this.get("encoded_polyline").polyline),strokeColor:"#2564a5",strokeWeight:4,strokeOpacity:.7})):void 0},o.prototype.waypointMarkers=function(){return this.waypoints.map(function(t){var e;return e=t.getMarker()})},o.prototype.updateMap=function(){return null!=JourneyPlanner.App.map?(JourneyPlanner.App.map.fitBounds(this.steps.bounding_box()),this.showOverlays(JourneyPlanner.App.map)):void 0},o}(Backbone.Model)}.call(this),function(){var t,e,n=function(t,e){return function(){return t.apply(e,arguments)}},o={}.hasOwnProperty,r=function(t,e){function n(){this.constructor=t}for(var r in e)o.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};JourneyPlanner.Models.ExampleJourney=function(e){function o(){return this.unhighlight=n(this.unhighlight,this),this.highlight=n(this.highlight,this),this.showExample=n(this.showExample,this),this.halfwayPoint=n(this.halfwayPoint,this),t=o.__super__.constructor.apply(this,arguments)}return r(o,e),o.prototype.initialize=function(){return this.waypoints=new JourneyPlanner.Collections.Waypoints,this.waypoints.reset(this.get("waypoints"))},o.prototype.visible=function(){return this.get("mode")===this.collection.mode},o.prototype.polyline=function(){return null!=this._polyline?this._polyline:(this._polyline=new google.maps.Polyline({path:google.maps.geometry.encoding.decodePath(this.get("encoded_polyline").polyline),strokeColor:"#2564a5",strokeWeight:4,strokeOpacity:.7,title:this.get("name")}),google.maps.event.addListener(this._polyline,"mouseover",this.highlight),google.maps.event.addListener(this._polyline,"mouseout",this.unhighlight),google.maps.event.addListener(this._polyline,"click",this.showExample),this._polyline)},o.prototype.exampleMarker=function(){return null!=this._example_marker?this._example_marker:(this._example_marker=new google.maps.Marker({position:this.halfwayPoint(),title:this.get("name")}),google.maps.event.addListener(this._example_marker,"mouseover",this.highlight),google.maps.event.addListener(this._example_marker,"mouseout",this.unhighlight),google.maps.event.addListener(this._example_marker,"click",this.showExample),this._example_marker)},o.prototype.queryString=function(){var t;return t="?mode="+this.get("mode"),this.waypoints.each(function(e){return t+="&"+e.queryStr()}),t},o.prototype.halfwayPoint=function(){var t;return t=.5*this.get("total_distance"),this.pointAlongPath(t)},o.prototype.showExample=function(){return JourneyPlanner.App.router.navigate(this.queryString(),{trigger:!0,replace:!0})},o.prototype.highlight=function(){return this.polyline().setOptions({strokeColor:"#fa780f"}),this.trigger("highlight")},o.prototype.unhighlight=function(){return this.polyline().setOptions({strokeColor:"#2564a5"}),this.trigger("unhighlight")},o}(JourneyPlanner.Models.Journey),JourneyPlanner.Collections.ExampleJourneys=function(t){function n(){return e=n.__super__.constructor.apply(this,arguments)}return r(n,t),n.prototype.model=JourneyPlanner.Models.ExampleJourney,n.prototype.mode="walking",n.prototype.updateMode=function(t){return this.mode=t,this.resetOverlays(),this.trigger("update_mode")},n.prototype.resetOverlays=function(t){return null==t&&(t=JourneyPlanner.App.map),this.forEach(function(e){return e.visible()?(e.polyline().setMap(t),e.exampleMarker().setMap(t)):(e.polyline().setMap(null),e.exampleMarker().setMap(null))})},n.prototype.showOverlays=function(t){return this.forEach(function(e){return e.visible()?(e.polyline().setMap(t),e.exampleMarker().setMap(t)):void 0})},n.prototype.hideOverlays=function(){return this.showOverlays(null)},n}(Backbone.Collection)}.call(this),function(){var t,e={}.hasOwnProperty,n=function(t,n){function o(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return o.prototype=n.prototype,t.prototype=new o,t.__super__=n.prototype,t};JourneyPlanner.DefaultRouter=function(e){function o(){return t=o.__super__.constructor.apply(this,arguments)}return n(o,e),o.prototype.routes={"*query_string":"loadJourney"},o.prototype.loadJourney=function(){var t,e,n;return t=$.deparam.querystring(),null!=(e=this.journey)&&e.hideOverlays(),null!=t.example?(this.journey=new JourneyPlanner.Models.Journey({example:t.example}),this.journey.waypoints.add([{},{}])):(this.journey=new JourneyPlanner.Models.Journey({mode:t.mode}),(null!=(n=t.waypoints)?n.length:void 0)>=2?this.journey.waypoints.add(_(t.waypoints).compact()):(this.journey.waypoints.add([{},{}]),JourneyPlanner.App.showExamples())),this.renderJourney()},o.prototype.renderJourney=function(){return JourneyPlanner.App.resultsRegion.show(new JourneyPlanner.Views.Sidebar({model:this.journey,collection:this.journey.steps})),JourneyPlanner.App.journeyFields.show(new JourneyPlanner.Views.JourneyForm({model:this.journey,collection:this.journey.waypoints})),JourneyPlanner.App.detailContent.show(new JourneyPlanner.Views.DetailsContent({model:this.journey})),this.journey.isValid()?($("#global_loading_indicator").show(),this.journey.fetch({success:function(){return $("#global_loading_indicator").hide()}})):void 0},o}(Backbone.Router)}.call(this),function(){this.JST||(this.JST={}),this.JST["templates/details_content"]=function(obj){var __p=[];with(obj||{})__p.push('<div class="tab-pane active" id="elevation">\n  <div id="elevation_graph"></div>\n</div>\n<div class="tab-pane" id="calories">\n  <h3><i class="icon-heart big-icon"></i> Calories burned: <span class="calorie_result">',initialCalories(),"</span></h3>\n  <label for=\"weight\" style=\"display:inline-block;\">Based on a weight of:</label>\n  <div class='input-append' style='display: inline-block;'>\n    <input id='weight' class='input-mini' type='number' min='0' value=\"",initialWeight(),'">\n    <span class=\'add-on\'>kg</span>\n  </div>\n\n</div>\n<div class="tab-pane" id="health">\n  <h3><i class="icon-medkit big-icon"></i> Monetary health savings per trip: ',healthCost(),"</h3>\n  <p>Monetary health savings per year, based on 3 trips back and forth weekly: <strong>",healthCostYear(),'</strong></p>\n  <p class=\'muted\'>Based on the costs of disease and early death that can be avoided with an active lifestyle.</p>\n</div>\n<div class="tab-pane" id="car_cost">\n  <h3><i class="icon-road big-icon"></i> Vehicle cost savings per trip: ',carCost(),"</h3>\n  <p>Vehicle cost savings per year, based on 3 trips back and forth weekly: <strong>",carCostYear(),"</strong></p>\n  <p class='muted'>Based on NZTA's standard motor running costs of 70c/km, and cycling cost of 5c/km.</p>\n</div>\n<div class=\"tab-pane\" id=\"carbon\">\n  <h3><i class='icon-leaf big-icon'></i> Carbon emissions saved per trip: ",carbonSaving(),"</h3>\n  <p>Carbon emissions saved per year, based on 3 trips back and forth weekly: <strong>",carbonSavingYear(),'</strong></p>\n  <p class="muted">Based on driving the same route in 2.2 litre car.</p>\n</div>\n\n\n');return __p.join("")}}.call(this),function(){this.JST||(this.JST={}),this.JST["templates/example_item"]=function(obj){var __p=[];with(obj||{})__p.push('<h6><a class="journey_name" href="#">',name,"</a></h6>\n<p>",description,"</p>\n");return __p.join("")}}.call(this),function(){this.JST||(this.JST={}),this.JST["templates/example_list"]=function(obj){var __p=[];with(obj||{})__p.push("<p id='example_modes'>Try these <a href='#' class='",modeSelected("walking"),"' data-mode=\"walking\">Walking</a> | <a href='#' class='",modeSelected("cycling"),'\' data-mode="cycling">Cycling</a> journeys.\n<ol></ol>\n');return __p.join("")}}.call(this),function(){this.JST||(this.JST={}),this.JST["templates/journey_form"]=function(obj){var __p=[];with(obj||{})__p.push('<div class=\'control-group\'>\n  <div class="btn-group span12" id="mode-toggle-btns" data-toggle="buttons-radio">\n    <label for=\'mode_walking\' class="btn btn-success span6 ',modeActive("walking"),'">\n      <input id=\'mode_walking\' name="mode" type=\'radio\' value="walking" ',modeChecked("walking")," /><i class='walking-icon'></i> Walking\n    </label>\n    <label for='mode_cycling' class=\"btn btn-success span6 ",modeActive("cycling"),'">\n      <input id=\'mode_cycling\' name="mode" type=\'radio\' value="cycling" ',modeChecked("cycling")," /><i class='cycling-icon'></i> Cycling\n    </label>\n  </div>\n\n\n  <div class='clearfix'></div>\n</div>\n<div id='waypoints'></div>\n\n<a href='#' class='btn btn-link add-waypoint'>+ Add Destination</a>\n<input type='submit' class='btn btn-primary btn-block' value='Get Directions &raquo;'>\n");return __p.join("")}}.call(this),function(){this.JST||(this.JST={}),this.JST["templates/journey_sidebar"]=function(obj){var __p=[];with(obj||{})__p.push("<p class='text-center'><strong>",startAddress(!0),"</strong> to <strong>",finishAddress(!0),"</strong></p>\n<hr />\n<dl class=\"dl-horizontal info_bar\">\n  <dt class='dropdown'>\n    ",paceDescription(),' Pace: <a class=\'dropdown-toggle\' data-toggle="dropdown" href=\'#\' title="Change Pace"><i class="icon-caret-down"></i></a>\n    <ul id="pace-dropdown" class="dropdown-menu" role="menu" >\n      <li>\n        <a href=\'#\' data-pace=\'fast\'>',speedDescription("fast"),"</a>\n      </li>\n      <li>\n        <a href='#' data-pace='average'>",speedDescription("average"),"</a>\n      </li>\n      <li>\n        <a href='#' data-pace='slow'>",speedDescription("slow"),"</a>\n      </li>\n    </ul>\n  </dt>\n  <dd>",formattedTime(),"</dd>\n  <dt>Total Distance:</dt>\n  <dd>",totalDistance(),"</dd>\n</dl>\n<hr />\n<div class='start_address'><span>Start</span> ",startAddress(),"</div>\n<ol></ol>\n<div class='finish_address'><span>End</span> ",finishAddress(),"</div>\n");return __p.join("")}}.call(this),function(){this.JST||(this.JST={}),this.JST["templates/step_item"]=function(obj){var __p=[];with(obj||{})__p.push("",description,"\n");return __p.join("")}}.call(this),function(){this.JST||(this.JST={}),this.JST["templates/waypoint_fields"]=function(obj){var __p=[];with(obj||{})__p.push("<label for='waypoint_",fieldIndex(),"_a'>\n"),0===fieldIndex()?__p.push("\n  From:\n"):__p.push("\n  To:\n"),__p.push('\n</label>\n<div class="controls">\n  <input id=\'waypoint_',fieldIndex(),"_a' name='waypoints[",fieldIndex(),"][a]' value=\"",a,'" type=\'search\' required class="span12 search-query" placeholder="Enter Address">\n  <input id=\'waypoint_',fieldIndex(),"_x' name='waypoints[",fieldIndex(),"][x]' value=\"",x,"\" type='hidden' required >\n  <input id='waypoint_",fieldIndex(),"_y' name='waypoints[",fieldIndex(),"][y]' value=\"",y,"\" type='hidden' required >\n  "),showClose()&&__p.push("\n    <a href='#' class=\"close\" title='Remove this destination'><i class='icon-remove-sign'></i></a>\n  "),__p.push("\n</div>\n");return __p.join("")}}.call(this),function(){var t,e={}.hasOwnProperty,n=function(t,n){function o(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return o.prototype=n.prototype,t.prototype=new o,t.__super__=n.prototype,t};JourneyPlanner.Views.DetailsContent=function(e){function o(){return t=o.__super__.constructor.apply(this,arguments)}return n(o,e),o.prototype.className="tab-content",o.prototype.template=JST["templates/details_content"],o.prototype.events={"keyup #weight":"calculateCalories","change #weight":"calculateCalories"},o.prototype.modelEvents={sync:"render","change:pace":"calculateCalories"},o.prototype.onRender=function(){return $(".details_panel a:first").tab("show"),this.model.get("elevation")?this.graph=new ElevationGraph($("#elevation_graph",this.el)[0],this.model):void 0},o.prototype.calculateCalories=function(){var t;return t=parseFloat($("#weight",this.el).val()),0/0!==t&&$.cookie("jp_weight",t),$(".calorie_result",this.el).html(this.model.calculate_calories(t))},o.prototype.yearMultiplier=312,o.prototype.templateHelpers=function(){var t=this;return{initialWeight:function(){return $.cookie("jp_weight")||70},initialCalories:function(){var e;return e=$.cookie("jp_weight")||70,t.model.calculate_calories(e)},healthCost:function(){return"$"+_.numberFormat(t.model.health_cost(),2)},healthCostYear:function(){return"$"+_.numberFormat(t.model.health_cost()*t.yearMultiplier,2)},carCost:function(){return"$"+_.numberFormat(t.model.car_cost(),2)},carCostYear:function(){return"$"+_.numberFormat(t.model.car_cost()*t.yearMultiplier,2)},carbonSaving:function(){return _.sprintf("%.1fkg",t.model.carbon_saving())},carbonSavingYear:function(){return _.sprintf("%.1fkg",t.model.carbon_saving()*t.yearMultiplier)}}},o}(Marionette.ItemView)}.call(this),function(){var t,e,n={}.hasOwnProperty,o=function(t,e){function o(){this.constructor=t}for(var r in e)n.call(e,r)&&(t[r]=e[r]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t};JourneyPlanner.Views.ExampleItem=function(e){function n(){return t=n.__super__.constructor.apply(this,arguments)}return o(n,e),n.prototype.tagName="li",n.prototype.template=JST["templates/example_item"],n.prototype.events={"click a.journey_name":"showExample",mouseover:"hoverEnter",mouseout:"hoverExit"},n.prototype.modelEvents={highlight:"highlight",unhighlight:"unhighlight"},n.prototype.hoverEnter=function(){return this.model.highlight()},n.prototype.hoverExit=function(){return this.model.unhighlight()},n.prototype.highlight=function(){return $(this.el).addClass("highlight")},n.prototype.unhighlight=function(){return $(this.el).removeClass("highlight")},n.prototype.showExample=function(t){return t.preventDefault(),this.model.showExample(),!1},n}(Marionette.ItemView),JourneyPlanner.Views.ExampleList=function(t){function n(){return e=n.__super__.constructor.apply(this,arguments)}return o(n,t),n.prototype.itemView=JourneyPlanner.Views.ExampleItem,n.prototype.itemViewContainer="ol",n.prototype.template=JST["templates/example_list"],n.prototype.events={"click #example_modes a":"updateMode"},n.prototype.collectionEvents={update_mode:"render"},n.prototype.updateMode=function(t){return this.collection.updateMode($(t.target).data("mode")),!1},n.prototype.appendHtml=function(t,e){return e.model.visible()?t.$("ol").append(e.el):void 0},n.prototype.templateHelpers=function(){var t=this;return{modeSelected:function(e){return t.collection.mode===e?"selected":""}}},n}(Marionette.CompositeView)}.call(this),function(){var t,e,n={}.hasOwnProperty,o=function(t,e){function o(){this.constructor=t}for(var r in e)n.call(e,r)&&(t[r]=e[r]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t};JourneyPlanner.Views.WaypointFields=function(e){function n(){return t=n.__super__.constructor.apply(this,arguments)}return o(n,e),n.prototype.tagName="div",n.prototype.className="control-group",n.prototype.template=JST["templates/waypoint_fields"],n.prototype.modelEvents={change:"render",update_point:"submitForm"},n.prototype.events={"click a.close":"removeWaypoint"},n.prototype.onRender=function(){var t,e;return e="waypoint_"+this.model.index(),t=$("#"+e+"_a",this.el)[0],new SearchWidget(t,{prefix:e})},n.prototype.templateHelpers=function(){var t=this;return{fieldIndex:function(){return t.model.index()},showClose:function(){return t.model.collection.length>2}}},n.prototype.removeWaypoint=function(){return this.model.collection.remove(this.model),!1},n.prototype.submitForm=function(){return $(this.el).parents("form").submit()},n}(Marionette.ItemView),JourneyPlanner.Views.JourneyForm=function(t){function n(){return e=n.__super__.constructor.apply(this,arguments)}return o(n,t),n.prototype.itemView=JourneyPlanner.Views.WaypointFields,n.prototype.itemViewContainer="#waypoints",n.prototype.template=JST["templates/journey_form"],n.prototype.events={"click a.add-waypoint":"addWaypoint"},n.prototype.collectionEvents={remove:"render"},n.prototype.templateHelpers=function(){var t=this;return{modeActive:function(e){return t.model.get("mode")===e?"active":""},modeChecked:function(e){return t.model.get("mode")===e?"checked":""}}},n.prototype.addWaypoint=function(){return this.collection.add({}),!1},n}(Marionette.CompositeView)}.call(this),function(){var t,e,n={}.hasOwnProperty,o=function(t,e){function o(){this.constructor=t}for(var r in e)n.call(e,r)&&(t[r]=e[r]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t};JourneyPlanner.Views.StepItem=function(e){function n(){return t=n.__super__.constructor.apply(this,arguments)}return o(n,e),n.prototype.tagName="li",n.prototype.template=JST["templates/step_item"],n}(Marionette.ItemView),JourneyPlanner.Views.Sidebar=function(t){function n(){return e=n.__super__.constructor.apply(this,arguments)}return o(n,t),n.prototype.itemView=JourneyPlanner.Views.StepItem,n.prototype.itemViewContainer="ol",n.prototype.template=JST["templates/journey_sidebar"],n.prototype.events={"click #pace-dropdown a":"changePace"},n.prototype.initialize=function(){return this.listenTo(this.model,"change",this.render)},n.prototype.changePace=function(t){return this.model.set("pace",$(t.target).data("pace")),this.render(),!1},n.prototype.onDomRefresh=function(){return $(".dropdown-toggle",this.el).dropdown()},n.prototype.templateHelpers=function(){var t=this;return{totalDistance:function(){var e;return(e=t.model.get("total_distance"))?e>1e3?""+Math.round(e/100)/10+" km":""+Math.round(e)+" m":void 0},startAddress:function(e){var n;return null==e&&(e=!1),n=t.model.waypoints.first(),e?n.streetName():n.get("a")},finishAddress:function(e){var n;return null==e&&(e=!1),n=t.model.waypoints.last(),e?n.streetName():n.get("a")},description:function(){var e;return e=t.model.waypoints,e.size()>0?"<strong>"+e.first().streetName()+"</strong> to <strong>"+e.last().streetName()+"</strong>":void 0},paceDescription:function(){return _.titleize(t.model.get("pace"))},speedDescription:function(e){var n;return n=JourneyPlanner.SPEEDS[t.model.get("mode")][e],""+_.titleize(e)+" pace - "+n+" km/hr"},formattedTime:function(){var e,n,o,r,i,a;return i=t.model.total_time(),n=Math.floor(i/60),e=1===n?"hour":"hours",r=Math.round(i-60*n),o=1===r?"minute":"minutes",a=""+r+" "+o,n>0&&(a=""+n+" "+e+", "+a),a}}},n}(Marionette.CompositeView)}.call(this),function(){var t={}.hasOwnProperty,e=function(e,n){function o(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return o.prototype=n.prototype,e.prototype=new o,e.__super__=n.prototype,e};window.SearchWidget=function(t){function n(t,e){var o=this;e.manual_style=!0,null==e.address_params&&(e.address_params={}),e.address_params.region_code="F",n.__super__.constructor.call(this,t,"d1707a90-fd84-012c-d9c3-00e08121877f",e),this.prefix=e.prefix,this.on("address:select",function(t,e){return o.populateFields(t,e.x,e.y)}),this.on("location:select",function(t,e){return o.populateFields(t,e.x,e.y)}),this.addPOIService(),Modernizr.geolocation&&this.addGPSService()}return e(n,t),n.prototype.populateFields=function(t,e,n){return $("#"+this.prefix+"_a").val(t),$("#"+this.prefix+"_x").val(e),$("#"+this.prefix+"_y").val(n)},n.prototype.addPOIService=function(){var t=this;return this.poi_service=this.addService("poi-location",function(t,e){return $.getJSON("http://jp-poi-search.journeyplanner.org.nz/search?callback=?",{q:t},function(n){var o,r;return r=function(){var t,e,r,i;for(r=n.results.slice(0,5),i=[],t=0,e=r.length;e>t;t++)o=r[t],i.push({value:o.a,data:o});return i}(),e(t,r)})}),this.poi_service.on("result:select",function(e,n){return t.populateFields(e,n.x,n.y)})},n.prototype.addGPSService=function(){var t=this;return this.gps_service=this.addService("gps-location",function(t,e){var n;return _.str.include("current location",t.toLowerCase())&&(n=[{value:"Current Location"}]),e(t,n||[])}),this.gps_service.setOption("renderer",function(){return"<i class='icon-screenshot'></i> Current Location"}),this.gps_service.on("result:select",function(){return navigator.geolocation.getCurrentPosition(function(e){return t.populateFields("Current Location",e.coords.longitude,e.coords.latitude)})})},n}(AddressFinder.Widget)}.call(this),function(){window.AddressService={AF_KEY:"d1707a90-fd84-012c-d9c3-00e08121877f"},AddressService.ClosestAddress=function(){function t(){}var e,n;return n=null,t.find=function(t,n,o){return new e(t,n,o)
},e=function(){function t(t,e,n){var o,r=this;this.lat=t,this.lng=e,this.callback=n,o={match_type:"addresses",x:this.lng,y:this.lat,key:AddressService.AF_KEY},$.getJSON("http://addressfinder.co.nz/api/address/nearby.json?callback=?",o,function(t){var e;return r.result=null!=t?null!=(e=t.completions)?e[0]:void 0:void 0,null!=r.result?r.fetchInfo():r.callback(null)})}return t.prototype.fetchInfo=function(){var t,e=this;return t={key:AddressService.AF_KEY,pxid:this.result.pxid},$.getJSON("http://addressfinder.co.nz/api/address/info.json?callback=?",t,function(t){return e.callback(t)})},t}(),t}()}.call(this),function(){window.ElevationGraph=function(){function t(t,e){var n,o=this;this.journey=e,this.svg=d3.select(t).append("svg").attr("width",600).attr("height",120),this.margin={top:10,right:10,bottom:40,left:25},this.width=this.svg.attr("width")-this.margin.left-this.margin.right,this.height=this.svg.attr("height")-this.margin.top-this.margin.bottom,this.axes=this.svg.append("g"),this.paper=this.svg.append("g").attr("transform","translate("+this.margin.left+","+this.margin.top+")"),this.x_scale=d3.scale.linear().range([0,this.width]),this.y_scale=d3.scale.linear().range([this.height,0]),this.x_axis=d3.svg.axis().scale(this.x_scale).orient("bottom"),this.y_axis=d3.svg.axis().scale(this.y_scale).orient("left").ticks(5),n=this.paper.append("rect").attr("x",0).attr("y",0).attr("width",this.width).attr("height",this.height).attr("class","bg_rect").style("fill","#ffffff").style("stroke","none"),this.hover_line=this.paper.append("rect").attr("x",0).attr("y",0).attr("width",1).attr("height",this.height).style("visibility","hidden"),this.area=d3.svg.area().x(function(t){return o.x_scale(t[0])}).y0(this.height).y1(function(t){return o.y_scale(t[1])}),this.line=d3.svg.line().x(function(t){return o.x_scale(t[0])}).y(function(t){return o.y_scale(t[1])}),this.paper.on("mousemove",function(){var t;return t=d3.event.offsetX-o.margin.left,o.hover_line.attr("x",t).style("visibility","visible"),o.journey.showElevationMarker(t/o.width)}),this.paper.on("mouseleave",function(){return o.hover_line.style("visibility","hidden"),o.journey.hideElevationMarker()}),this.updateData(this.journey.get("elevation"),this.journey.get("total_distance"))}return t.prototype.updateData=function(t,e){var n,o;return this.x_scale.domain([0,e]),o=Math.max(0,t.min_height),n=Math.max(100,t.max_height),this.y_scale.domain([o,n]).nice(),this.paper.selectAll(".elevation_area, .elevation_stroke").remove(),this.axes.selectAll(".x_axis").remove(),this.axes.selectAll(".y_axis").remove(),this.paper.append("path").datum(t.data).attr("class","elevation_area").attr("d",this.area).style("fill","#b3c533").style("fill-opacity",.35),this.axes.append("g").attr("class","x_axis").attr("transform","translate("+this.margin.left+","+(this.height+this.margin.top)+")").call(this.x_axis).append("text").attr("y",25).attr("x",this.width).style("text-anchor","end").style("fill-opacity","0.5").text("Distance Traveled (m)"),this.axes.append("g").attr("class","y_axis").attr("transform","translate("+this.margin.left+","+this.margin.top+")").call(this.y_axis).append("text").style("dominant-baseline","hanging").style("fill-opacity","0.5").attr("dx",2).text("Altitude (m)"),this.paper.append("path").datum(t.data).attr("class","elevation_stroke").attr("d",this.line).style("stroke","#b3c533").style("fill","none")},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,n=function(t,n){function o(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return o.prototype=n.prototype,t.prototype=new o,t.__super__=n.prototype,t};window.JPMap=function(e){function o(e){this.updateMaptype=t(this.updateMaptype,this),this.updateOverlay=t(this.updateOverlay,this);var n=this;o.__super__.constructor.call(this,e,this.map_opts),google.maps.event.addListener(this,"maptypeid_changed",function(){return $.cookie("jp_maptype",n.getMapTypeId(),{path:"/",expires:365})}),this.setupLayers()}return n(o,e),o.prototype.map_opts={center:new google.maps.LatLng(-41.105,175.288),zoom:9,mapTypeId:$.cookie("jp_maptype")||google.maps.MapTypeId.ROADMAP,scaleControl:!0,mapTypeControl:!1},o.prototype.setupLayers=function(){return this.pois=new JourneyPlanner.Collections.PointsOfInterest,this.weather_layer=new google.maps.weather.WeatherLayer({temperatureUnits:google.maps.weather.TemperatureUnit.CELCIUS}),this.bike_layer=new google.maps.KmlLayer("http://journeyplanner.org.nz/mobile_combined-0.2.1.kml",{clickable:!1,preserveViewport:!0,suppressInfoWindows:!0}),this.traffic_layer=new google.maps.TrafficLayer},o.prototype.updateOverlay=function(t){var e,n;return null!=(e=this.current_overlay)&&e.setMap(null),this.current_overlay=function(){switch(t){case"paths":return this.bike_layer;case"poi":return this.pois;case"traffic":return this.traffic_layer;case"weather":return this.weather_layer}}.call(this),null!=(n=this.current_overlay)&&n.setMap(this),$.cookie("jp_overlay",t,{path:"/",expires:365})},o.prototype.updateMaptype=function(t){var e;return e=function(){switch(t){case"map":return google.maps.MapTypeId.ROADMAP;case"terrain":return google.maps.MapTypeId.TERRAIN;case"aerial":return google.maps.MapTypeId.HYBRID}}(),this.setMapTypeId(e)},o}(google.maps.Map)}.call(this);