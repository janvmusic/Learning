class RoadBike < Bicycle
  attr_reader :tape_color

  def post_initialize(**opts)
      @tape_color = opts[:tape_color]
  end

  def local_spares
    {
      tape_color: tape_color
    }
  end

  def default_tire_size
    "23"
  end
end

# road_bike = RoadBike.new(size: 'M', tape_color: 'red')
# puts road_bike.tire_size
# puts road_bike.chain
