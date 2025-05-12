class MergeSortRecursive
  def self.sort input
    return input if input.size <= 1

    size = input.size
    limit = size / 2
    left = MergeSortRecursive.sort(input[0, limit])
    right = MergeSortRecursive.sort(input[limit, size])

    MergeSortRecursive.merge(left, right)
  end

  def self.merge left, right
    result = []

    until left.empty? || right.empty?
      if left[0] <= right[0]
        result << left.shift 
      else
        result << right.shift if left[0] >= right[0]
      end
    end

    result + left + right
  end
end

MergeSortRecursive.sort([12,3,7,9,14,6,11,2])