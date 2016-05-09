import h from 'snabbdom/h'

function view(textarea, config) {
  textarea.data = textarea.data || {}
  textarea.data.hook = textarea.data.hook || {}
  let oldHook = textarea.data.hook.insert
  config.maxRows = config.maxRows || 30

  textarea.data.hook.insert = vnode => {
    if(oldHook) oldHook(vnode)
    let elm = vnode.elm
    let change = new Event('change'), submit = new Event('submit')
    elm.rows = elm.rows || 1
    elm.style.overflow = 'hidden'
    elm.style.height = 'auto'
    autoSetRows(elm, config.maxRows)
    elm.addEventListener('keydown', ev => {
      autoSetRows(elm, config.maxRows)
      if(config.captureEnter) handleEnterKey(ev, elm)
    })
  }

  return textarea
}

function autoSetRows(elm, maxRows) {
  let lh = elm.clientHeight / elm.rows
  elm.rows = 1
  while(elm.scrollHeight > elm.clientHeight && elm.rows < maxRows) {
    elm.style.overflow = 'hidden'
    elm.rows += 1
  }
  if(elm.scrollHeight > elm.clientHeight) elm.style.overflow = 'auto';
}

function handleEnterKey(ev, elm) {
  if(ev.keyCode !== 13) return
  if(ev.shiftKey || ev.altKey) return
  if(elm.form) { elm.form.dispatchEvent(submit) }
  elm.dispatchEvent(change)
  ev.preventDefault()
}

module.exports = view
