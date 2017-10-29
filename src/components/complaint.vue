<template>
  <div class="feedback">
    <textarea v-model="complaint"/>
    <button type="button" class="btn btn-info btn-lg" v-on:click="submit()">Submit</button>
    <clippy></clippy>
  </div>
</template>

<script>
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
      }
    },
    components: {
      clippy: clippy
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