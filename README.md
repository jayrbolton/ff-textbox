
## flimflam textbox

An auto-expanding textarea. You can optionally have the enter key trigger a change or a form submit, with shift-enter and alt-enter adding linebreaks.

This textbox will start out with a set height that you can specify (defaults to 1 line), and will expand downward as the user types more lines. You can optionally add a max line limit, at which point the area will have a scrollbar.

To use it, simply wrap a config object and a text area in a call to `textbox()`

```js
import h from 'snabbdom/h'
import textbox from 'ff-textbox'

let textarea = h('textarea, {props: {placeholder: 'Hi!'}, on: {change: do_something}}, defaultVal)
let myCommentBox = textbox(textarea, {
  captureEnter: true // default = false, whether hitting enter triggers change/form submit
, maxRows: 4 // default = false, set a number of rows that will cause scrolling to start within the textarea. Falsy value means unlimited rows, never scrolls.
})
```

The `captureEnter` property, if set to true, changes the behavior of the enter key within the textarea. If the user presses enter, no linebreak will be made. Instead:
- If the textarea is within a form, both change event on the textarea and a form submit event will fire
- If the textarea is not within a form, just a change event will fire

With `captureEnter` turned on, the user can press Shift-Enter or Alt-Enter to still create linebreaks. This behavior is similar to comment boxes that are very common in apps.

## developing

To build for deployment, run: `npm run build`. You need babel-cli installed.

A demo lives in /demo/index.js. Simply run `budo -l demo/index.js -- -t babelify` to serve the demo.

