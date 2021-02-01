class GearTest
  def set_up
    @observer = Minitest::Mock.new
    @gear     = Gear.new(
                  chainring: 52,
                  cog      : 11,
                  wheel    : DiameterDouble.new
                  observer : @observer
                )
  end

  def test_calculates_gear_inches
    gear = Gear.new(
            chainring: 52
            cog:       11
            wheel:     Wheel.new(26, 1.5)
           )

    assert_in_delta(137.1, gear.gear_inches, 0.01)
  end

  def test_notifies_observers_when_cogs_change
    @observer.expect(:changed, true, [52,27])
    @get.set_cog(27)
    @observer.verify
  end

  def test_notifies_observers_when_chainrings_change
    @observer.expect(:changed, true, [42,17])
    @get.set_cog(42)
    @observer.verify
  end
end