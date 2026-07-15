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

            addCustomColorInput(quill, 'color', 'Màu chữ tuỳ chỉnh (mã hex bất kỳ)')
            addCustomColorInput(quill, 'background', 'Màu nền tuỳ chỉnh (mã hex bất kỳ)')
        },
    }
}

/**
 * Quill's built-in [{ color: [] }] toolbar button only offers a fixed 40-swatch
 * palette — no way to type/pick an arbitrary hex value. Append a native
 * <input type="color"> (which the browser itself lets you enter any hex code)
 * next to it, wired to Quill's formatText API.
 *
 * Native color inputs steal focus from the editor as soon as they're clicked,
 * which collapses/clears Quill's selection before the "input" event fires — so
 * the current range is captured on mousedown (before focus moves) and applied
 * explicitly via formatText/format instead of relying on the live selection.
 */
function addCustomColorInput(quill, format, title) {
    const wrapper = document.createElement('span')
    wrapper.className = 'ql-formats ql-custom-color-formats'

    const input = document.createElement('input')
    input.type = 'color'
    input.title = title
    input.className = 'ql-custom-color'
    input.value = '#000000'

    let savedRange = null

    input.addEventListener('mousedown', () => {
        savedRange = quill.getSelection()
    })

    input.addEventListener('input', () => {
        if (!savedRange) return

        if (savedRange.length > 0) {
            quill.formatText(savedRange.index, savedRange.length, format, input.value, 'user')
        } else {
            quill.setSelection(savedRange.index, 0)
            quill.format(format, input.value, 'user')
        }
    })

    wrapper.appendChild(input)
    quill.getModule('toolbar').container.appendChild(wrapper)
}
