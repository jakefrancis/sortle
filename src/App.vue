<template>
   <div>
      <WordBox @guess="handleGuess" :guess='guessMatrix'/>
      <KeyRow @keyPress='handleKeypress' :keys='topRow'    location='top'/>
      <KeyRow @keyPress='handleKeypress' :keys='middleRow' location='middle'/>
      <KeyRow @keyPress='handleKeypress' :keys='bottomRow' location='bottom'/>
      <div v-for="word in possible" :key='word'>
        <span v-for="char in word" :class="char.color" :key="word+char+char.color"> {{ char.char }}</span>
      </div>
      <p v-if="loading">loading</p>
   </div> 
</template>

<script>
import WordBox from './components/WordBox.vue'
import KeyRow from './components/KeyRow.vue'
import TRIE from './trie'

export default {
  name: 'App',
  components: {
    WordBox,
    KeyRow,
  },
  data(){
    return {
      totalGuesses: 6,
      remainingGuesses: 5,
      guessIndex: 0,
      topRow: [...'qwertyuiop'],
      middleRow: [...'asdfghjkl'],
      bottomRow: [...'zxcvbnm','Search'],
      guessMatrix: [],
      message: '',
      exclusion : {},
      wordleTrie : TRIE,
      possible: ['hello'],
      loading: false,
    }
  },
  methods: {
    handleGuess(letter, index){
      if(letter === '') letter = null
      this.guessMatrix[index].letter = letter
    },
    async handleKeypress(letter,keyState,location,index){
      if(letter === 'Search'){
        let contains = []
        let selectionCount = 0;
        for(const [char, state] of Object.entries(this.exclusion)){
          if(state === 'contains'){
            contains.push(char)
            selectionCount++
          } 
          if(state === 'wrong'){
            selectionCount++
          }
        }
        let nullCount = 0
        const guess = this.guessMatrix.map( c => {
          if(c === null){
            nullCount++
          }
            return c.letter
          })
          if(nullCount === 5 || selectionCount === 0){
            this.possible = [[{ char: 'Provide at least one Input'}]]
          } else {
            this.possible = await TRIE.findPotential(guess,this.exclusion,contains)
          }
      } else {
        let state = this.updateKeyState(keyState)
        this.exclusion[letter] = state
        switch(location){
          case 'top':
            this.topRow[index].keyState = state
            break;
          case 'middle':
            this.middleRow[index].keyState = state
            break;
          case 'bottom':
            this.bottomRow[index].keyState = state
            break;
            
        }
      }
    },
    updateKeyState(state){
            switch(state){
              case 'unknown':
                return 'wrong'
              case 'wrong':
                return 'contains'
              case 'contains':
                return 'unknown'
             }
    }
  },
   mounted(){      
      let matrix = []
      for(let i = 0; i < 5; i++){
          const baseLetter = {
            letter: null,
        }
        matrix[i] = baseLetter
      }
      this.guessMatrix = matrix

      const fillKeyRow = (row) => {
        let  objRow = []
        for(let letter of row){
          if(letter !== 'search'){
            this.exclusion[letter] = 'unknown'
          }
          let obj = {
            letter,
            keyState: 'unknown'
          }
          objRow.push(obj)
        }
        return objRow
      }

      this.topRow = fillKeyRow(this.topRow)
      this.middleRow= fillKeyRow(this.middleRow)
      this.bottomRow = fillKeyRow(this.bottomRow)
    },
}
</script>

<style>
#app {
  font-family: 'Ubuntu Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.green{
  color: green
}
.gold{
  color: gold
}
</style>
