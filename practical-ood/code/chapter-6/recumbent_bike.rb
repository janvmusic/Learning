class RecumbentBike < Bicycle
  attr_reader :flag

  def post_initialize(**opts)
    @flag = opts[:flag]
  end

  def local_spares
    {
      flag: flag
    }
  end

  def default_chain
    '10-speed'
  end

  def default_tire_size
    '28'
  end
end