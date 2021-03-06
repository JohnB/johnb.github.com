---
layout: post
title: Converting Exception Emails to Failing Tests
---
# {{ page.title }}
I periodically get exception emails from a production server. They have a format like this:
  Subject: [prodHostname] in controller#action exception message
  Body: request parameters, request headers, server backtrace

My usual debugging process looks isomething like this:
- Find or create the controller test
- Find or create a context section 
- Find or create a controller action section 
- Add this:
context "Exception email: [PROD] in controllerName#create NoMethodError: undefined method `keys' for []:Array"
  context "create" do
    context "POST"
      assert_nothing_raised do
        post broken_params
        assert_equal "NOTHING HAPPENED,  "WE SHOULD HAVE HAD AN EXCEPTION HERE"
      end
    end
  end
end

- run it and see if it triggers the exception or the "missed out" failure
- fix the bug or try again to reproduce it
- double-check that it doesn't mask a security flaw

Yeah, I really ought to write that some time. But not today.

