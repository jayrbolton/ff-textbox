'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _snabbdomH = require('snabbdom/h');

var _snabbdomH2 = _interopRequireDefault(_snabbdomH);

function view(textarea, config) {
  config = config || {};
  textarea.data = textarea.data || {};
  textarea.data.hook = textarea.data.hook || {};
  var oldHook = textarea.data.hook.insert;
  config.maxRows = config.maxRows;

  textarea.data.hook.insert = function (vnode) {
    if (oldHook) oldHook(vnode);
    var elm = vnode.elm;
    elm.style.overflow = 'hidden';
    elm.style.height = 'auto';
    autoSetRows(elm, config.maxRows);
    elm.addEventListener('input', function (ev) {
      autoSetRows(elm, config.maxRows);
    });
    elm.addEventListener('keydown', function (ev) {
      if (config.captureEnter) handleEnterKey(ev, elm);
    });
    elm.addEventListener('change', function (ev) {
      autoSetRows(elm, config.maxRows);
    });
  };

  return textarea;
}

function autoSetRows(elm, maxRows) {
  elm.rows = 1;
  while (elm.clientHeight < elm.scrollHeight && (!maxRows || elm.rows < maxRows)) {
    elm.rows += 1;
  }
  if (elm.rows >= maxRows) elm.style.overflow = 'auto';
}

function handleEnterKey(ev, elm) {
  var change = new Event('change'),
      submit = new Event('submit');
  if (ev.keyCode !== 13) return;
  if (ev.shiftKey || ev.altKey) return;
  if (elm.form) {
    elm.form.dispatchEvent(submit);
  }
  elm.dispatchEvent(change);
  ev.preventDefault();
}

module.exports = view;

