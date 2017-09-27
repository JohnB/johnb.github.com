---
layout: default
title: How to Win at NPR
---
# How to Win at NPR

1. listen to the [Sunday Puzzle](http://www.npr.org/2017/09/24/553147004/sunday-puzzle-what-s-in-a-name)
1. Search for one of the many baby name sites. I used [this one](http://www.babynames1000.com/six-letter/)
1. Copy the boys names
1. Open `irb` and type soem stuff:

```
nn = %w(
  # paste the boys names here...
)
hh = {}
nn.each {|n| last5 = n[1..-1]; hh[last5] ||= []; hh[last5] << n }.length
hh.select {|k,v| v.length == 3 }.values.each {|v| puts v.join(', ') }
```
1. Then comb through the sets of names, extracting the ones that fit the criteria 
 (two names starting with a consonant, one name starting with a vowel)
 
The best solution I found: `Auston, Huston, Juston` 
