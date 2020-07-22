---
layout: post
title: d efine for Twitter
---
# {{ page.title }}
<p>For those of you who use twitter, you’ll likely recognize the separation of ‘d’ from ‘efine’ as intentional: ‘d’ means direct a message to another twitter user and ‘efine’ is the user you’re sending it to.  Together I hope they connote ‘define’ because thats what they do. Sending</p>
<pre>d efine ruby</pre>
<p>to twitter should, if my twitter-bot works as intended, return a direct reply of</p>
<pre>"A clear, deep, red, valued as a precious stone."</pre>
<p>Which is a fairly accurate definition (even if it <em>does </em>leave out my favorite computer language).</p>
<p>So in this part I’ll describe the definition-grabbing piece, which queries <a href="http://en.wiktionary.org/wiki/java" title="wiktionary.org" target="_blank">wiktionary.org</a> for the first definition.  This first iteration is stupidly simple: read the entire page, parse its contents with the wondrous <a href="http://code.whytheluckystiff.net/hpricot"event_item" title="_why oh _why" target="_blank">Hpricot</a> tool, grab the first item from the first ordered list on the page and throw away any links.  It sometimes gets odd or partial definitions so it will need improvement – but works great for the five minutes it took to write.</p>
<pre>
require 'open-uri'
require 'hpricot'
def efine word
  open("http://en.wiktionary.org/wiki/#{word}") do |f|
    (Hpricot(f.read) / "ol" / "li")[0].to_plain_text.gsub(/s*[.*]/,'')
  end
end</pre>
<p>That’s all.  You’ll have to wait for the twitter-integration piece in my next post.  I haven’t written it yet, but given the functionality in <a href="http://twitter4r.rubyforge.org/" title="twitter API for Ruby" target="_blank">twitter4r</a>, I doubt it will be much longer than the efine() method above.  In fact, my usual peeve about Ruby is just that: it takes longer to describe the code than to write it!</p>
