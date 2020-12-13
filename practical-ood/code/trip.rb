class Trip
  attr_reader :bicycles, :customers, :vehicle

  # The idea is not depend of what object is but what it does
  def prepare(preparers)
    preparers.each {|preparer|
      case prepared
      when Mechanic
        preparer.prepare_bicycles(bicycles)
      when TripCoordinator
        preparer.buy_food(customers)
      when Driver
        preparer.gas_up(vehicle)
        preparer.fill_water_tank(vechicle)
      end
    }
  end

  # ...
end