class Bicycle
  attr_reader :style, :size, 
              :tape_color,
              :front_shock, :rear_shock
  
  def initialize(**opts)
    @style       = opts[:style]
    @size        = opts[:size]
    @tape_color  = opts[:tape_color]
    @front_shock = opts[:front_shock]
    @rear_shock  = opts[:rear_shock]
  end

  # Every bike has the same defaults for tire and chain size
  def spares 
    if style == :road
      { 
        chain:      '11-speed'
        tire_size:  '23' # Millimeters
        tape_color: tape_color
      }
    else 
      {
        chain:       '11-speed'
        tire_size:   '2,1', # inches
        front_shock: front_shock
      }
    end
  end

  # Many other methods
end

bike = Bicycle.new(
  style:      :road,
  size:       'M',
  tape_color: 'red'
)

puts bike.size # M
puts bike.spares # { :chain => "11-speed", tire_size => "23", tape_color => "red" }

bike = Bicycle.new(
  style:       :mountain
  size:        'S'
  front_shock: 'Manitou',
  rear_shock:  'Fox'
)

puts bike.size # S
puts bike.spares # { :chain => "11-speed", tire_size => "2.1", front_shock => "Manitou" }
