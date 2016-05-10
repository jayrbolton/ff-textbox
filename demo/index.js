import h from 'snabbdom/h'
import textbox from '../index.es6'
import render from 'flimflam-render'

function view() {
  let textarea = h('textarea', {
    props: {placeholder: 'hi', rows: 1}
  , style: { resize: 'none' }
  })
  return h('body', [
    h('div', [ textbox(textarea, {maxRows: false}) ])
  ])
}

render({}, view, document.body)

