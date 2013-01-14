
html = IO.read('story.html')
story = DATA.read
#puts story
story.gsub!(/\[\[/,"<expando><initial>")
story.gsub!(/\|\|/,"</initial><expanded>")
story.gsub!(/\]\]/,"</expanded></expando>")
story.gsub!(/<br>/,"<div class='break'></div>")
to_replace = Regexp.new("<replace>.*<\/replace>",Regexp::MULTILINE)
#puts to_replace
result = html.sub(to_replace, "<replace>#{story}</replace>")
#result = html.gsub(/JavaScript/, story)
puts result
File.open('story.html','w') { |f| f.write(result) }

__END__
A donation story at
[[
  Razoo
||
  <a href="http://www.razoo.com">razoo.com</a>, where I
  [[
    work
  ||
    <br>strive<br> to change how individuals interact with the causes they support<br>
  ]]
]]
should be
[[
  compelling
||
  <br>compelling enough <br>for someone to
  [[
    donate money
  ||
    donate money and
    [[
      time
    ||
      time - a little bit of time to ask others to also donate
    ]]
  ]]

]]
