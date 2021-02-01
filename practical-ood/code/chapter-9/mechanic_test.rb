def MechanicTest < Minitest::Test include PreparerInterfaceTest
  def setup
    @mechanic = Mechanic.new
  end

  # other tests that relies on @mechanic
end