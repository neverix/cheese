class TextManager {
    private textarea: HTMLTextAreaElement

    constructor() {
        this.textarea = document.getElementById(
            "textarea"
        ) as HTMLTextAreaElement
    }

    get text() {
        return this.textarea.value
    }

    set text(newText: string) {
        this.textarea.value = newText
    }

    clear() {
        this.text = ""
    }
}

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
}

class FileManager {
    constructor(callback: (text: string) => void) {
        const filePicker = document.getElementById(
            "file-input"
        ) as HTMLInputElement
        filePicker.onchange = (event: HTMLInputEvent) => {
            this.handleFile(event.target.files[0], callback)
            event.target.value = ""
        }

        const fileButton = document.getElementById(
            "file-button"
        ) as HTMLButtonElement
        fileButton.onclick = () => filePicker.click()

        const textarea = document.getElementById(
            "textarea"
        ) as HTMLTextAreaElement
        textarea.ondrop = (event: Event & { dataTransfer: DataTransfer }) => {
            event.preventDefault()
            const file = event.dataTransfer.files[0]
            this.handleFile(file, callback)
        }
    }

    handleFile(file: File, callback: (text: string) => void) {
        const reader = new FileReader()
        reader.onload = event => callback(event.target.result.toString())
        reader.readAsText(file)
    }
}

type cb = () => void

class ButtonManager {
    constructor(start: cb, undo: cb, redo: cb, end: cb) {
        document.getElementById("start").onclick = start
        document.getElementById("undo").onclick = undo
        document.getElementById("redo").onclick = redo
        document.getElementById("end").onclick = end
    }
}

class CommentManager {
    private comment: HTMLParagraphElement

    constructor() {
        this.comment = document.getElementById(
            "comment"
        ) as HTMLParagraphElement
    }

    set text(newText: string) {
        this.comment.innerText = newText
    }
}

export { TextManager, FileManager, ButtonManager, CommentManager }
