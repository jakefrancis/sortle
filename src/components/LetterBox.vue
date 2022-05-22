<template>
  <div>
    <input v-model="char" @input="handleInput"/>
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
input {
  font-size: 2rem;
  background: lightblue;
  padding: 5px 10px;
  border-radius: 10px;
  width: 1rem;
  height: 2rem;
}

.green {
    color: #388659;
}

.yellow{
    color: #ea9010;
}

.grey{
    color: #1d201f;
}
.light-grey{
   color: #d1d1d1;
}
</style>