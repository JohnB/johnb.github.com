---
layout: post
title: Debugging Cast of Netflix to ChromeCast
---
# {{ page.title }}

This is a stream-of-debugging-steps blog post, as I try to figure out what the problem is. Please let me know, via email or twitter, if you have any ideas. I sent a support question to google but got a "we're pretty busy supporting our new product - be patient" auto-response.  Checking various web searches (google, ironically), no one else seems to be having this problem, so I might as well document my investigations.

PROBLEM: I can cast YouTube just fine from iPhone, iPad or MacBook(s) but when I attempt to cast Netflix it hangs* and my entire wife network becomes useless. The only solution is:
* Unplug both cables of the chromecast.
* Power cycle the [D-Link DI-524 rev-A] wifi router and the Comcast cable modem (they're on the same power strip).
* Plug chromecast back in

At this point we'll be back where we started, with YouTube being able to be cast from any device and for chrome tabs to be cast to the TV and netflix working fine on every device as long as we never try to cast netflix to the TV. Oh - except for netflix in a browser tab which requires sliverLight that never quite installs correctly so I've only run netflix on the iPad or the iPhone (and I guess the only place I've ever tried to cast it from). Hulu cast from the macbook is fine too.

Clearly, there is some disconnect between the iPad, chromeCast and the router/modem pair.

I've tried fiddling with the ChromeCast mac app but it didn't seem very helpful in fixing the problem. In fact, retrying it now, it is somewhat worse.  The chromeCast/TV combo shows a red screen with the Netflix name and spinning Oraborus (snake trying to eat its tail). and the chromeCastApp/netflix combo on the mac returned to the list of shows with no timeout message - nothing. Trying again yields nothing better. The iPhone and iPad at this point are now unable to load any web pages in Safari (or Chrome, which is installed on the iPhone). Oddly enough, the iPhone even seems slower than usual when wifi is turned OFF and I'm using the neighbor's M-Cell on *his* comcast connection.

After maybe 20 minutes, the chromeCast/TV combo alternates between these two messages:
	reconnect me
	'Chromecast1234' connected to myNetwork, but can't access the Internet.
and
	Connecting
	<something I didn't catch>
but the mac chrome tab trying to connect to netflix has not done anything. Refreshing doesn't seem to change anything. Other tabs can't access their servers either - my network seems seriously screwed up like their is either a huge amount of traffic or the router/modem pair is in a bad state. "traceroute google.com" times out after the second hop!

NEXT STEPS:
* look for the netflix support conact
* keep looking for a response from google
* brew install wireshark
* capture a few minutes of network traffic when everything is working well
* a few minutes when youtube is on the laptop, iPad or iPhone
* a few minutes when youtube is being successfully cast to the the chromecast/TV combo
* a few minutes when hulu  is on the laptop, iPad or iPhone
* a few minutes when hulu  is being successfully cast to the the chromecast/TV combo
* the process by which it goes bad
* how traffic changes as we kill each device in turn: iPad, iPhone, chromeCast, router and modem.

NOTES
* I keep referring to chromecast/TV and chromecastApp/mac to make sure its very clear which is which.

