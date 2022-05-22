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
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
  width: 40%;
  min-width: 200px;
  padding: 0.5rem;
}

</style>