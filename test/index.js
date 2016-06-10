var assert = require('assert')
var R = require("ramda")
var flyd = require("flyd")
var snabbdom = require("snabbdom")
var render = require('flimflam-render')
var h = require('snabbdom/h')

var textbox = require('../')

var container = document.createElement('div')
document.body.appendChild(container)
const patch = snabbdom.init([require("snabbdom/modules/props"), require("snabbdom/modules/eventlisteners")])
const state = {content$: flyd.stream(), submit$: flyd.stream()}
const view = state => {
  let textarea = h('textarea', { props: { value: state.content$()} })
  return h('form', {on: {submit: state.submit$}}, [
    textbox(textarea, {maxRows: 4, captureEnter: true})
  ])
}
var streams = render({container, patch, view, state})

test('it expands height as new lines are added', () => {
  state.content$("\n\n")
  let ta = streams.dom$().children[0]
  assert.equal(ta.rows, 3)
})

test('it starts scrolling once the lines hits the height', () => {
  state.content$("\n\n\n\n\n") // max lines is 4
  let ta = streams.dom$().children[0]
  assert.equal(ta.rows, 4)
})

test('it shrinks back when the lines are reduced', () => {
  state.content$("\n\n\n\n\n")
  let ta = streams.dom$().children[0]
  assert.equal(ta.rows, 4)
  state.content$("")
  assert.equal(ta.rows, 1)
})

/*
 * TODO Not sure how to test this one
test('submits the form on enter when captureEnter is true', () => {
  state.content$("hi") // max lines is 4
  streams.dom$().querySelector('textarea') // trigger enter key press
  let ev = new Event('keypress')
  let form = streams.dom$()
  let ta = form.children[0]
  ev.keyCode = 13
  ev.target = ta
  ta.dispatchEvent(ev)
  debugger
  assert.equal(state.submit$().currentTarget, form)
})
*/
