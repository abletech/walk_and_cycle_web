!function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,i=function(t,i){function o(){this.constructor=t}for(var n in i)e.call(i,n)&&(t[n]=i[n]);return o.prototype=i.prototype,t.prototype=new o,t.__super__=i.prototype,t};define(["underscore","app/models/journey","app/collections/waypoints","marker_with_label","app"],function(e,o,n,r){var s,h;return s=function(o){function s(){return this.unhighlight=t(this.unhighlight,this),this.highlight=t(this.highlight,this),this.showExample=t(this.showExample,this),this.halfwayPoint=t(this.halfwayPoint,this),h=s.__super__.constructor.apply(this,arguments)}return i(s,o),s.prototype.initialize=function(){return this.waypoints=new n,this.waypoints.reset(this.get("waypoints"))},s.prototype.parse=function(t){var e;return e=t.properties,e.path=t.geometry.coordinates,e},s.prototype.visible=function(){return this.get("mode")===this.collection.mode},s.prototype.polyline=function(){return null!=this._polyline?this._polyline:(this._polyline=new google.maps.Polyline({path:this.polylinePath(),strokeColor:"#2564a5",strokeWeight:4,strokeOpacity:.7,title:this.get("name")}),google.maps.event.addListener(this._polyline,"mouseover",this.highlight),google.maps.event.addListener(this._polyline,"mouseout",this.unhighlight),google.maps.event.addListener(this._polyline,"click",this.showExample),this._polyline)},s.prototype.exampleMarker=function(){return null!=this._example_marker?this._example_marker:(this._example_marker=new r({position:this.halfwayPoint(),title:this.get("name"),labelContent:this.collection.indexOf(this)+1,labelClass:"example_marker_label",labelAnchor:new google.maps.Point(13,32),icon:{url:"img/white-icon.png",scaledSize:new google.maps.Size(23,32),anchor:new google.maps.Point(13,32)}}),google.maps.event.addListener(this._example_marker,"mouseover",this.highlight),google.maps.event.addListener(this._example_marker,"mouseout",this.unhighlight),google.maps.event.addListener(this._example_marker,"click",this.showExample),this._example_marker)},s.prototype.polylinePath=function(){return e(this.get("path")).map(function(t){return new google.maps.LatLng(t[1],t[0])})},s.prototype.boundingBox=function(){var t=this;return null!=this._bounds?this._bounds:(this._bounds=new google.maps.LatLngBounds,this.polyline().getPath().forEach(function(e){return t._bounds.extend(e)}),this._bounds)},s.prototype.queryString=function(){var t;return t="?mode="+this.get("mode"),this.waypoints.each(function(e){return t+="&"+e.queryStr()}),t},s.prototype.halfwayPoint=function(){var t;return t=.5*this.get("total_distance"),this.pointAlongPath(t)},s.prototype.showExample=function(){return App.router.navigate(this.queryString(),{trigger:!0,replace:!0})},s.prototype.highlight=function(){return this.polyline().setOptions({strokeColor:"#fa780f"}),this.trigger("highlight")},s.prototype.unhighlight=function(){return this.polyline().setOptions({strokeColor:"#2564a5"}),this.trigger("unhighlight")},s}(o)})}.call(this);