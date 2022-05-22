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
 font-family: inherit;
    font-weight: bold;
    font-size: 1.2rem;
    border: 0;
    padding: 0;
    margin: 0 6px 0 0;
    height: 58px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    -webkit-tap-highlight-color: rgba(0,0,0,0.3);
}

.unknown{
  background: #d3d6da;
  color: #333;
}

.wrong{
  background: #787c7e;
  color: #eee;  
}

.contains{
  background: #ea9010;;
  color: #333;  
}

.green {
    color: #538d4e;
}

.yellow{
    color: #c9b458;
}

.grey{
    color: #787c7e;
}
.light-grey{
   color: #d3d6da;
}


</style>