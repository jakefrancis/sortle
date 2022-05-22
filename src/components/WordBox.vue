<template>
    <div class='wordbox-container'>
        <LetterBox v-for='letter,index of guess' :letter='letter.letter' :index='index' :key='index' @guess='handleGuess'/>
    </div>
</template>

<script>
import LetterBox from './LetterBox'

export default {
    components: {
        LetterBox
    },
    props: {
      guess: {
        type: Array,
      }
    },
    mounted(){
    }, methods: {
      handleGuess(letter,index){
        this.$emit('guess',letter,index)
      }
    }
}
</script>

<style scoped>
.wordbox-container{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
  height: 100px;
  margin: 0 auto;
  margin-bottom: 20px;
  justify-content: center;
  justify-items: center;
  
}

</style>