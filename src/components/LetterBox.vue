<template>
  <div :class="color">
    {{ letter }}
  </div>
</template>

<script>
export default {
  props: {
    letter: {
        type: String,
        default: ' '
    },
    letterState :  {
        type: String,
        default: ''
    }

  },
  data() {
    return {
        
    };
  },
  computed: {
        color: function(){
           
            if(this.letterState === 'match'){
                return 'green'
            }
            else if(this.letterState === 'contains'){
                return 'yellow'
            }
            else{
                return 'grey'
            }
            
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