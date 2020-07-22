---
layout: post
title: Openly Developing Another Toy App
---
# Openly Developing Another Toy App (App Step 0)
My side projects usually involve some new technology, and some type of game. This one also includes blogging the entire process. As if anyone would want to know how it went - vs. how it was *intended* to go.

First off, a bit about my philosophy for dealing with new (to me) tech and app development. Assuming there is nothing earth-shatteringly difficult about the basic functionality, it's just a matter of charting the path and finding the time to put one foot in front of the other.

This app (I'll get to what it is, eventually) is 99% user-focused, so I'll start by delineating all the screens I can imagine, then winnow it down to the Minimum Viable Product (MVP) that can get something usable in front of real users - with some distinction between app-specific screens and screens that are a needed for nearly any app. Once the screens are envisioned, consider the data they each need - and create fake example data - before (finally) getting to the code.

Along the way, give some thought to all the back-end administrative tasks that need to happen - should I fiddle with the database to add X, Y, or Z - or create screens for each of those tasks? My answer, from a bit of experience over the years, is that if you might ever *ever* **ever** do something twice then you should codify the process - in code(!) - to ensure it's done consistently every time and gets better over time. Leaving any process to my fallible memory is a recipe for mistakes and inconsistencies.

Lastly, unless you plan to use a novel flow that no one in the world has ever used, consider the transitions between screens. Stick to standard patterns that your users are already familiar with: Which screens should be modal dialogs? Which ones should be step N of M in a "wizard" flow? Which ones have a clear heirarchy? Which ones should be accessible at any time, from any screen?

Summarizing those last few paragraphs:

* Look at each discrete user-facing UI element as a "screen" to envision all the things a user can do, across the entire app. Note that I'm focusing on the *functionality* of each page - not how it looks. Unless people are choosing your app because it is *prettier* than other functionally-equivalent apps there is little point in spending time on how it looks - as long as it is minimally usable.
* Consider which screens are a standard part of any app. Prioritize them first - to get them out of the way. Use small discrete commits for each step - if you every want to use similar functionality in a future app it will be easier to revisit (and maybe even cherry-pick) if the commits stand on their own without dependencies on the overall application.
* List the screens in priority order - to get to MVP ASAP.
* Go over the list again. And again, each time you check off an item from the list, to see if the prioritization still makes sense given what you've learned from  the just-finished step.
* Write down (this is very important) the exact data that each screen will need. Capturing this data with usable sample data means that, with the sample data, you can exercise the entire app before dealing with the process of reading, writing, saving, updating, and deleting the real data. 

OK, time to get coding (in the next installment)...
