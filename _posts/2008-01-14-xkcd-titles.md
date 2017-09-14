---
layout: default
title: XKCD Titles 
---
# {{ page.title }}
<p>I’ve just noticed the <a href="http://xkcd.com/249/" title="Yes, I play blindfold chess; it says so on my resume">geekily</a> <a href="http://xkcd.com/234/" title="You see, when unix gets confused by spaces, you can tell it to ignore the space by " escaping it with a backslash which is pun on... oh never mind>hilarious</a> <a href="http://xkcd.com/" title="Click the link, dummy!">xkcd comic</a> and one of the funniest aspects is that each comic has a ‘title’ attribute (the text that pops up when you hover your mouse over the image) that is often as funny as the comic itself.  However, the length of the title often causes it to be truncated in my browser (Firefox 2.x, which probably has an obscure show-entire-title setting).  Rather than arduously do a ‘view source’ on each one (or figure out the Firefox setting), I have Ruby do it for me.  And for <em>you</em> if you want:</p>
<pre>
# xkcd.rb
# extract all the titles from xkcd comics since they
# tend to be too long to fully show in the browser

# USAGE: ruby -rubygems -rxkcd.rb -e 'Xkcd.new.show_all'

require 'open-uri'
require 'hpricot'

class Xkcd
  DOMAIN = 'http://xkcd.com/'

  def show id = 343  # 343 is the NSA/RSA one
    begin
      @hp = Hpricot.parse( open( "%s/%d/" % [DOMAIN,id.to_i] ) )
      (@hp / :img).each do |el|
        puts "%4d: %s" % [id.to_i, el[:title]] if el[:title]
      end
    rescue
    end
  end

  def show_all
    0.upto(400) do |i|
      show i
    end
  end
end</pre>
