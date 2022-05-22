<template>
  <div tabindex="0" @click="handleClick" @keyup.enter="handleClick" :class='keyState'>
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
      this.$emit('keyPress',this.letter,this.keyState)
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
  user-select: none;
}

.unknown{
  background: #247BA0;
  color: #d1d1d1;
}

.wrong{
  background: #d1d1d1;
  color: #247BA0;  
}

.contains{
  background: #ea9010;;
  color: #333;  
}


</style>