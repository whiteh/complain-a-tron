<template>
  <div>
    Excellent, we're making good progress.
    <br/><br/>
    Now, let's have your email address.
    <br/><br/>
    <input type="text" v-on:keydown="op" id="nameField">

    <stickyButton v-on:click="next()"></stickyButton>

    <br/><br/>
    Remember, your application is underway now. If you cancel we may need to reclaim our costs.

    </div>
</template>

<script>

import stickyButton from '@/components/stickyButton'
import modal from '@/components/modal'
import { EventBus } from './events.js';

export default {
  name: 'Email',
  data: function () {
      return {
        counter: 0,
      }
    },
    created: function () {
      EventBus.$emit('speak', "Now, lets have your email address. That will be the address that people use to email you. You know, your friends and people like that");

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
