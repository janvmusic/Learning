class Mechanic
  def prepare_bicycles(bicycles)
    bicycles.each {|bicycle| prepare_bicycle}
  end

  def prepare_bicycle(bicycle)
    # ...
  end
end