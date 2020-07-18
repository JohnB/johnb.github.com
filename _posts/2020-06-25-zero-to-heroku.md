---
layout: default
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
* Update `.tool-versions` with the in-use versions of erlang, elixir, and node.
* `asdf install` to ensure we're using the correct versions.
* Set `elixir_buildpack.config` to `erlang_version=23.0.1` and `elixir_version=1.10.3`
* Set `phoenix_static_buildpack.config` to `compile=compile`
(assuming it is even needed)
* Set your `Procfile` to `web: mix phx.server --no-halt`
* Create the app on Heroku with `heroku create zero-to-heroku`
(note that one has to use dashes instead of underscores)
* Tell git how to connect to Heroku: `heroku git:remote --app zero-to-heroku`
* Tell heroku to use [the hashnuke buildpack](heroku buildpacks:set hashnuke/elixir):
`heroku buildpacks:set hashnuke/elixir`
* Tell it also to use the phoenix-static buildpack: `heroku buildpacks:add https://github.com/gjaldon/heroku-buildpack-phoenix-static.git` (
it was a reminder in [this alchemist blog post](https://alchemist.camp/episodes/deploy-phoenix-heroku))
* Add everything to git: `git add * .gitignore .tool-versions`
* Add the necessary environment var: `heroku config:set SECRET_KEY_BASE=mix phx.gen.secret`
(with back-ticks around `mix phx.gen.secret`)
* Deploy with `git push heroku master`
* Go to the newly-created URL 
[https://zero-to-heroku.herokuapp.com/](https://zero-to-heroku.herokuapp.com/) for me
* At this point, you should see the page
* Profit!
