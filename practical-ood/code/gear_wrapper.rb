module SomeFramework
  class Gear
    attr_reader :chainring, :cog, :wheel
  
    def initialize(chainring, cog, wheel = nil)
      @chainring = chainring
      @cog       = cog
      @wheel     = wheel
    end
  
    # ...
  end
end

# Wrap the interface to protect yourself from changes
module GearWrapper
  def self.gear(chainring:, cog:, wheel:)
    SomeFramework::Gear.new(chainring, cog, wheel)
  end
end
