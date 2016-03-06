---
layout: default
title: App Step Two Switch to React
---
# App Step 2 Switch to React
Why React? React, for good reasons, is becoming the clear leader in front-end frameworks. The syntax is clean, the concepts of immutable data and uh... stuff... makes it goodish. And all the cool kids are using it.

First (loosely following [the meteor docs](https://www.meteor.com/tutorials/react/components) and [other](https://react-in-meteor.readthedocs.org/en/latest/) [sources](https://www.discovermeteor.com/blog/react-for-meteor/)) add the meteor packages:

```
iron add react 
iron add react-template-helper
```

and, amazingly enough, the app still works great!

Now update the top-level template, 
`app/client/templates/layouts/master_layout/master_layout.html`
 with this:

```
<template name="MasterLayout">
  <div id="root-node-for-react"></div>
</template>
```

and then... uh... spend the rest of the evening trying to make a react template - *any* react template - render in meteor. Sleep on it.
