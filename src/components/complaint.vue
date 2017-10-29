<template>
  <div class="feedback">
    <div>
      OK, now we know all about you, we need to know your problems.
      <br/><br/>
      Please complete all the of the problem you want to share in the form below in as much detail as possible.
      <br/><br/>
      Don't worry, you are not alone. "Mona" the paperclip will be there to help you all the way.
      <br/>
      <br/>
    </div>
    <div>
      <textarea v-model="complaint" v-on:keyup="checkLength" cols="10" rows="8"/>
    </div>
    <stickyButton v-on:click="back()" text="<<< Back"></stickyButton>
    <stickyButton v-on:click="next()"></stickyButton>
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
    data () {
      return {
        complaint: "",
        prechangedComplaint:"",
        lengthWarningIssued:false,
        suggestionChanged: false,
        validationComplete: false
      }
    },
    computed: {
        ...mapGetters([
        'Suggestions'
        ])
    },
    methods: {
      checkLength: function(){

        if(this.complaint.length>100 &&! this.lengthWarningIssued){
          EventBus.$emit('showModal', "Warning!!", "Not too long please. Remember somebody has to read this and they don't have all day just to focus on these complaints.");
          this.lengthWarningIssued=true;
        }
        if(this.complaint.length<100 && this.lengthWarningIssued){
          this.lengthWarningIssued=false;
        }
      },
      next:function(){
        if(!this.validationComplete){
          if(!this.suggestionChanged){
            EventBus.$emit("checkForSuggestions", this.complaint);

            EventBus.$emit('showModal', "Warning!!", "Mona the Paperclip thinks that you meant to put <br/><br/><i>" + this.Suggestions + "</i><br/><br/>We will automatically update that for you. <br/><br/>If want to change back just type 'No thanks Mona' in the box and we will put it back.");
            this.prechangedComplaint = this.complaint;
            this.complaint = this.Suggestions;
            this.suggestionChanged = true;
          }
          this.validationComplete = true;
        }else{
          if(this.complaint.toLowerCase()=="no thanks mona"){
            this.complaint = this.prechangedComplaint;
          }
          this.$store.dispatch('SET_COMPLAINT', this.complaint)
          this.$router.push({name: 'Review'});

        }

      },
      back: function(){
        this.$router.push({name: 'Email'});
      }
    },
    components: {
      clippy: clippy,
      stickyButton: stickyButton,
      modal: modal
    }
  }
</script>

<style scoped>
button {
  display: inline-block;
}
textarea {
  display: inline-block;
  width: 50%;
}
</style>