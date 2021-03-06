---
layout: post
title: Programming Puzzle
---
# {{ page.title }}

A sidewalk stretches out ahead of you, with squares of concrete evenly laid out. You are allowed to either step forward one square or you can jump forward N squares. But you must program your moves, at most M moves, ahead of time. Oh, and you must avoid some squares. Dunno why, you just need to avoid those squares.

For example, if the sidewalk in front of you looks like this: "..XX....." (with X being a bad square and . being a regular square)
And you had only two moves to either STEP forward one square or JUMP forward 3 squares, then you could do STEP JUMP to get to the far end of the sidewalk. If you did STEP STEP or JUMP STEP or JUMP JUMP then you would end up on a bad square.

Similarly, if the sidewalk was "..X.X.........XX" and you could make 3 moves and a JUMP was 4 squares, then STEP JUMP STEP would work.

So... given a sidewalk, a number of moves and a JUMP length, can you write a program to find a path (there is at least one) to the end of the sidewalk<a href="http://www.hacker.org/runaway">?</a>

When I have my solution, I'll post it as a <a href="https://gist.github.com/johnb">gist</a>.

