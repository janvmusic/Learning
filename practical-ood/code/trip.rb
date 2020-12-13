class Trip
  attr_reader :bicycles, :customers, :vehicle

  # The idea is not depend of what object is but what it does
  def prepare(mechanic)
    mechanic.prepare_bicycles(bicycles)
  end

  # ...
end