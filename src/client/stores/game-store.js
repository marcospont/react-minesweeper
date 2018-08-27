import { observable, computed, action } from 'mobx';

export default class GameStore {
	levels = ['easy'];

	levelSettings = {
		easy: {
			cols: 9,
			rows: 9,
			mines: 10
		},
		intermediate: {
			cols: 16,
			rows: 16,
			mines: 40
		},
		expert: {
			cols: 31,
			rows: 16,
			mines: 99
		}
	};

	@observable
	level = 'expert';

	@observable
	state = {
		minesLeft: 0,
		mineHit: false,
		winner: false,
		timer: 0,
		interval: null
	};

	@observable
	board = [];

	@computed
	get settings() {
		return this.levelSettings[this.level] || {};
	}

	@action
	setLevel(level) {
		if (this.levels.includes(level)) {
			this.level = level;
			this.newGame();
		}
	}

	@action
	newGame() {
		this.board.replace(this.createBoard());
		this.resetGame();
	}

	@action
	clickSquare(row, col) {
		const board = this.copyBoard();

		if (board[row][col]) {
			if (board[row][col].mine) {
				this.revealAll(board);
				this.endGame(false);
			} else {
				this.reveal(board, row, col);
			}
			this.board.replace(board);
		}
	}

	@action
	flagSquare(row, col) {
		if (this.state.minesLeft === 0) {
			this.clickSquare(row, col);

			return;
		}

		const board = this.copyBoard();

		if (board[row][col]) {
			this.flag(board, row, col);
			this.state.minesLeft -= 1;
			this.board.replace(board);
		}
	}

	createBoard() {
		const board = [];
		let mines = 0;

		for (let i = 0; i < this.settings.rows; i++) {
			const row = [];
			for (let j = 0; j < this.settings.cols; j++) {
				const square = {
					row: i,
					col: j,
					revealed: false,
					flagged: false,
					mines: 0,
					mine: false
				};

				row.push(square);
			}

			board.push(row);
		}

		while (mines < this.settings.mines) {
			const row = Math.floor(Math.random() * this.settings.rows);
			const col = Math.floor(Math.random() * this.settings.cols);

			if (!board[row][col].mine) {
				board[row][col].mine = true;
				mines++;
			}
		}

		this.calculateMines(board);

		return board;
	}

	copyBoard() {
		const newBoard = [];

		for (let i = 0; i < this.board.length; i++) {
			const newRow = [];

			for (let j = 0; j < this.board[i].length; j++) {
				newRow.push({
					...this.board[i][j]
				});
			}

			newBoard.push(newRow);
		}

		return newBoard;
	}

	calculateMines(board) {
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				const adjacency = this.getAdjacency(board, i, j);

				board[i][j].mines = adjacency.reduce(function(total, square) {
					return total + (square.mine ? 1 : 0);
				}, 0);
			}
		}
	}

	reveal(board, row, col) {
		if (board[row][col].revealed || board[row][col].flagged) {
			return;
		}

		board[row][col].revealed = true;
		if (!board[row][col].mine && board[row][col].mines === 0) {
			const adjacency = this.getAdjacency(board, row, col);

			adjacency.forEach(square => {
				if (!square.mine) {
					this.reveal(board, square.row, square.col);
				}
			});
		}
	}

	flag(board, row, col) {
		if (board[row][col].revealed || board[row][col].flagged) {
			return;
		}

		board[row][col].flagged = true;
	}

	revealAll(board) {
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				board[i][j].revealed = true;
			}
		}
	}

	getAdjacency(board, row, col) {
		const adj = [];
		const lastRow = board.length - 1;
		const lastCol = board[0].length - 1;

		if (row > 0 && col > 0) {
			adj.push(board[row - 1][col - 1]);
		}
		if (row > 0) {
			adj.push(board[row - 1][col]);
		}
		if (row > 0 && col < lastCol) {
			adj.push(board[row - 1][col + 1]);
		}
		if (col < lastCol) {
			adj.push(board[row][col + 1]);
		}
		if (row < lastRow && col < lastCol) {
			adj.push(board[row + 1][col + 1]);
		}
		if (row < lastRow) {
			adj.push(board[row + 1][col]);
		}
		if (row < lastRow && col > 0) {
			adj.push(board[row + 1][col - 1]);
		}
		if (col > 0) {
			adj.push(board[row][col - 1]);
		}

		return adj;
	}

	resetGame() {
		this.state.minesLeft = this.settings.mines;
		this.state.mineHit = false;
		this.state.winner = false;
		this.state.timer = 0;
		clearInterval(this.state.interval);
		this.state.interval = setInterval(() => {
			this.state.timer += 1;
		}, 1000);
	}

	endGame(winner) {
		this.state.winner = winner;
		clearInterval(this.state.interval);
	}
}
