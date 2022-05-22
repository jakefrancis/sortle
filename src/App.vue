<template>
   <div>
      <WordBox v-for='index in guessMatrix.length' :guess='guessMatrix[index]' :key='index'/>
      <KeyRow @keyPress='handleKeypress' :keys='topRow'/>
      <KeyRow @keyPress='handleKeypress' :keys='middleRow'/>
      <KeyRow @keyPress='handleKeypress' :keys='bottomRow'/>
      <p>{{ message }}</p> <p> {{ word }}</p>
   </div> 
</template>

<script>
import WordBox from './components/WordBox.vue'
import KeyRow from './components/KeyRow.vue'
import * as dictionary from './5letterWords.json'

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
      bottomRow: ['enter',...'zxcvbnm','delete'],
      guessMatrix: [],
      message: ''
    }
  },
  computed: {
    word: () => {
      let keys = Object.keys(dictionary['default'])
      let word = keys[Math.floor(Math.random() * keys.length)]
      return word
    }
  },
  methods: {
    handleKeypress(letter){
      let leng = this.guessMatrix.length
      let guessRow = leng - (this.remainingGuesses) 

      const insertLetter = () => {
        if(this.guessIndex > 4) return 
        this.guessMatrix[guessRow][this.guessIndex].letter = letter
        this.guessIndex++  
      }
       const deleteLetter = () => {
         if(this.guessIndex <= 0) return
        --this.guessIndex
         this.guessMatrix[guessRow][this.guessIndex].letter = ''
        
      }
      const submitWord = () => {        
        if(this.guessIndex !== 5) return
        diffWord()        
     
      }

      const diffWord = () => {
        let guess = this.guessMatrix[guessRow];
        let word = guess.map(item => item.letter).join('')
        if(dictionary['default'][word] === undefined){
          this.message = 'Word is not a valid word'
          setTimeout(() => {
            this.message = ''
          }, 5000)
          return
        }
        for(let i = 0; i < this.word.length; i++){
          if(this.word[i] === guess[i].letter){
            guess[i].state = 'match'
          }
          else if(this.word.includes(guess[i].letter)){
            guess[i].state = 'contains'
          }
          else{
            guess[i].state = 'wrong'
            if(stateKeyboardChange(guess[i].letter,this.topRow, 'wrong')){
              if(stateKeyboardChange(guess[i].letter,this.middleRow, 'wrong')){
                stateKeyboardChange(guess[i].letter,this.bottomRow, 'wrong')
              }
            }
          }
        }
           this.remainingGuesses -= 1
        this.guessIndex = 0
      }

      const stateKeyboardChange = (guess, row, state) => {
      for(let char of row){
            if(char.letter === guess){              
              char.keyState = state
              return false
            }
        }
        return true
      }

        switch(letter){
        case 'delete':
          deleteLetter()
          break;
        case 'enter':
          submitWord()
          break;
        default:
          insertLetter()
          break;
      } 
    }
  },
   mounted(){      
      let matrix = [[],[],[],[],[],[]]
      for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < 5; j++){
          const baseLetter = {
            letter: '',
            state: ''
          }
          matrix[i][j] = baseLetter
        }
      }
      this.guessMatrix = matrix

      const fillKeyRow = (row) => {
        let  objRow = []

        for(let letter of row){
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
</style>
