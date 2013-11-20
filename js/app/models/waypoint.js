!function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,i=function(t,i){function r(){this.constructor=t}for(var n in i)e.call(i,n)&&(t[n]=i[n]);return r.prototype=i.prototype,t.prototype=new r,t.__super__=i.prototype,t};define(["backbone","lib/address_services"],function(e,r){var n,o;return n=function(e){function n(){return this.startDrag=t(this.startDrag,this),this.liveDragUpdate=t(this.liveDragUpdate,this),this.updateWaypoint=t(this.updateWaypoint,this),o=n.__super__.constructor.apply(this,arguments)}return i(n,e),n.prototype.dragging=!1,n.prototype.initialize=function(){var t=this;return this.on("remove",function(){return t.getMarker().setMap(null)})},n.prototype.defaults=function(){return{a:"",x:"",y:""}},n.prototype.getMarker=function(){return null!=this._marker?this._marker:(this._marker=new google.maps.Marker({icon:this.iconStyle(),title:this.get("a"),position:this.getLatLng(),draggable:!0}),google.maps.event.addListener(this._marker,"dragstart",this.startDrag),google.maps.event.addListener(this._marker,"dragend",this.updateWaypoint),this._marker)},n.prototype.index=function(){return this.collection.indexOf(this)},n.prototype.iconStyle=function(){switch(this.get("type")){case"start":return{url:"img/waypoint_markers/start.png",scaledSize:new google.maps.Size(52,27),anchor:new google.maps.Point(19,27)};case"via":return{url:"img/waypoint_markers/via.png",scaledSize:new google.maps.Size(40,27),anchor:new google.maps.Point(14,27)};case"end":return{url:"img/waypoint_markers/end.png",scaledSize:new google.maps.Size(41,27),anchor:new google.maps.Point(14,27)};case"live_drag":return{path:google.maps.SymbolPath.CIRCLE,scale:4,fillColor:"#2564a5",fillOpacity:1,strokeColor:"#2564a5"};default:return{}}},n.prototype.getLatLng=function(){return this._latlng||(this._latlng=new google.maps.LatLng(this.get("y"),this.get("x")))},n.prototype.streetName=function(){return this.get("a").split(",")[0]},n.prototype.queryStr=function(){return"waypoints["+this.index()+"][a]="+escape(this.get("a"))+"&waypoints["+this.index()+"][x]="+escape(this.get("x"))+"&waypoints["+this.index()+"][y]="+escape(this.get("y"))},n.prototype.validate=function(t){var e;return e=[],t.x||e.push("missing x coordinate"),t.y?void 0:e.push("missing y coordinate")},n.prototype.updateWaypoint=function(){var t,e=this;return this.dragging=!1,clearTimeout(this.live_update_timeout),t=this.getMarker().getPosition(),r.ClosestAddress.find(t.lat(),t.lng(),function(i){return i?(e.set({a:i.a,x:t.lng(),y:t.lat()}),e.trigger("update_point")):void 0})},n.prototype.liveDragUpdate=function(){var t,e;return this.getMarker().getPosition()!==this.last_point&&(null!=(t=this.collection)&&null!=(e=t.journey)&&e.trigger("live_drag",this),this.last_point=this.getMarker().getPosition()),this.live_update_timeout=setTimeout(this.liveDragUpdate,800)},n.prototype.startDrag=function(){return this.dragging=!0,this.live_update_timeout=setTimeout(this.liveDragUpdate,800)},n}(e.Model)})}.call(this);