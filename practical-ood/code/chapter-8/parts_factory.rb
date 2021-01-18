require 'ostruct'
class PartsFactory
  # road_config = [
  #   ['chain',     '11-speed']
  #   ['tire_size', '23']
  #   ['tape_color', 'red']
  # ]

  # mountain_config = [
  #   ['chain',       '11-speed']
  #   ['tire_size',   '2.1']
  #   ['front_shock', 'Manitou']
  #   ['rear_shock',  'Fox', false]
  # ]

  def self.build(config:, part_class: Part, parts_class: Parts)
    parts_class.new(
      config.collect { |part_config| 
        create_part(part_config)
      }
    )
  end

  def self.create_part(part_config)
    OpenStruct.new(
      name:        part_config[0]
      description: part_config[1]
      needs_spare: part_config.fetch(2, true)
    )
  end
end