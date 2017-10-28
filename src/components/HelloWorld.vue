<template>
  <div>
     <div v-if="captchaPassed === true">
      So you want to make a complaint... 
      <br/><br/>
      Let's make this nice and easy...
      <br/><br/>
      First enter your name.
      <br/><br/>
      <input type="text" v-bind:value="name" v-on:keydown="op" id="nameField">
      <span style="color:red">{{errormessage}}</span>
      <stickyButton v-on:click="next()"></stickyButton>
    </div>
    <modal></modal>
    <recaptcha></recaptcha>
    <clippy></clippy>
            
    </div>
</template>

<script>

import clippy from '@/components/clippy'
import recaptcha from '@/components/recaptcha'
import stickyButton from '@/components/stickyButton'
import modal from '@/components/modal'
import { EventBus } from './events.js';

export default {
  name: 'HelloWorld',
  data: function () {
      return {
        captchaPassed: false,
        counter: 0,
        errorcount:0,
        errormessage:"",
        annoyingintro:[
          {header:"Welcome to Complaint-a-tron", 
          text:`
            <div>This form uses the revolutionary new Complain-a-tron technology</div>
            <div>
              Complain-a-tron has taken years of research to optimise the completion of complaint gathering.
            </div>
            <div>
              We will help you every step of the way to ensure that completing this form is a pleasant experience.
            </div>
          `
        },
        {header:"Welcome to Complaint-a-tron", 
          text:`
            <div>As you carry on filling in the form. Keep your eyes peeled for "Mona" our on page helper.</div>
            <div>"Mona" will always be ready with helpful hints</div>
          `
        },
        {header:"Welcome to Complaint-a-tron", 
          text:`
            <div>Watch out for robots</div>
            <div>For safety and security purposes we will be constantly scanning for robot activity you may be asked to validate that youb are not a robot</div>
          `
        },
        {header:"Welcome to Complaint-a-tron", 
          text:`
            <div>!! WARNING!!!!</div>
            <div>This is a serious process. Any partially completed forms will be regarded as a waste of government time which you may be charged for.</div>
            <div>We may contact the authorities to re-capture wasted costs of this type</div>
          `
        }
        ],
        modaltext:"",
        modalheader:""
      }
    },
    created: function () {
      var self = this;
      // `this` points to the vm instance
      this.suggestion();

      EventBus.$on('captchaPassed', () => {self.setCaptchaState(true)});
      EventBus.$on('captchaReset', () => {self.setCaptchaState(false)});

    },
    methods: {
      op:function(e){
        if(this.counter<this.annoyingintro.length){
          this.modal(this.annoyingintro[this.counter].header, this.annoyingintro[this.counter].text);
          this.counter++;
          $("#myModal").on('hidden.bs.modal', function () {
            $("#nameField").focus();
          });
          $("#myModal").on('show.bs.modal', function () {
            $("#nameField").blur();
          });
          return false;
        }
      },
      modal: function(header, text){
        EventBus.$emit('showModal', header, text);
      },
      startpress:function(){
          this.timer=new Date();
      },
      next:function(){
          switch(this.errorcount){
            case 0:
              this.errormessage="*"
              EventBus.$emit('speak', "check your work, dude");
              break;
            case 1:
              this.modal("Error!!!","Please check you have actually entered your name.<br/><br/>A error was quite clearly indicated<br/><br/>It is important you pay attention when errors happen.<br/><br/>");
              break;
            case 2:
              this.modal("Thank you.", "Excellent. Your name - " + this.name + " - will now be validated against all names to check your legitimacy");
              break;
            default:

          }
          this.errorcount++;

          //this.$router.push({name: 'Email'});

      },
      suggestion () {
        const self = this,
              interval = Math.floor(Math.random() * 100000) + 3000;
        this.interval = setInterval(function() { 
          clearInterval(self.interval);
          EventBus.$emit("suggest");
          self.suggestion() }, interval);
        
      },
      setCaptchaState (state) {
        this.captchaPassed = state;
      }

    },
    components: {
      clippy: clippy,
      stickyButton: stickyButton,
      recaptcha: recaptcha,
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
