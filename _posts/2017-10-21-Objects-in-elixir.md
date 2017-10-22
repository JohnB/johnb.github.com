---
layout: default
title: Objects in elixir
---
# The Base ~Class~ Protocol: GenServer

One of the core tenets of object orientation is _encapsulation_, 
where in theory, only the public functions and data are available outside the object.
While this may be the ideal, there is usually some leakiness to the abstraction,
where internal data or private functions are accessible from the outside world. 
elixir, by creating sharply-defined process boundaries, enforces the separation 
even to the point of ensuring that you *can't* crash another ~object~ process.
It implements this via something called the GenServer ~pattern~ protocol 

# Discussed in terms of Processes, not Objects

The [man page for GenServer|https://hexdocs.pm/elixir/GenServer.html#module-client-server-apis] 
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
 all depends on how you want to use your object.

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
  
 
