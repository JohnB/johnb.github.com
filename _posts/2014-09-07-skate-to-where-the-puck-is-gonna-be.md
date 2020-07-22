---
layout: post
title: Skate to Where the Puck Is Gonna Be
---
# Skate to Where the Puck Is Gonna Be
The title comes from this [great quote from Wayne Gretzky](http://www.amazon.com/Skate-Where-Gonna-Been-Gretzky/dp/B004TB0I9Y). I hope to do with software technology, what Gretzky did on the ice - skate to where the technological puck will be.

A few years ago, the puck was moving in the direction of Ruby on Rails - developers could add functionality faster than ever before. That is how I feel about [Meteor](https://www.meteor.com/) - it seems like it wraps some portions of the existing [node.js](http://nodejs.org/) infrastructure in a nice package (a nice *responsive* package) that is as easy to use as Rails was when it first came out. Like Rails, it can be polished as it matures - but is a huge step forward even in its pre-1.0 state.

Where Rails is mostly stuck in the request/response cycle of page refreshes, with some AJAX sprinkled on top for responsiveness, Meteor is built from the ground up to assume responsiveness as the default, with no lag between making a change and having that change reflected in the UI.

Additionally, the historic divide between the server language and the client language continues with Rails - which creates impedence mismatches between the two. Creating JSON API end-points for AJAX calls requires explicit serialization and deserialization of data - a problem that doesn't exist with Meteor since JSON is a native format for JavaScript (yes, I know it uses [DDP](http://en.wikipedia.org/wiki/Distributed_Data_Protocol) for serialization, but Meteor hides that from the user).

Yehuda Katz seems to be going in that same direction as he retires from being a Rails core member to being a driving force behind [Ember.js](http://emberjs.com/). It will be really interesting to see what he and others come up with. As always with technology, its going to continue being an exciting time - and I'm looking forward to it!
