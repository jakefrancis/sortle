<template>
  <div>
    <input class="'tile" :class="{green: letter}" maxlength="1" v-model="char" @input="handleInput"/>
  </div>   
</template>

<script>
export default {
  props: {
    letter: {
        type: String,
        default: ' '
    },
    index: {
      type: Number,
    }
  },
  data() {
    return {
        char: this.letter
    };
  },
  computed: {
    },
    methods: {
      handleInput(){
        this.$emit('guess',this.char,this.index)
      },
    }
    
}
</script>

<style scoped>
div {
  max-height: 5rem;
  max-width: 5rem;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    line-height: 2rem;
    font-weight: bold;
    vertical-align: middle;
    box-sizing: border-box;
    text-transform: uppercase;
}
input{
  font-size: 2rem;
  text-align: center;
  width: 80%;
  height: 80%;
  text-transform: uppercase;
}

.green {
    color: #eee;
    background-color: #538d4e;
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