---
layout: post
title: Toothpicks
---
# {{ page.title }}
<p>Intending to direct a new Ruby-ist to <a href="http://rubyquiz.com/">rubyquiz.com</a>, I hastily  misread the <a href="http://rubyquiz.com/quiz111.html">Counting Toothpicks</a> quiz as the reverse of what was intended.  So here is my quick code to solve the wrong problem: converting a string of toothpicks to its underlying equation and giving the answer. I was quite happy with my short solution until realizing that I had solved a much simpler problem. In any case, here it is:</p>
<pre><span class="comment">#</span>
<span class="comment"># toothpicks.rb</span>
<span class="comment">#</span>
<span class="keyword">def </span><span class="method">toothpicks</span> <span class="ident">str</span>
  <span class="ident">puts</span> <span class="ident">str</span>
  <span class="ident">str</span><span class="punct">.</span><span class="ident">gsub!</span><span class="punct">('</span><span class="string"> </span><span class="punct">','</span><span class="punct">')</span>
  <span class="keyword">raise</span> <span class="punct">'</span><span class="string">Wrong format</span><span class="punct">'</span> <span class="keyword">unless</span> <span class="ident">str</span> <span class="punct">=~</span> <span class="punct">/</span><span class="regex">^(x|<span class="escape">\|</span>|<span class="escape">\+</span>|-)*$</span><span class="punct">/</span>
  <span class="ident">count</span> <span class="punct">=</span> <span class="ident">str</span><span class="punct">.</span><span class="ident">length</span>
  <span class="ident">count</span> <span class="punct">+=</span> <span class="ident">str</span><span class="punct">.</span><span class="ident">scan</span><span class="punct">(/</span><span class="regex">(x|<span class="escape">\+</span>)</span><span class="punct">/).</span><span class="ident">length</span>
  <span class="ident">str</span><span class="punct">.</span><span class="ident">length</span><span class="punct">.</span><span class="ident">downto</span><span class="punct">(</span><span class="number">1</span><span class="punct">)</span> <span class="keyword">do</span> <span class="punct">|</span><span class="ident">n</span><span class="punct">|</span>
    <span class="ident">str</span><span class="punct">.</span><span class="ident">gsub!</span><span class="punct">(</span> <span class="punct">'</span><span class="string">|</span><span class="punct">'*</span> <span class="ident">n</span><span class="punct">,</span> <span class="ident">n</span><span class="punct">.</span><span class="ident">to_s</span> <span class="punct">)</span>
  <span class="keyword">end</span>
  <span class="ident">str</span><span class="punct">.</span><span class="ident">gsub!</span><span class="punct">('</span><span class="string">x</span><span class="punct">','</span><span class="string">*</span><span class="punct">')</span>
  <span class="ident">puts</span> <span class="ident">str</span>
  <span class="ident">result</span> <span class="punct">=</span> <span class="ident">eval</span><span class="punct">(</span><span class="ident">str</span><span class="punct">)</span>
  <span class="ident">puts</span> <span class="punct">"</span><span class="string"><span class="expr">#{result}</span> from <span class="expr">#{count}</span> toothpicks</span><span class="punct">"</span>
<span class="keyword">end</span>

<span class="keyword">if</span> <span class="constant">ARGV</span><span class="punct">[</span><span class="number">0</span><span class="punct">]</span>
  <span class="ident">toothpicks</span> <span class="constant">ARGV</span><span class="punct">[</span><span class="number">0</span><span class="punct">].</span><span class="ident">dup</span>
<span class="keyword">else</span>
  <span class="ident">toothpicks</span> <span class="punct">'</span><span class="string">||| x || + ||||| - |||||||</span><span class="punct">'</span>
<span class="keyword">end</span></pre>
<p>Running with no arguments tests the example equation:</p>
<pre>&gt;&gt;toothpicks.rb
||| x || + ||||| - |||||||
3*2+5-7
4 from 22 toothpicks</pre>
<p>Note: syntax highlighting provided by <a href="http://www.rubyinside.com/advent2006/7-coloring.html">this nice page</a>.</p>
