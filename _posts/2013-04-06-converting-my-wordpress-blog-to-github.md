---
layout: post
title: 
---
# {{ page.title }}

[Update: ignore much of the stuff below. Jekyll and its minions are so smart that there is no need to convert from html to markdown - just extract the important bits]

This is a first experimental step in moving a bunch of blogs to one common location. The common source format is HTML and the destination format will be either textile or markdown (textile for my blog, markdown for the work blogs/wikis). There are some existing tools for doing it, but none of them seem to exactly fit my needs - which will vary for each source wiki and destination wiki. The best looking one I've found is the <a href="https://github.com/nuex/wiki_extract">WikiExtract script from Chase James</a>. It makes a few assumptions that I can't make, but other than that, it is a clear and straightforward script that is well-written and will be easy to rework to fit my needs.

The assumptions that I need to tease out and make explicit are:
* the source HTML site structure
* the conventions used in the HTML
* that the tool must copy the source site across the wire (I'll let wget do that work)
* the destination file format

The first step, for any of these conversions, is to get the data locally to be able to see the overall structure of how the pages relate.

<pre>
wget -r  http://johnb.github.io/
</pre>
Note: for secure sites, <a href="http://stackoverflow.com/questions/4272770/wget-with-authentication">look here</a>

An additional benefit at this point is that the blog is now backed up locally as HTML files, so I could maybe now (finally!) close my DreamHost account. Using this single wget command gets everything in the WordPress way - once in an "archive" format where it is stored in a year/month/day directory format and again in a stream of recent posts. I only care about copying the date-stamped archives.

At this point, the directory structure exactly matches the way WordPress displays my old blog - with a deep nesting:
<pre>
johnb.github.io/2010/11/08/small-changes-in-my-life/index.html
</pre>

This deeply nested structure will also need to be converted to the shallow directory used by my jekyll-based github blog repo, which just uses a data-stamped filename to create similar functionality (e.g. "_posts/2012-02-20-exploring-javascript-through-mazes.textile").

But the file moving is the easy part. Harder is the task of converting HTML to textile, which will require understanding and rebuilding the WikiExtract script. Luckily, he has already done the hard part and I just need to disassemble and re-assemble.

My plan is to externalize all the assumptions made by WikiExtract so we can plug in whatever we want. It should be as easy as this:

<pre>
require 'source/wordpress_archive_files'
require 'converter/html_to_textile'
require 'destination/jekyll_datestamped_blog_entries'

sources = WordpressArchiveFiles.new(my_source_dir)
converter = HtmlToTextile.new
destination = JekyllDatestampedBlogEntries.new(dest_dir)

Hairball.convert(:sources => sources, :converter => converter, :destination => destination)
</pre>
