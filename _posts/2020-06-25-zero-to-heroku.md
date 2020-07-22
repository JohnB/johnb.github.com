---
layout: post
title: Zero to Heroku
---
I've just moved my [TwitterBot](https://twitter.com/todays_pizza)
from Ruby/Rails to Elixir/Phoenix and I tend to always miss a step,
so here is the process, which is a mix of
[the Phoenix deploy-to-Heroku page](https://hexdocs.pm/phoenix/heroku.html) and
[the Heroku not-officially-supported reference](https://devcenter.heroku.com/articles/buildpacks#using-a-third-party-buildpack):

* Create the new Phoenix app: `mix phx.new zero_to_heroku --no-ecto --module ZeroToHeroku`
(note: it is extra-simple without LiveView or a database - 
[YMMV](https://en.wiktionary.org/wiki/your_mileage_may_vary))
* `cd zero_to_heroku` (duh)
* `git init .`
* Update `.gitignore` to include `/.idea` (the Rubymine Dir) and 
`/junk` (where I move random files that I'll likely never need again).
* Update `.tool-versions` to configure _asdf_ with the in-use versions 
of erlang, elixir, and node 
(node is used for compilation of client-side assets, also called "static assets").
Here is mine right now:
```
nodejs 14.3.0
elixir 1.10.3-otp-23
erlang 23.0.1
```
* Use `asdf install` to ensure we're using the correct versions.
* Create the app on Heroku with `heroku create zero-to-heroku`
(note that one has to use dashes instead of underscores)
* Tell git how to connect to Heroku: `heroku git:remote --app zero-to-heroku`
* Configure Heroku application startup by creating `Procfile`
that starts our server and tells it to ignore some stop signals: 
```
web: mix phx.server --no-halt
```
* Tell Heroku how to run our code by specifying a few
[buildpacks](https://devcenter.heroku.com/articles/buildpacks). 
First, tell Heroku to use prebuilt binaries by installing 
[the hashnuke buildpack](https://github.com/HashNuke/heroku-buildpack-elixir):
```
heroku buildpacks:set hashnuke/elixir
```
* And then configure this buildpack by setting 
`elixir_buildpack.config` to specific 
language versions you've been using. Mine:
```
erlang_version=23.0.1
elixir_version=1.10.3
```
* Finally, tell Heroku to use *node.js* to build static client assets,
such as to convert SCSS to CSS, minify JavaScript file, etc., 
by installing the phoenix-static buildpack:
```
heroku buildpacks:add https://github.com/gjaldon/heroku-buildpack-phoenix-static.git
```
* And configure this buildpack with via the 
`phoenix_static_buildpack.config` file,
containing your node version:
```
node_version=14.3.0
```
* Add everything to git: `git add * .gitignore .tool-versions`
* Add the necessary Phoenix environment var: 
```
heroku config:set SECRET_KEY_BASE=`mix phx.gen.secret`
```
* Deploy with `git push heroku master`
* Go to the newly-created URL: 
[https://zero-to-heroku.herokuapp.com/](https://zero-to-heroku.herokuapp.com/) for me.
* At this point, you should see the page
* Profit!
