class MountainBike < Bicycle
  attr_reader :front_shock, :rear_shock

  def post_initialize(**opts)
    @front_shock = opts[:front_shock]
    @rear_shock  = opts[:rear_shock]
  end

  def local_spares
    {
      front_shock: front_shock
    }
  end

  def default_tire_size
    "2.1"
  end
end

# mountain_bike = MountainBike.new(
#                                  size:        'S',
#                                  front_shock: 'Manitou',
#                                  rear_shock:  'Fox'
# )

# puts mountain_bike.tire_size
# puts mountain_bike.chain