<template>
  <div>
    Excellent, we're making good progress.
    <br/><br/>
    Now, shall we hear the complaint.
    <br/><br/>
    <input type="text" v-model="complaint" id="nameField">

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
  name: 'Complaint',
  data: function () {
      return {
        counter: 0,
        complaint:""
      }
    },
    created: function () {
      EventBus.$emit('speak', "Now, lets have your email address. That will be the address that people use to email you. You know, your friends and people like that");

    },
    methods: {
      next:function(){
        this.$store.dispatch('SET_COMPLAINT', this.complaint)
        this.$router.push({name: 'Review'});

      }
    },
    components: {
      stickyButton: stickyButton,
      modal: modal
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
