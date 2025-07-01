## 3. Characterizing Algorithms

The order of growth is a tool that helps you to differentiate the efficiency of an algorithm compared to others

**Asymptotic study** means that we care how the algorithm behaves (growth) when a **large** input is provided. Usually when an algorithm is _asymptotic_ performs best with large inputs than with small inputs

### 3.1 O, Omega & Theta notations

#### O Notation

Describes an upper bound of an asymptotic behavior of a function. This means **the function grows no faster** than a certain rate, based on the highest-order term
Example:

```
# this function is O(n^3)
7(n^3) + 100(n^2) + 20n + 6
```

#### Omega Notation

Describes a lower bound of an asymptotic behavior of a function. It describes that a function **grows at least as fast** as a certain rate.

```
# this function is Omega(n^3)
7(n^3) + 100(n^2) + 20n + 6
```

#### Theta Notation

Describes a tight bound, which means **grows precisely as** certain rate.

### 3.3 Standard notations and common functions

#### Monotonicity

A function f(n) is _monotonically increasing_ if f(m) <= f(n)

A function f(n) is _monotonically decreasing_ if f(m) >= f(n)

#### Floors and ceilings

The floor and ceiling functions are `monotonically increasing`

floor(n) = n = ceiling(n) => for all real `x` we have

### Modular arithmetic

The _remainder/residue_ of `a / n` is called mod

For example
_a_ mod _n_ = a - n [a / n]
10 mod 19 = 10

### Exponentials

a ^ 0 = 1
a ^ 1 = a
a ^ -1 = 1 / a
(a^m)^n = a^mn
(a^m)^n = (a^n)^m
(a^m)(a^n) = a^m+n

### Logarithms

log n = log2 (n)
ln n = loge (n)
log^k n = (log n)^k
loglogn = log(logn)

### Factorials

n!

### Functional Iteration

f^(i) n
f(n) applied i times

### Fibonacci Numbers

F(i) = 0 => if i = 0
= 1 => if i = 1
= F(i-1) + F(i-2) if i >= 2
