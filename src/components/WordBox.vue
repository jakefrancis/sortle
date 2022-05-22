<template>
    <div class='wordbox-container'>
        <LetterBox v-for='obj, index  of guess' :letter='obj.letter' :letterState='obj.state' :key='index'/>
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