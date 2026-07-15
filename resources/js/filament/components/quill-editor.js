import Quill from 'quill'

export default function quillEditorFormComponent({ state, placeholder }) {
    // Kept OUTSIDE the returned (Alpine-reactive) object on purpose: Quill keeps a lot of
    // internal mutable state (Parchment blots, Selection/Range bookkeeping) that breaks in
    // hard-to-debug ways ("Cannot read properties of null (reading 'offset')") once wrapped in
    // a reactive Proxy — the same class of bug as storing a Quill instance in a Vue ref().
    // See https://github.com/slab/quill/issues/4619.
    let quill = null

    return {
        state,

        init: function () {
            quill = new Quill(this.$refs.editor, {
                theme: 'snow',
                placeholder: placeholder || '',
                modules: {
                    toolbar: [
                        [{ header: [2, 3, false] }],
                        [{ size: ['small', false, 'large', 'huge'] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ color: [] }, { background: [] }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['blockquote', 'link', 'image'],
                        ['clean'],
                    ],
                },
            })

            if (this.state) {
                // Fields migrated from a plain text/textarea input (e.g. hero_eyebrow before it
                // became a Quill field) can hold bare text with no block-level tag. Pasting that
                // straight in leaves Quill's internal Parchment tree without a proper block blot,
                // which later crashes ("Cannot read properties of null (reading 'offset')") the
                // moment the user clicks or types. Wrap it in <p> first so it's always valid.
                const isBlockHtml = /^\s*<(p|h[1-6]|ul|ol|blockquote|div)[\s>]/i.test(this.state)
                const html = isBlockHtml ? this.state : `<p>${this.state}</p>`

                quill.clipboard.dangerouslyPasteHTML(html)
            }

            quill.on('text-change', () => {
                const html = quill.root.innerHTML

                this.state = html === '<p><br></p>' ? '' : html
            })

            addCustomColorInput(quill, {
                format: 'color',
                title: 'Màu chữ tuỳ chỉnh (mã hex bất kỳ)',
                // "A" with a coloured underline — same shape as Quill's own ql-color icon,
                // so it reads as "text colour" at a glance instead of a bare swatch.
                icon: '<svg viewBox="0 0 18 18"><polyline points="5.5 11 9 3 12.5 11" fill="none" stroke="currentColor" stroke-width="1"></polyline><line x1="11.63" x2="6.38" y1="9" y2="9" stroke="currentColor" stroke-width="1"></line><line class="ql-custom-color-indicator" x1="3" x2="15" y1="15" y2="15" stroke="#000000" stroke-width="2"></line></svg>',
            })
            addCustomColorInput(quill, {
                format: 'background',
                title: 'Màu nền tuỳ chỉnh (mã hex bất kỳ)',
                // Highlighter/marker shape — visibly different from the text-colour "A" above.
                icon: '<svg viewBox="0 0 18 18"><path d="M4 11L11 4l3 3-7 7H4z" fill="none" stroke="currentColor" stroke-width="1" stroke-linejoin="round"></path><line x1="3" x2="7" y1="15" y2="15" stroke="currentColor" stroke-width="1"></line><rect class="ql-custom-color-indicator" x="3" y="12.5" width="4" height="2" fill="#000000"></rect></svg>',
            })
        },
    }
}

/**
 * Quill's built-in [{ color: [] }] / [{ background: [] }] toolbar buttons only offer
 * a fixed 40-swatch palette — no way to type/pick an arbitrary hex value. Append an
 * icon button styled like Quill's own toolbar buttons (so it doesn't read as a bare,
 * unlabelled swatch) that opens a hidden native <input type="color"> — the browser's
 * own picker lets you enter any hex code. The icon's indicator bar/stroke updates to
 * the last-picked colour, mirroring how Quill's built-in pickers behave.
 *
 * Native color inputs steal focus from the editor as soon as they're clicked, which
 * collapses/clears Quill's selection before the "input" event fires — so the current
 * range is captured on the button's mousedown (before focus moves) and applied
 * explicitly via formatText/format instead of relying on the live selection.
 */
function addCustomColorInput(quill, { format, title, icon }) {
    const wrapper = document.createElement('span')
    wrapper.className = 'ql-formats ql-custom-color-formats'

    const button = document.createElement('button')
    button.type = 'button'
    button.title = title
    button.className = 'ql-custom-color-button'
    button.innerHTML = icon

    const input = document.createElement('input')
    input.type = 'color'
    input.className = 'ql-custom-color-input'
    input.value = '#000000'
    input.tabIndex = -1

    let savedRange = null

    button.addEventListener('mousedown', (event) => {
        event.preventDefault() // don't steal focus from the editor before we can read its selection
        savedRange = quill.getSelection()
    })

    button.addEventListener('click', () => input.click())

    input.addEventListener('input', () => {
        const indicator = button.querySelector('.ql-custom-color-indicator')
        if (indicator) indicator.setAttribute(indicator.tagName === 'rect' ? 'fill' : 'stroke', input.value)

        if (!savedRange) return

        if (savedRange.length > 0) {
            quill.formatText(savedRange.index, savedRange.length, format, input.value, 'user')
        } else {
            quill.setSelection(savedRange.index, 0)
            quill.format(format, input.value, 'user')
        }
    })

    wrapper.appendChild(button)
    wrapper.appendChild(input)
    quill.getModule('toolbar').container.appendChild(wrapper)
}
