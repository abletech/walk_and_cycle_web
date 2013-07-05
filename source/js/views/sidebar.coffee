class JourneyPlanner.Views.StepItem extends Marionette.ItemView
  tagName: "li"
  template: JST["templates/step_item"]

class JourneyPlanner.Views.Sidebar extends Marionette.CompositeView
  itemView: JourneyPlanner.Views.StepItem
  itemViewContainer: "ol"
  template: JST["templates/journey_sidebar"]

  initialize: ->
    @listenTo @model, "change", @render

  templateHelpers: ->

    totalDistance: =>
      if distance = @model.get("total_distance")
        if distance > 500
          "#{Math.round(distance / 100.0) / 10.0} km"
        else
          "#{Math.round(distance)} m"

    startAddress: (short=false)=>
      start_address = @model.waypoints.first()
      if short then start_address.streetName() else start_address.get("a")

    finishAddress: (short=false)=>
      finish_address = @model.waypoints.last()
      if short then finish_address.streetName() else finish_address.get("a")

    description: =>
      waypoints = @model.waypoints
      if waypoints.size() > 0
        "<strong>#{waypoints.first().streetName()}</strong> to <strong>#{waypoints.last().streetName()}</strong>"

    formattedTime: =>
      time = @model.get("average_time")
      hours     = Math.floor(time/60.0)
      hour_str  = if hours == 1 then "hour" else "hours"
      minutes     = Math.round(time - (hours*60))
      minute_str  = if minutes == 1 then "minute" else "minutes"
      time_str = "#{minutes} #{minute_str}"
      time_str = "#{hours} #{hour_str}, " + time_str if hours > 0
      time_str
