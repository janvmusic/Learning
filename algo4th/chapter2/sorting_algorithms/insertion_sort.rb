# frozen_string_literal: true

# Explanation:
# 1. Traverse the elements from n+1 to length
# 2. save current value using i
# 3. previous index is set using j = i - 1
# 4. While j > 0 and A[j] > curr
#    a. swap
# 5. Replace first element with curr
# Usage: InsertionSort.new([5,4,3,2,1]).sort()
class InsertionSort
  def self.sort input
    puts "Before = #{input}"

    for i in 1...(input.length) do
      curr = input[i]
      p_idx = i - 1

      while p_idx >= 0 && input[p_idx] > curr
        input[p_idx + 1] = input[p_idx]
        p_idx = p_idx - 1
      end

      input[p_idx + 1] = curr
    end
    
    input
  end
end

InsertionSort.sort([5,4,3,2,1])