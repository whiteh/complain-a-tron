<template>
  <div class="feedback">
    <textarea v-model="complaint"/>
    <button type="button" class="btn btn-info btn-lg" v-on:click="submit()">Submit</button>
    <stickyButton v-on:click="next()"></stickyButton>
    <clippy></clippy>
  </div>
</template>

<script>
  import stickyButton from '@/components/stickyButton'
  import modal from '@/components/modal'
  import { EventBus } from './events.js';
  import clippy from '@/components/clippy'
  export default {
    data () {
      return {
        complaint: ""
      }
    },
    methods: {
      submit () {
        EventBus.$emit("checkForSuggestions", this.complaint);
      },
      next:function(){
        this.$store.dispatch('SET_COMPLAINT', this.complaint)
        this.$router.push({name: 'Review'});

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
  width: 100%;
}
</style>