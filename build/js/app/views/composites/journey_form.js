!function(){var t={}.hasOwnProperty,e=function(e,o){function n(){this.constructor=e}for(var r in o)t.call(o,r)&&(e[r]=o[r]);return n.prototype=o.prototype,e.prototype=new n,e.__super__=o.prototype,e};define(["marionette","app/views/items/waypoint_fields"],function(t,o){var n,r;return n=function(t){function n(){return r=n.__super__.constructor.apply(this,arguments)}return e(n,t),n.prototype.itemView=o,n.prototype.itemViewContainer="#waypoints",n.prototype.template=JST["app/templates/journey_form"],n.prototype.events={"click a.add-waypoint":"addWaypoint"},n.prototype.collectionEvents={remove:"render"},n.prototype.templateHelpers=function(){var t=this;return{modeActive:function(e){return t.model.get("mode")===e?"active":""},modeChecked:function(e){return t.model.get("mode")===e?"checked":""}}},n.prototype.addWaypoint=function(){return this.collection.add({}),!1},n}(t.CompositeView)})}.call(this);