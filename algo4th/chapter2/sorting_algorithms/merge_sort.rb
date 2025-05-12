class MergeSort
  def self.sort_non_recursive input
    puts "Before = #{input}"

    size = input.length
    limit = size / 2

    left = input[0, limit]
    right = input[limit, size]

    i = 0
    j = 0
    k = 0

    while i < left.length && j < right.length
      puts "i=#{i} | j=#{j} | k=#{k}"

      if left[i] <= right[j]
        input[k] = left[i]
        i += 1
      else
        input[k] = right[j]
        j += 1
      end

      
      # Move to next element
      k += 1
    end

    # Copy over missing elements
    while i < left.length
      input[k] = left[i]
      i += 1
      k += 1
    end

    while j < right.length
      input[k] = right[j]
      j += 1
      k += 1
    end

    input
  end
end

MergeSort.sort_non_recursive([2,4,6,7,1,2,3,5])
