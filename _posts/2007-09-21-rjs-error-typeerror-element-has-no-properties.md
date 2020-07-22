---
layout: post
title: rjs Error
---
# {{ page.title }}
<p>I received this error message late yesterday while testing out RJS templates and link_to_remote().  I did a google search and didn’t find anything useful – some questions that were asked and never answered; one that said “rebuild your entire app”.  Finally, I opened the page in another browser and it worked fine.  huh?</p>
<p>doh!  Rails nearly-seamless simplicity strikes again!</p>
<p>I had just changed my view code (.rhtml file) to include a new div that I wanted to be updated in an AJAXy manner.  So I clicked the link in the browser (remember: this is AJAX – no page refresh) and expected my new div to be replaced with the neat new content.  Nope.  I had to do a decidedly non-AJAX page refresh so my browser would now <em>have</em> the neat new div – only then could the div be replaced.</p>
<p>Its so simple to swap between edit and test, edit and test, edit and test, that the few times you’re required to step out of the cycle seem like a huge hassle.  But not when compared to every <em>other</em>  development process I’ve used.</p>
<p>I had a similar experience with the routes.rb file.  Unlike models and controllers and non-AJAX views, the routes.rb file only gets loaded when the web server starts.  Stopping and starting the server fixed the problem – but I think I had to run into it multiple times before I realized what the issue was.  A minor pot-hole on the smooth Rails path.</p>
<p>To mis-quote a bumper sticker: the worst day coding Ruby is better than the best day fighting C++.</p>
