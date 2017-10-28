<template>
    <span>
        <button type="button"  @mousedown="startpress" @click="next" class="btn btn-info btn-lg" id="btnNext">Next >>></button>
    </span>
</template>

<script>

import { EventBus } from './events.js';
import modal from '@/components/modal';

export default {
  name: 'stickyButton',
  data: function () {
      return {
        timer:0,
        longPress:1000
      }
    },
    methods: {
        startpress:function(){
          this.timer=new Date();
      },
      next:function(){
        var timeTaken = new Date()-this.timer;
        alert(timeTaken)
        if(timeTaken<this.longPress){
            EventBus.$emit('showModal', "Sorry!!", "We have been having some issues with the buttons.<br/><br/>Please press them a bit harder.");
        }else{
            this.$emit('click');
        }
      }
    },
    components: {
      modal: modal
    }

}

</script>