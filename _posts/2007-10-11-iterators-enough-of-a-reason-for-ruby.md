---
layout: post
title: "Iterators: Enough of a Reason for Ruby"
---
# {{ page.title }}
<p>A non-programmer friend recently asked me why I liked Ruby so much.  I asked him for a simple task that I could write in Ruby and we came up with a pyramid – from a single “a” to 26 “z”s.  So I showed him this one-liner:</p>
<pre>"a".upto("z") { |c| puts c * (1 + c[0] - "a"[0]) }</pre>
<p>And then showed him the same program in C:</p>
<pre>#include "stdio.h"
int main( int argc, char **argv )
{
  int loop = 0;
  for( loop = 0; loop &lt; 26; loop++ )
  {
    int innerloop = 0;
    for( innerloop = 0; innerloop &lt;= loop; innerloop++ )
    {
      printf( "%c", 'a' + loop );
    }
    printf("n");
  }
  return 0;
}</pre>
<p>Enough said.</p>
<pre>a
bb
ccc
dddd
eeeee
ffffff
ggggggg
hhhhhhhh
iiiiiiiii
jjjjjjjjjj
kkkkkkkkkkk
llllllllllll
mmmmmmmmmmmmm
nnnnnnnnnnnnnn
ooooooooooooooo
pppppppppppppppp
qqqqqqqqqqqqqqqqq
rrrrrrrrrrrrrrrrrr
sssssssssssssssssss
tttttttttttttttttttt
uuuuuuuuuuuuuuuuuuuuu
vvvvvvvvvvvvvvvvvvvvvv
wwwwwwwwwwwwwwwwwwwwwww
xxxxxxxxxxxxxxxxxxxxxxxx
yyyyyyyyyyyyyyyyyyyyyyyyy
zzzzzzzzzzzzzzzzzzzzzzzzzz</pre>
<p><em>2/6/2008 Update: </em>it might be shorter and more clear like this</p>
<pre>("a".."z").each_with_index { |c,i| puts (c * (i + 1)) }</pre>
			
