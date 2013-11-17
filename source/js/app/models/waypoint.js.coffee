define ["backbone", "lib/address_services"], (Backbone, AddressService)->
  class Waypoint extends Backbone.Model

    initialize: ->
      @on "remove", =>
        @getMarker().setMap(null)

    defaults: ->
      {"a":"", "x":"", "y":""}

    getMarker: ->
      return @_marker if @_marker?
      @_marker = new google.maps.Marker
        icon: @iconStyle()
        title: @get("a")
        position: @getLatLng()
        draggable: true
      google.maps.event.addListener @_marker, "dragend", @updateWaypoint
      @_marker

    index: ->
      @collection.indexOf(@)

    iconStyle: ->
      switch @get("type")
        when "start"
          {url: "img/waypoint_markers/start.png", scaledSize: new google.maps.Size(52,27), anchor: new google.maps.Point(19,27)}
        when "via"
          {url: "img/waypoint_markers/via.png", scaledSize: new google.maps.Size(40,27), anchor: new google.maps.Point(14,27)}
        when "end"
          {url: "img/waypoint_markers/end.png", scaledSize: new google.maps.Size(41,27), anchor: new google.maps.Point(14,27)}
        else
          {}

    getLatLng: ->
      @_latlng ||= new google.maps.LatLng(@get("y"), @get("x"))

    streetName: ->
      @get("a").split(",")[0]

    queryStr: ->
      "waypoints[#{@index()}][a]=#{escape(@get('a'))}&waypoints[#{@index()}][x]=#{escape(@get('x'))}&waypoints[#{@index()}][y]=#{escape(@get('y'))}"

    validate: (attrs, options)->
      errors = []
      unless attrs.x
        errors.push "missing x coordinate"
      unless attrs.y
        errors.push "missing y coordinate"

    updateWaypoint: =>
      new_point = @getMarker().getPosition()
      AddressService.ClosestAddress.find new_point.lat(), new_point.lng(), (data)=>
        if data
          @set {a: data.a, x: new_point.lng(), y: new_point.lat()}
          @trigger "update_point"
