class Schedule
  def scheduled?(schedulable, starting, ending)
    puts "This #{schedulable.class} is " +
         "available #{starting} - #{ending}"
  end
  
  def add(target, starting, ending)
    # ...
  end
  
  def remove(target, starting, ending)
    # ...
  end
end