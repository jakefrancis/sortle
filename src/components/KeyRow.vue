<template>
  <div class='key-container'>
    <KeyBox @keyPress="$emit('keyPress', letter.letter)" v-for='letter, index in keys' :key='index' :letter='letter.letter' :keyState='letter.keyState' />
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