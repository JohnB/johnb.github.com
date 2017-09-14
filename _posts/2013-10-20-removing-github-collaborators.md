---
layout: default
title: Removing GitHub Collaborators
---
# {{ page.title }}

It took me a while, but I finally figured out how to switch my github credentials back and forth between my home github account and my work github account. Up until that point, I would often assign my work github user as a collaborator on my home repos. This isn't as clean a separation as I would like, so once I could switch users I made sure I was the correct user before accessing my home or work github accounts. This worked fine, but it bothered me a bit that my work user was a collaborator on *some* of my repos and that I didn't remember which ones.

So I <a href="http://developer.github.com/v3/auth/#basic-authentication">read up on it</a> and <a href="https://gist.github.com/JohnB/7066490">wrote a script</a> (after setting up <a href="https://github.com/settings/applications">my OAuth command-line credentials</a>), learning a few things along the way about the github API.

## OAuth Command-line Credentials

Using a desktop or laptop browser (don't try it on an iPad or iPhone - it doesn't allow you to copy the OAuth token), go to <a href="https://github.com/settings/applications">your GitHub settings page</a>, create a new Personal Access Token, and copy it to your clipboard.

## Adding your Credential to the Environment

I've set up my script to use the GH environment variable. This keeps me from ever accidentally committing a script that includes my OAuth token. If you run this script a lot, you may want to add it to your `.bashrc` file but for now we'll just leave it in the environment:

<pre>
export GW=theOAuthToken
export GWUSER=yourGitHubUserName
</pre>

## Manual Verification

Just to make sure it works, we can use the `curl` command to get your user information (this is just like <a href="http://developer.github.com/v3/auth/#basic-authentication"> what the Github docs say</a>).

<pre>
curl -u $GW:x-oauth-basic https://api.github.com/users/$GWUSER
</pre>

It should show you a bunch of JSON data describing your github user.

## Automatically Checking your Collaborators

Just follow the directions <a href="https://gist.github.com/JohnB/7066490">here</a> or, if you trust me _a lot_ just run this:

<pre>
curl https://gist.githubusercontent.com/JohnB/7066490/raw/f1b1a57bf733e2d421d264ab8005e8578c4fe298/collaborators.rb | ruby
</pre>

Assuming everything is set up, you'll see the output from `curl` as it queries each repository and then lists the repository URL along with the list of collaborators.

