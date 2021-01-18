class Bicycle
  attr_reader :size, :parts

  def initialize(size:, parts:)
    @size  = size
    @parts = parts
  end

  def spares
    parts.spares
  end
end


# chain         = Part.new(name: "Chain",       description: "11-speed")
# road_tire     = Part.new(name: "tire_size",   description: "23")
# tape          = Part.new(name: "tape_color",  description: "red")
# mountain_tire = Part.new(name: "tire_size",   description: "2.1")
# rear_shock    = Part.new(name: "rear_shock",  description: "Fox", needs_spare: false)
# front_shock   = Part.new(name: "front_shock", description: "Manitou")
# road_bike     = Bicycle.new(
#                              size: "L", 
#                              parts: Parts.new([chain, road_tire, tape]), 
#                            ) 
mountain_bike   = Bicycle.new(
                               size: "L", 
                               parts: Parts.new([chain, mountain_tire, front_shock, rear_shock]), 
                             ) 