import { Chess, ChessInstance, Square, Piece } from "chess.js"

class Renderer {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    boardBlack = "#9f5f22"
    boardWhite = "#fe9f5f"
    black = "#222222"
    white = "#fefefe"

    constructor() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement
        this.ctx = this.canvas.getContext("2d")
    }

    render(board: ChessInstance) {
        const { width, height } = this.canvas
        const ctx = this.ctx

        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = this.boardWhite
        ctx.fillRect(0, 0, width, height)

        const dx = width / 8
        const dy = height / 8
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                if ((x + y) % 2) {
                    ctx.fillStyle = this.boardBlack
                    ctx.fillRect(x * dx, y * dy, dx, dy)
                }
                const square = ("abcdefgh"[x] + "12345678"[y]) as Square
                const piece = board.get(square)
                if (!piece) continue
                this.drawPiece(x, y, dx, dy, piece)
            }
        }
    }

    drawPiece(x: number, y: number, dx: number, dy: number, piece: Piece) {
        const ctx = this.ctx
        const color = piece.color == "w" ? this.white : this.black

        ctx.save()
        ctx.translate(x * dx, y * dy)
        ctx.scale(dx, dy)
        ctx.fillStyle = color
        switch (piece.type) {
            case "p":
                ctx.beginPath()
                ctx.arc(0.5, 0.8, 0.3, Math.PI, Math.PI * 2)
                ctx.fill()
                ctx.beginPath()
                ctx.arc(0.5, 0.4, 0.15, 0, Math.PI * 2)
                ctx.fill()
                break
            case "r":
                ctx.beginPath()
                ctx.moveTo(0.2, 0.8)
                ctx.lineTo(0.2, 0.7)

                ctx.lineTo(0.3, 0.6)
                ctx.lineTo(0.3, 0.35)

                ctx.lineTo(0.25, 0.35)
                ctx.lineTo(0.25, 0.15)

                ctx.lineTo(0.35, 0.15)
                ctx.lineTo(0.35, 0.2)
                ctx.lineTo(0.45, 0.2)
                ctx.lineTo(0.45, 0.15)
                ctx.lineTo(0.55, 0.15)
                ctx.lineTo(0.55, 0.2)
                ctx.lineTo(0.65, 0.2)
                ctx.lineTo(0.65, 0.15)

                ctx.lineTo(0.75, 0.15)
                ctx.lineTo(0.75, 0.35)

                ctx.lineTo(0.7, 0.35)
                ctx.lineTo(0.7, 0.6)

                ctx.lineTo(0.8, 0.7)
                ctx.lineTo(0.8, 0.8)
                ctx.fill()
                break
            case "n":
                ctx.beginPath()
                ctx.moveTo(0.2, 0.8)
                ctx.bezierCurveTo(0.35, 0.55, 0.45, 0.7, 0.55, 0.4)
                ctx.lineTo(0.3, 0.5)
                ctx.quadraticCurveTo(0.25, 0.4, 0.3, 0.33)
                ctx.quadraticCurveTo(0.6, 0.05, 0.65, 0.15)
                ctx.bezierCurveTo(0.9, 0.3, 0.7, 0.45, 0.8, 0.8)
                ctx.fill()
                break
            case "b":
                ctx.beginPath()
                ctx.arc(0.5, 0.8, 0.3, Math.PI, Math.PI * 2)
                ctx.fill()
                ctx.beginPath()
                ctx.arc(0.5, 0.4, 0.15, 0, Math.PI * 2)
                ctx.fill()
                ctx.beginPath()
                ctx.arc(0.5, 0.2, 0.1, 0, Math.PI * 2)
                ctx.fill()
                break
            case "q":
                ctx.beginPath()
                ctx.lineTo(0.2, 0.8)
                ctx.lineTo(0.3, 0.6)
                ctx.lineTo(0.2, 0.5)
                const spikes = 4
                const spikeMin = 0.1
                const spikeMax = 0.9
                const crownMin = 0.2
                const crownMax = 0.8
                for (let i = 0; i <= spikes; i++) {
                    ctx.lineTo(
                        spikeMin + ((spikeMax - spikeMin) / spikes) * (i - 0.5),
                        0.15
                    )
                    ctx.lineTo(
                        crownMin + ((crownMax - crownMin) / spikes) * i,
                        i == 0 || i == spikes ? 0.5 : 0.4
                    )
                }
                ctx.lineTo(0.8, 0.5)
                ctx.lineTo(0.7, 0.6)
                ctx.lineTo(0.8, 0.8)
                ctx.fill()
                for (let i = 1; i <= spikes; i++) {
                    ctx.beginPath()
                    ctx.arc(
                        spikeMin + ((spikeMax - spikeMin) / spikes) * (i - 0.5),
                        0.15,
                        0.05,
                        0,
                        Math.PI * 2
                    )
                    ctx.fill()
                }
                break
            case "k":
                ctx.beginPath()
                ctx.moveTo(0.25, 0.75)
                ctx.lineTo(0.25, 0.5)
                ctx.lineTo(0.75, 0.5)
                ctx.lineTo(0.75, 0.75)
                ctx.fill()
                ctx.beginPath()
                ctx.ellipse(0.5, 0.75, 0.25, 0.1, 0, 0, Math.PI * 2)
                ctx.fill()

                ctx.beginPath()
                ctx.ellipse(0.3, 0.5, 0.2, 0.2, 0.3, 0, Math.PI * 2)
                ctx.ellipse(0.7, 0.5, 0.2, 0.2, -0.3, 0, Math.PI * 2)
                ctx.fill()
                ctx.beginPath()
                ctx.ellipse(0.5, 0.3, 0.12, 0.15, 0, 0, Math.PI * 2)
                ctx.fill()
                break
        }
        ctx.restore()
    }
}

export { Renderer }
