class BubbleSort
  def self.sort input
    puts "Before: #{input}"
    swapped = true

    while swapped == true
      swapped = false

      for i in 0...(input.length) do
        curr = input[i]
        nextVal = input[i + 1]

        next if curr.nil? || nextVal.nil?

        if curr > nextVal
          input[i] = nextVal
          input[i + 1] = curr
          swapped = true
        end
      end
    end

    input
  end
end

BubbleSort.sort([5,4,3,2,1])