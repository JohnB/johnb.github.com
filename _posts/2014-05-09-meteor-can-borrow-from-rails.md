== Meteor Can Borrow From Rails

This is a rant about Meteor's lack of an opinion. It is driving me a bit crazy. Neither the core meteor team nor the discover meteor people make any clear recommendation as to how you app's directory structure is organized. It is deemed aa a "good thing" that it doesn't constrain anyone.

I think its a short-sighted attempt to prove that they are different from Rails. But the consistent directory structure that Rails exposes (and encourages and one might even say *demands*) is that every Rails app has the same file layout so one can easily make sense of the application. This is a *really* *good* *thing* - it has allowed Rails engineers to earn top-dollar aalaries because they have a faster ramp-up time over competing frameworks.

Some code will live on the server and some will live on the client. Any app of sufficient size will have a client and a server directory, but what else? I've seen different "boilerplate" repos that throw in a lot of top-level dirs - which looks very confusing. Why not just have a shared directory along with client and server? I think it would greatly simplify the understanding of the app without remembering any app-specific rules. If an app or module consists of client-only code then it will be obvious from the directory structure.

My ideal directory structure would look something like this:
```
app-name
    .meteor/
    .gitignore - which specifies to ignore config/*
    config/ - configuration information, such as AWS keys, that DOES NOT GET COMMITTED
    app/
        client/
        collections/
        server/
        shared/
    tests/
```
And in the ideal world there would be as few files as necessary in these dirs - they would all be leaf nodes in deeper directories.

/rant

