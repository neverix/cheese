import { TextManager, FileManager, ButtonManager, CommentManager } from "./ui"
import { Board } from "./board"
import { Renderer } from "./renderer"

function main() {
    const renderer = new Renderer()
    const commentManager = new CommentManager()
    let board = new Board()
    board = new Board(b => {
        renderer.render(b)
        commentManager.text = board.comment
    })
    const textManager = new TextManager()
    board.load(textManager.text)
    new FileManager(text => (textManager.text = text))
    new ButtonManager(
        () => board.start(),
        () => board.undo(),
        () => board.redo(),
        () => board.end()
    )
    document.getElementById("clear-button").onclick = () => textManager.clear()
    document.getElementById("parse-button").onclick = () => {
        board.load(textManager.text)
    }
}

document.body.onload = main
