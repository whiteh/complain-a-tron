<template>
  <div>
    We have now collected the details we need to complete your complaint.
    <br/><br/>
    Please check the details below before submitting them.
    <br/><br/>
    
    Name : {{Name}}
    <br/><br/>
    Email : {{Email}}
    <br/><br/>
    Complaint : {{Complaint}}
    <br/><br/>

    <stickyButton v-on:click="back()" text="<<< Back"></stickyButton>
    <stickyButton v-on:click="next()"></stickyButton>

    <br/><br/>
    Remember, your application is underway now. If you cancel we may need to reclaim our costs.
      <clippy></clippy>
      <modal></modal>
    </div>
</template>

<script>

import stickyButton from '@/components/stickyButton'
import modal from '@/components/modal'
import { EventBus } from './events.js';
import clippy from '@/components/clippy'

import { mapGetters } from 'vuex'

export default {
  name: 'Review',
  data: function () {
      return {
        counter: 0,
        warningIssued: false
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
      setTimeout(function(){
          EventBus.$emit('speak', "Please check your data very carefully, these guys get very annoyed if it is wrong!!");
      }, 3000)
    },
    methods: {
      next:function(){
        if(!this.warningIssued){
          EventBus.$emit('showModal', "Warning!!", "Please check this properly.<br/><br/>The amount of time we waste having to deal with rubbish submissions really does beggar belief.<br/><br/>If it is wrong will will get back to you about the cost of the wasted time.");
          EventBus.$emit('speak', "They are serious about this. Please do check very carefully.");
          this.warningIssued=true
        }else{
          EventBus.$emit('showLoadingScreen', "Replicant");
        }
        

      },
      back: function(){
        EventBus.$emit('showLoadingScreen', "Complaint");
      }
    },
    components: {
      clippy: clippy,
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
