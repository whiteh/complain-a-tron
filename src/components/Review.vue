<template>
  <div>
    All done, now let's check it.
    <br/><br/>
    
    Name : {{Name}}
<br/><br/>
Email : {{Email}}
<br/><br/>
Complaint : {{Complaint}}
<br/><br/>
    <stickyButton v-on:click="next()"></stickyButton>

    <br/><br/>
    Remember, your application is underway now. If you cancel we may need to reclaim our costs.

    </div>
</template>

<script>

import stickyButton from '@/components/stickyButton'
import modal from '@/components/modal'
import { EventBus } from './events.js';

import { mapGetters } from 'vuex'

export default {
  name: 'Review',
  data: function () {
      return {
        counter: 0
      }
    },
    computed: {
        ...mapGetters([
        'Name',
        'Email',
        'Complaint'
        ])
    },
    created: function () {


    },
    methods: {
      next:function(){
        this.$store.dispatch('SET_EMAIL', this.email)
        this.$router.push({name: 'Replicant'});

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
