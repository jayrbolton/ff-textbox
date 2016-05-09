'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _snabbdomH = require('snabbdom/h');

var _snabbdomH2 = _interopRequireDefault(_snabbdomH);

function view(textarea, config) {
  textarea.data = textarea.data || {};
  textarea.data.hook = textarea.data.hook || {};
  var oldHook = textarea.data.hook.insert;
  config.maxRows = config.maxRows || 30;

  textarea.data.hook.insert = function (vnode) {
    if (oldHook) oldHook(vnode);
    var elm = vnode.elm;
    var change = new Event('change'),
        submit = new Event('submit');
    elm.rows = elm.rows || 1;
    elm.style.overflow = 'hidden';
    elm.style.height = 'auto';
    autoSetRows(elm, config.maxRows);
    elm.addEventListener('keydown', function (ev) {
      autoSetRows(elm, config.maxRows);
      if (config.captureEnter) handleEnterKey(ev, elm);
    });
  };

  return textarea;
}

function autoSetRows(elm, maxRows) {
  var lh = elm.clientHeight / elm.rows;
  var oldVal = elm.value;
  elm.value += ' ';
  elm.rows = 1;
  while (elm.scrollHeight > elm.clientHeight && elm.rows < maxRows) {
    elm.style.overflow = 'hidden';
    elm.rows += 1;
  }
  if (elm.scrollHeight > elm.clientHeight) elm.style.overflow = 'auto';
  elm.value = oldVal;
}

function handleEnterKey(ev, elm) {
  if (ev.keyCode !== 13) return;
  if (ev.shiftKey || ev.altKey) return;
  if (elm.form) {
    elm.form.dispatchEvent(submit);
  }
  elm.dispatchEvent(change);
  ev.preventDefault();
}

module.exports = view;

