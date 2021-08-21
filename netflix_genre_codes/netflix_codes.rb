
raw = "netflix_codes.raw"
html_file = raw.gsub(/\.raw/, ".html")
table = File.read(raw)
html = table.
  gsub(/tr><tr/, "/tr>\n<tr").
  gsub(/td><td>(\d+)</, 'td><td><a href="https://www.netflix.com/browse/genre/\1">\1</a><').
  gsub(/ \((\d+)\)/, '(<a href="https://www.netflix.com/browse/genre/\1">\1</a>)')
full_file = "
<html>
<head><title>Netflix Genres</title></head>
<body>
<h1>Netflix Genres</h1>
#{html}
</body>
</html>
"
File.open(html_file, "w") { |f| f.write(full_file) }

