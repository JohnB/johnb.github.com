---
layout: post
title: Exploring Javascript Thru Mazes
---
# {{ page.title }}

Inspired by Jack Danger Canty's <a href="https://github.com/JackDanger/maze">exhortation</a> to rewrite his <a href="https://github.com/JackDanger/maze/blob/master/maze.rb">depth-first maze</a> in another language, I chose pure javascript. JQuery provides all sorts of goodness, as does Backbone and Ember, but I wanted to practice using the browser's assembly language - javascript - to implement my maze. My implementation can be found <a href="http://johnb.github.com/maze.html"><b>here</b></a> - just use 'view source' to see the entire implementation.

The only thing I added over his implementation was the delayed redraw of each cell, allowing us to see the maze being developed. I also, inadvertently, added a bass-ackwards grid that needs to be accessed as Y,X instead of the usual X,Y (oops).

Try it yourself in yet another language - its kinda fun.

<i>Postscript 2/22/2012:</i> <a href="https://twitter.com/#!/lantius">@lantius</a> modified my code to use <a href="http://www.cs.washington.edu/education/courses/cse326/06su/project2/kruskal.html">Kruskal's algorithm</a> to generate <a href="http://lantius.github.com/maze.html">very different mazes</a>.
