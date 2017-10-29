<template>
  <div>
    Excellent, we're making good progress.
    <br/><br/>
    Now, let's have your email address.
    <br/><br/>
    <input type="text" v-model="email" id="nameField">
    <br/>
    <br/>
    <stickyButton v-on:click="back()" text="<<< Back"></stickyButton>
    <stickyButton v-on:click="next()"></stickyButton>


    <br/><br/>
    Remember, your application is underway now. If you cancel we may need to reclaim our costs.

    <modal></modal>
    <clippy></clippy>
    </div>
</template>

<script>

import stickyButton from '@/components/stickyButton'
import modal from '@/components/modal'
import { EventBus } from './events.js';
import clippy from '@/components/clippy'

import { mapState } from 'vuex'

export default {
  name: 'Email',
  data: function () {
      return {
        counter: 0,
        email:"",
        errorCount:0
      }
    },
    created: function () {
      setTimeout(function(){
          EventBus.$emit('speak', "Now, lets have your email address. That will be the address that people use to email you. You know, your friends and people like that");
      }, 2000)
      

    },
    methods: {
      next:function(){
        if(this.email==""){
          EventBus.$emit('showModal', "Error!!", "You've not even entered an email.<br/><br/> Please pay attention, this is very important.");
          EventBus.$emit('speak', "Come on, buddy. You need to enter an address. it will be like someone@somewhere.com");
    
          this.errorCount++;
          return false;
        }
        if(!this.validateEmail(this.email)||this.errorCount<5){
          EventBus.$emit('showModal', "Error!!", "That is not a valid email address.<br/><br/> Please pay attention when entering these details, they are very important.");
          if(!this.validateEmail(this.email)){
              EventBus.$emit('speak', "Come on, buddy. You need to enter an address. it will be like someone@somewhere.com");

          }else{
              EventBus.$emit('speak', "I'm not sure what's wrong with that one. Try clicking it again.");
          }
          
          this.errorCount++;
          return false;
        }
        if(this.errorCount<100){
          EventBus.$emit('showModal', "Error!!", "Ok, that email address has been accepted.<br/><br/> Please click next to continue.<br/><br/>Remember you must finish this entry at this point or you will be held personally responsible for wasting government time.");
          this.errorCount=999;
              EventBus.$emit('speak', "You did it!!! I knew you had it in you!");
          return false;
        }
        this.$store.dispatch('SET_EMAIL', this.email)
        this.$router.push({name: 'Complaint'});

      },
      validateEmail: function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      back: function(){
        this.$router.push({name: 'HelloWorld'});
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
