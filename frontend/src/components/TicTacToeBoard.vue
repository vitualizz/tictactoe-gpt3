<template>
  <div class='tictactoeBoard'>
    <div
      v-for='(row, rowIndex) in board'
      :key='rowIndex'
      class='tictactoeBoard__row'
    >
      <div
        v-for='(element, elementIndex) in row'
        :key='elementIndex'
        :value='element'
        class='tictactoeBoard__rowSquare'
        :class="{ 'tictactoeBoard__rowSquare--noEmpty': element.length}"
        @click='setMark(rowIndex, elementIndex)'
      >
        <h1>{{ element }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicTacToeBoard',

  data () {
    return {
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      playerTurn: 'X',
      checkedBoxes: 0,
    }
  },

  methods: {
    setMark (rowIndex, elementIndex) {
      const row = this.board[rowIndex]

      if (row[elementIndex].length == 0) {
        this.$set(row, elementIndex, this.playerTurn)
      }

      this.nextTurn()
    },

    nextTurn () {
      this.playerTurn = this.playerTurn == 'X' ? 'O' : 'X'
      this.checkedBoxes += 1
      this.calculateWinner()
    },

    calculateWinner () {
      const { board } = this
      const winnerLines = [
        //[boardRowIndex, positionToWin]
        [[0, 0], [0, 1], [0,2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
      ]

      for (let line of winnerLines) {
        const [a, b, c] = line
        const tryA = board[a[0]][a[1]]
        const tryB = board[b[0]][b[1]]
        const tryC = board[c[0]][c[1]]

        if (tryA == 'X' && tryB == 'X' && tryC == 'X') {
          const winner = 'X'
          this.$emit('completeGame', winner)
        }

        if (tryA == 'O' && tryB == 'O' && tryC == 'O') {
          const winner = 'O'
          this.$emit('completeGame', winner)
        }
      }

      if (this.checkedBoxes == 9) {
        this.$emit('completeGame', false)
      }
    }
  },
}
</script>

<style>
.tictactoeBoard {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.tictactoeBoard__row {
  align-self: center;
  display: flex;
}

.tictactoeBoard__rowSquare {
  width: 100px;
  height: 100px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.tictactoeBoard__rowSquare--noEmpty {
  cursor: not-allowed;
}
</style>
