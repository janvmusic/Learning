class TripCoordinator
  def prepare_trip(trip)
    trip.customers.each { |customer| buy_food(customer)}
  end

  def buy_food(customers)
    # ...
  end
end