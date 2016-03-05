---
layout: default
title: App Step Two Switch to React
---
# App Step Two Switch to React
Why React? React, for good reasons, is becoming the clear leader in front-end frameworks. The syntax is clean, the concepts of immutable data and uh... stuff... makes it goodish. And all the cool kids are using it.

First (loosely following [the meteor docs](https://www.meteor.com/tutorials/react/components) and [other](https://react-in-meteor.readthedocs.org/en/latest/) [sources](https://www.discovermeteor.com/blog/react-for-meteor/)) add the meteor packages:

```
iron add react 
iron add react-template-helper
```

and, amazingly enough, the app still works great!

Now update the top-level template, `app/client/templates/layouts/master_layout/master_layout.html
` with this:

```
<template name="MasterLayout">
  <div id="root-node-for-react"></div>
</template>
```
and replace the app/server/bootstrap.js

Each app needs a way to add users, let them authenticate themselves, unsubscribe from emails, etc. Here are the "usual crap" screens I'm envisioning:

* login dialogs for each service we want to support (Meteor makes this really easy)
* admin page to invite new users, with nickname and email address. Eventually we'll want to actually send the invite email but that is a step that can be deferred until the MVP is ready for users - until then we can just generate the unique invitation link that a user *would* use and test is manually.
* destination landing page that will greet each newly-invited user, letting them choose whatever authentication method they want (meteor supports google, twitter, facebook, and other modern authentication processes - no need to support old-style username and password)
* unsubscribe page - it's required by law!

Notice there is no sign-up page. I don't need it for the MVP, which will only include me and the friends I invite.

Here goes:

* [Install meteor](https://www.meteor.com/install)
* Install the Rails-style generator tool, [*iron-cli*](https://github.com/iron-meteor/iron-cli), which subsumes and extends much of the standard `meteor` command-line functionality.
* Create the app with `iron create my_cool_app`
* Enter the directory and commit all the files:

```
cd my_cool_app
git init .
git add *
git commit -m 'Result of "iron create my_cool_app"'
```
* Use iron-cli to start the app: `iron` and then view it by pointing a browser to `http://localhost:3000/`. It doesn't look like much - just whines about where its home template is (we'll update it later).

Take a break. Have a beer. You deserve it! Then dive into the next steps:

* In another terminal window, add the base account-login package, then a number of OAuth providers:

```
iron add accounts-ui
iron add accounts-google
iron add accounts-facebook
iron add accounts-twitter
iron add accounts-github
iron add accounts-meetup
```
* Edit the `app/client/templates/home/home.html` file and replace the `<h1>...` line with `{{> loginButtons}}` - thats it!
* Switch to your browser window, the one looking at `http://localhost:3000/` - it should now show a login link!
* At this point, you are the administrator of the site and can configure each of the different login options - click on the button and it will walk you through the configuration steps.
* Commit it all with `git add *` and `git commit -m 'Added all the OAuth login options'`.

Note that the link to the loginButtons, an the UI for it, uses Meteor's *Blaze* templating library. From here on though, we'll use react.

However, I've definitely bit off way too much for this step, so I'll stop here with the TODO notes for the next step:

* switch the entire UI to react (better sooner than later)
* do the rest of the steps originally planned:
  * invitation page
  * landing page
  * unsubscribe (although, maybe this should wait until we actually *send* such emails)

