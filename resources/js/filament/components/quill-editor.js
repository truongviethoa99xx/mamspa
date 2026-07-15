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
        },
    }
}
