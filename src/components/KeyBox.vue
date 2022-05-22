<template>
  <div @click="handleClick" :class='keyState'>
    {{ letter }}
  </div>
</template>

<script>
export default {
  props: {
    letter: {
      type: String,
      default: ''
    },
    keyState: {
      type: String,
      default: 'unknown'
    }
  },
  methods: {
    handleClick(){
      this.$emit('keyPress',this.letter)
    }
  }
}
</script>

<style scoped>
div {
  font-size: 2rem;
  background: lightblue;
  padding: 5px 10px;
  border-radius: 10px;
  height: 2rem;
  cursor: pointer;
}

.unknown{
  background: #247BA0;
  color: #d1d1d1;
}

.wrong{
  background: #d1d1d1;
  color: #247BA0;  
}


</style>