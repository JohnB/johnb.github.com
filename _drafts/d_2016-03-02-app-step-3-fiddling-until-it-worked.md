---
layout: default
title: App Step Three Fiddling Until it Worked
---
# App Step 3 Fiddling Until it Worked

[This commit](https://github.com/JohnB/iron_cli_test/commit/d9d874e) shows the end result. The general process was... inelegant.

* Pull in more packages:

```
iron add react 
iron add react-template-helper
iron add react-dom
iron add react-router
```

* Stumble around
* Look [at a tutorial](https://www.meteor.com/tutorials/react/creating-an-app) to see how others do it.
* Look [at the source code for the project](https://github.com/meteor/simple-todos-react) 
* Realize your starting point (with *iron-cli*) is different than theirs using the standard todo example.
* Fiddle around until *something* works to render a react template inside your meteor app.
* [Commit it](https://github.com/JohnB/iron_cli_test/commit/d9d874e) and move on, knowing you probably did something stupid in the commit - hopefully as little as adding in too many files, but maybe something worse.

This is how sausage is made.
