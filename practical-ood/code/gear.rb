class Gear
  attr_reader :chainring, :cog, :rim, :tire

  def initialize(chainring, cog, rim, tire)
    @chainring = chainring
    @cog       = cog
    @wheel     = Wheel.new(rim, tire)
  end

  def ratio
    chainring / cog.to_f
  end

  def gear_inches
    # tire goes around rim twice for diameter
    ratio * wheel.diameter
  end

  # Embeding wheel here, adds the idea that should only exists in gear context
  Wheel = Struct.new(:rim, :tire) do
    def diameter
      rim + (tire * 2)
    end
  end
end

# puts Gear.new(52, 11).ratio
# => 4.7272727272727275

# puts Gear.new(30, 27).ratio
# => 1.1111111111111112

# puts Gear.new(52, 11, 26, 1.5).gear_inches
# => 137.0909090909091

# puts Gear.new(52, 11, 24, 1.25).gear_inches
# =>125.27272727272728
