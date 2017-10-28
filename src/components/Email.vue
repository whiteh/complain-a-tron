<template>
  <div>
    Excellent, we're making good progress.
    <br/><br/>
    Now, let's have your email address.
    <br/><br/>
    <input type="text" v-on:keydown="op" id="nameField">

    <button type="button" class="btn btn-info btn-lg" id="btnNext">Next >>></button>

    <br/><br/>
    Remember, your application is underway now. If you cancel we may need to reclaim our costs.

    </div>
</template>

<script>
export default {
  name: 'Email',
  data: function () {
      return {
        counter: 0,
      }
    },
    created: function () {
      // `this` points to the vm instance

    },
    methods: {
      
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
</style>
