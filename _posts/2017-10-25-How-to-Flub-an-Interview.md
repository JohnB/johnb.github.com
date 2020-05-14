---
layout: default
title: How to Flub an Interview
---
# My Background

I coded in C and C++ long enough to know _exactly_ how memory moves around in a computer
- and it is very easy to get it wrong. So any language that handles memory more safely than C is
 a huge win in terms of robustness. 
 
I've looked at Actor-based languages and used ruby metaprogramming. 
I've looked at the software-transactional-memory of clojure.
I'm elm-curious. And I made the Kessel Run in 15 parsecs.

And in addition to what I've briefly looked at, I've had paid positions writing
BASIC. Assembly. Lisp, C, hand-optimized C, C++, forth, different assembly,
  tcl, java stubs and JNI, and of course ruby, rails, html, css, and javascript.

So in short, I really _do_ have a gut sense of how elixir and erlang work all the way down.
But I'm new to the language so I forget some of the terminology if I'm not using it day-to-day yet. 

# The Question and the Flub

The question pertained to some of the core ways in which erlang/elixir processes communicate, 
and I was struggling to find the right term and function name.

But what is the right term? A process is an erlang concept and there are some correct erlang functions for it. 
But elixir has the Process module (which sounds the same when spoken aloud) 
and uses a _differnt_ set of functions. So I was having a bit of a brain fart.

The interviewer helps me out with a hint: "`send()`". 
I'm trying my hardest to think of GenServe functions `start_link()`, `handle_cast()`, etc. that 
I don't realize I've got a hint in one language while I am thinking of the other language.

Now, in hindsight, I can see that I halfway noticed the discrepancy - thinking
"yes, `send()` is one of the core main mechanisms underneath 
the GenStage `cast` and `call` functionality - but we can mostly abstract 
ourselves from the base `send/receive` pairing."
And "what are those Genstage functions???" was where I got stuck.

# The Generous Help

We had a good conversation but it had definitely shifted 
from "Does John know elixir?" 
to "at least I can teach John about elixir while we're talking" 

The interviewer graciously suggested
`send(self(), :hello)`
and
`receive do n -> IO.inspect(n) end`
to see how it worked.

# Cleanup on Aisle Two!

Luckily, they do have teams that do work that I *am* more qualified for 
so I may yet get a chance to redeem myself.


I like languagesk. I've looked at more lnnearly as many as Steve Klabnik has worked on.

One of the core tenets of object orientation is _encapsulation_, 
where in theory, only the public functions and data are available outside the object.
While this may be the ideal, there is usually some leakiness to the abstraction,
where internal data or private functions are accessible from the outside world. 
elixir, by creating sharply-defined process boundaries, enforces the separation 
even to the point of ensuring that you *can't* crash another ~~object~~ process.
It implements this via something called the GenServer ~~mix-in~~ protocol 
(NOTE: strikethru text indicates my shift from ruby-specific terms to more
 elixir-specific terms).

# Discussed in terms of Processes, not Objects

The [man page for GenServer](https://hexdocs.pm/elixir/GenServer.html#module-client-server-apis) 
shows the _mechanics_ of how one creates a GenServer with `start_link()` and
handle messages with `handle_call()` and `handle_cast()` but not much on how to
_structure_ the code that uses a GenServer. It requires the caller to spend 
 some mental energy on
 the _how_ and the _why_ of using `start_link()` instead of focusing on
 the task you're trying to perform.

Hiding the required functions within the API leads, IMO, to a much more
 readable and object-oriented interface for the users of the object. 
 For example, here is my class-ization of the canonical Stack example:

<script src="https://gist.github.com/JohnB/4e224846aaaa8fa76cf4fed76a97a5b6.js"></script>

It extends the example with some additional public functions and the
 private functions to support them. In actual use I'd expect a `find_or_create()`
 function would be more common than just a `create()` function, but it
 all depends on how you want to use your object. Also, if this wasn't 
 slimmed down to make it more reasable I'd use 
 [doctests](https://hexdocs.pm/ex_unit/ExUnit.DocTest.html)
 to verify correctness.

# GenServer is an Abbreviation for "Generic Server"

Saying that GenServer is elixir's way of building objects is doing it a bit of
 a dis-service. An object, in ruby or python or java, is often an ephemeral thing,
 living and breathing only briefly in memory after being fetched from the
 DB and before being persisted back to the database.
 
A GenServer however lives and breathes in memory, where it can immediately respond without
 querying the database. The object's public interface has a facade that
 runs locally in the calling process, but the private interface 
 and data live in an entirely separate process. And the separate process can live on
 the same computer as the caller or can trivially be run on a separate computer. 
  
# Hire Me!

A friend once pointed out that I only write blog posts when looking for
a new position. Hmmm... fairly true. I'm currently looking for a position
using elixir, or a company interested in making the transition from ruby to elixir.
If you know of such a position, in the Bay Area or remote, please message
me at either john.baylor@gmail.com or on [twitter @JohnB](https://twitter.com/johnb).
