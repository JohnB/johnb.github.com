---
layout: post
title: "Rails Drop-In: tooltip.rb"
---
# {{ page.title }}
<p>I recently came across Davey Shafik’s nice little <a href="http://tooltip.crtx.org/">Tooltip.js script</a> – and I love it.  I love it so much that I’m adding it as context-sensitive help all over the site I’m building.  My needs are fairly simple: just some sort of pseudo-icon I can use next to any visual element to show that help or warning information is available.  Every aspect can (of course!) be styled any way you want it.</p>
<p>To gain consistency and ease of use I wrote something that isn’t an actual Rails plug-in but is more of a… drop-in.  Just drop in three files and you’re ready to roll.  There are a few ways to add the tips to your views, but the easiest way is to just add</p>
<pre>
&lt;%= Tooltip.help name %&gt;</pre>
<p>or</p>
<pre>
&lt;%= Tooltip.alert name %&gt;</pre>
<p>to show a highlighted icon.  The ones I currently use are html pseudo-icons (<strong id="tooltip_activator_help" style="background-color: yellow; vertical-align: super">?</strong> for help and <strong id="tooltip_activator_remember_me" style="background-color: orange; vertical-align: super">!</strong> for warnings) but they can just as easily be image tags (and will be, as soon as I can find some appropriate icons).</p>
<p>Finally, to get the tip data to be formatted into hidden divs you need to add this to the bottom of your view (or, ideally, your layout):</p>
<pre>
&lt;%= Tooltip.content %&gt;</pre>
<p>Thats nearly all there is to it.  The only remaining task is to add these three files:</p>
<table>
<tr>
<td>
<pre><a href="http://tooltip.crtx.org/">public/javascripts/Tooltip.js</a></pre>
</td>
<td>Davey’s code.</td>
</tr>
<tr>
<td>
<pre>/lib/tooltip.rb</pre>
</td>
<td>My code.</td>
</tr>
<tr>
<td>
<pre>/config/tooltips.yaml</pre>
</td>
<td>Styles and the tip contents.</td>
</tr>
</table>
<p>Eventually I’ll make it publicly available, but if you’d like a copy sooner just send me a note at my gmail address: john dot baylor.</p>
