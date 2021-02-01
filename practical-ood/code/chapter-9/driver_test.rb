def DriverTest < Minitest::Test include PreparerInterfaceTest
  def setup
    @driver = Driver.new
  end

  # other tests that relies on @driver
end