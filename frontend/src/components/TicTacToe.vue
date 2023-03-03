<template>
  <div class='tictactoe'>
    <div class='tictactoe__status'>
      <h1>{{ statusGame }}</h1>
    </div>

    <div class='tictactoe__board'>
      <div v-if='status == 1'>
        <TicTacToeBoard
          ref='tictactorBoard'
          @completeGame='completeGame'
        />
      </div>
    </div>

    <div class='tictactoe__actions'>
      <button
        v-if='status == 0'
        @click='startGame'
      >Comenzar</button>
      <button
        v-else
        @click='resetGame'
      >Reiniciar</button>
    </div>
  </div>
</template>

<script>
import TicTacToeBoard from './TicTacToeBoard.vue'

export default {
  name: 'TicTacToe',

  components: {
    TicTacToeBoard,
  },

  data () {
    return {
      status: 0, // Ready: 0, In game: 1, Completed: 2
      winner: '',
    }
  },

  computed: {
    statusGame () {
      let res
      switch (this.status) {
        case 0:
          res = 'Listo para comenzar! :D'
          break

        case 1:
          res = 'En juego'
          break

        case 2:
          res = `El ganador es: ${this.winner}`
      }

      return res
    }
  },

  methods: {
    startGame () {
      this.status = 1
    },

    resetGame () {
      this.status = 0
    },

    completeGame (winner) {
      if (!winner) {
        this.winner = 'Empate!!!'
      } else {
        this.winner = `Player ${winner}`
      }
      this.status = 2
    }
  }
}
</script>
