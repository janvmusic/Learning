class Trip
  attr_reader :bicycles, :customers, :vehicle

  # The idea is not depend of what object is but what it does
  def prepare(preparers)
    preparers.each {|preparer|
      preparer.prepare_trip(self)
    }
  end

  # ...
end