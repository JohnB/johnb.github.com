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
[YMMV](https://en.wiktionary.org/wiki/your_mileage_may_vary)
- but if you leave out the `--no-ecto` then I have you covered, below)
* `cd zero_to_heroku`
* `git init .`
* Update `.gitignore` to include `/.idea` (the Rubymine Dir) and 
`/junk` (where I move random files that I'll likely never need again):
```
echo "/.idea" >> .gitignore
echo "/junk" >> .gitignore
```
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
* If app creation succeeds on Heroku then your server will be on `zero-to-heroku.herokuapp.com`
so you can now add that host in the `config/prod.exs` file. Without it, the websocket connection will fail.
* Tell git how to connect to Heroku: `heroku git:remote --app zero-to-heroku`
* Tell Heroku how we want it to start up our application:
`echo 'web: mix phx.server --no-halt' > Procfile`
(`--no-halt` tells it to ignore some stop signals)
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
* Add everything to git: `git add * .gitignore .tool-versions .formatter.exs`
* Add the necessary Phoenix environment var: 
```
heroku config:set SECRET_KEY_BASE=`mix phx.gen.secret`
```
* Deploy with `git push heroku master`
* Note that if you chose, on app creation, 
to _use_ a database (omit the `--no-ecto` part of the command)
then this deploy will probably fail with a `DATABASE_URL` error.
Running `heroku addons:create heroku-postgresql` should 
build a database for it and set the missing `DATABASE_URL` value.
* Go to the newly-created URL: 
[https://zero-to-heroku.herokuapp.com/](https://zero-to-heroku.herokuapp.com/) for me.
* At this point, you should see the page
* Profit!

## Addenda

* 2020/08/16: I just noticed that I never mentioned `ecto.create` or
`ecto.migrate` in the original instructions - which is nice to see -
it validates that the focus was on getting to heroku,
not any iterating on your local dev machine.
