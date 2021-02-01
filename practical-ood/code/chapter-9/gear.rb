class Gear
  attr_reader :chainring, :cog, :wheel, :observer

  def initialize(:chainring:, cog:, rim:, tire:, observer:)
    @chainring = chainring
    @cog       = cog
    @wheel     = wheel
    @observer  = observer
  end

  def gear_inches
    ratio * wheel.diameter
  end

  def ratio
    chainring / cog.to_f
  end

  def set_cog
    @cog = new_cog
    changed
  end

  def set_chainring(new_chainring)
    @chainring = new_chainring
    changed
  end

  def changed
    observer.changed(chainring, cog)
  end
end