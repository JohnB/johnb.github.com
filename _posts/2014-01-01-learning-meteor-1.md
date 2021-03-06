---
layout: post
title: Learning Meteor
---
# {{ page.title }}

I'm in the process of teaching myself the <a href="http://docs.meteor.com/#top">meteor</a> framework and I have a test app that asks for the user's location. I rolled my own location-querying code before finding the <a href="https://atmospherejs.com/package/Geolocation">geolocation</a> package - but it isn't as clean or reactive as I'd like (nor does it _track_ the user - it requires polling the current location).

In the UI where we must ask for permission to get the location, I want it to look like: <pre>{ {geoLocationTrackingRequestPermission} }</pre>

And where I use it with google maps:
<pre>if (geoLocationTracking.allowed) {
  center = new google.maps.LatLng(geoLocationTracking.latitude, geoLocationTracking.longitude);
  map.setCenter(center);
}</pre>
  
This simplicity is inspired, in part, by the standard meteor accounts-ui package, that is all hidden inside a single { {loginButtons} } helper - nothing more! But I had a hard time figuring out how they made it so simple, until now. The simplicity is actually not due to meteor, per se, but to the handlebars templating engine - where you can register a handler for a specific string which will, in turn, render a cascade of templates to handle the rest of the UI. Here is the crucial piece of code, from <a href="https://github.com/meteor/meteor/commit/119682c8ec26e84e63e3e62bf0510d515aa78d97#diff-e7d59a612c271f7d2ee876d7802cf170L4">here</a>

<script src="https://gist.github.com/JohnB/9924022.js"></script>

This inserts the _loginButtons template into the rendered page, which in turn checks whether the user is logged in or not and displays either the login button or the "userName logout" button. All very straightforward from that
point onward (assuming you know something about the meteor templating system).

## NOTE

The gist above is from an older version of the meteor codebase. It has since been simplified (as of ~v0.8) to just be a standard template, used with <pre>{ {> loginButtons} }</pre> instead of the somewhat-magic <pre>{ {loginButtons} }</pre> helper.
