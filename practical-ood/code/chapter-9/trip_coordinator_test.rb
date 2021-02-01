def TripCoordinatorTest < Minitest::Test include PreparerInterfaceTest
  def setup
    @trip_coordinator = TripCoordinator.new
  end

  # other tests that relies on @trip_coordinator
end