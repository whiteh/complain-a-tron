<template>
  <div>
    <!-- subtleKeyChange will fire and return a correct/incorrect key 
          this will then get saved in complaint
     -->
    <input v-on:keypress="subtleKeyChange"
           v-on:keyup.delete="deleteText"
           type="text" 
           placeholder="Please log your complaint here"
    />
    <p>complaint: {{ messyComplaint }}</p>
    
    <br/>
    
    <br/>
    <button type="button" @click="clickCount" class="btn btn-info btn-lg" id="btnNext">Next >>></button>

  </div>
</template>

<script>
export default {
  name: "DodgyTextBox",
  data() {
    return {
      messyComplaint:  "",
      clickCounter: 0
    };
  },
  methods: {
    subtleKeyChange: function(e) {
      const keyChangeProb = Math.floor(Math.random() * (1 - 0 + 1)) + 1;
      const key = e.key;
      const random = e.charCode - 1;
      
      switch (keyChangeProb) {
        case 1:
          this.messyComplaint += key;
          break;
        case 2:
          this.messyComplaint += String.fromCharCode(random);
          break;
        default:
      }
    },
    deleteText: function(e) {
      this.messyComplaint = this.messyComplaint.slice(0, -1)
    },
    clickCount: function(e) {
      this.clickCounter++
      console.log(e, this.clickCounter)
      //find coords for submit button and move window each time user gets close 
    }
  }
};
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

input {
  width: 75%;
}
</style>