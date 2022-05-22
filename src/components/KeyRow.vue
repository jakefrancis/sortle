<template>
  <div class='key-container'>
    <KeyBox 
      v-for='letter, index in keys' 
      :key='index' 
      :letter='letter.letter' 
      :keyState='letter.keyState'
      @keyPress="$emit('keyPress', letter.letter, letter.keyState, location, index)" 
    />
  </div>
</template>

<script>
import KeyBox from './KeyBox.vue'
export default {
  components: {
    KeyBox
  },
  props: {
    keys: {
      type: Array,
    },
    location: {
      type: String
    }
  },
}
</script>

<style>
.key-container{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
  width: 40%;
  min-width: 200px;
  padding: 0.5rem;
}


</style>