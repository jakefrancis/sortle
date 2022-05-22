<template>
   <div class="container">
      <WordBox @guess="handleGuess" :guess='guessMatrix'/>
      <div class="keyboard">
      <KeyRow @keyPress='handleKeypress' :keys='topRow'    location='top'/>
      <KeyRow @keyPress='handleKeypress' :keys='middleRow' location='middle'/>
      <KeyRow @keyPress='handleKeypress' :keys='bottomRow' location='bottom'/>
      </div>
      <div>
        <ul >
          <li v-for="word in possible" :key='word'><span v-for="char in word" :class="char.color" :key="word+char+char.color"> {{ char.char ? char.char.toUpperCase() : char.char }}</span></li>
        </ul>
      </div>
    

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
      bottomRow: [...'zxcvbnm','Find'],
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
      this.guessMatrix[index].letter = letter ? letter.toLowerCase() : null
    },
    async handleKeypress(letter,keyState,location,index){
      if(letter === 'Find'){
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
          if(c.letter === null){
            nullCount++
          }
            return c.letter
          })
          if(nullCount === 5){
            if(selectionCount > 0){
              this.possible = await TRIE.findPotential(guess,this.exclusion,contains)
            } else {
              this.possible = [[{ char: 'Provide at least one Input'}]]
              }
            
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
.keyboard{
  margin: 0 8px;
}
.green {
    color: #538d4e;
}

.gold{
    color: #c9b458;
}

.grey{
    color: #787c7e;
}
.light-grey{
   color: #d3d6da;
}
.container {
  margin: 0 auto;
  max-width: 600px;
}
ul {
  padding: 0;
  margin: 0 auto;
  justify-content: center;
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}
li {
  margin: 5px;
  text-align: center;
}
span {
  font-size: 2.5rem;
}
</style>
