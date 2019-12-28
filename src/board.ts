import { Chess, ChessInstance, Move } from "chess.js"

class Board {
    board: ChessInstance = new Chess()
    history: Move[] = []
    header: any = {}
    currentMove: number
    redraw: (board: ChessInstance) => void

    constructor(redraw?: (board: ChessInstance) => void) {
        this.redraw = redraw || (() => {})
        this.start()
    }

    load(pgn: string) {
        this.board.load_pgn(pgn)
        this.history = [...this.board.history({ verbose: true })]
        this.header = this.board.header()
        this.start()
    }

    undo() {
        const move = this.board.undo()
        if (move) {
            this.currentMove--
            this.redraw(this.board)
            return move
        }
    }

    redo() {
        if (this.currentMove >= this.history.length) return
        const move = this.history[this.currentMove]
        this.currentMove++
        this.board.move(move)
        this.redraw(this.board)
        return move
    }

    start() {
        this.board.reset()
        this.currentMove = 0
        this.redraw(this.board)
    }

    end() {
        while (this.currentMove < this.history.length) this.redo()
    }

    get comment(): string {
        if (this.currentMove == 0) return "Start of the game. White's turn."
        return "Turn №" + this.currentMove + ": " + this.incompleteComment
    }

    private get incompleteComment(): string {
        if (this.currentMove >= this.history.length) {
            return "End of the game. Result: " + this.header.Result + "."
        }
        if (this.board.in_checkmate()) {
            return "Checkmate!"
        } else if (this.board.in_check()) {
            return "Check..."
        } else if (this.board.in_draw()) {
            return "Draw."
        } else if (this.board.in_stalemate()) {
            return "Stalemate."
        } else if (this.board.in_threefold_repetition()) {
            return "Threefold repitition."
        }
        const move = this.history[this.currentMove - 1]
        if (move) {
            if (move.captured)
                return (
                    this.pieceName(move.captured) +
                    " captured by " +
                    (this.board.turn() == "b" ? "white" : "black") +
                    "!"
                )
        }
        return (this.board.turn() == "w" ? "White" : "Black") + "'s turn."
    }

    pieceName(piece: "p" | "r" | "n" | "b" | "q" | "k"): string {
        switch (piece) {
            case "p":
                return "Pawn"
            case "r":
                return "Rook"
            case "n":
                return "Knight"
            case "b":
                return "Bishop"
            case "q":
                return "Queen"
            case "k":
                return "Knight"
        }
    }
}

export { Board }
