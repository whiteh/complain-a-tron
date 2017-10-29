<template>
    <span>
        <button type="button"  @mousedown="startpress" @click="next" class="btn btn-info btn-lg" id="btnNext">{{text}} </button>
    </span>
</template>

<script>

import { EventBus } from './events.js';
import modal from '@/components/modal';

export default {
  name: 'stickyButton',
  props:{'text':{default:"Next >>>"}},
  data: function () {
      return {
        timer:0,
        longPress:50
      }
    },
    methods: {
        startpress:function(){
          this.timer=new Date();
      },
      next:function(){
        var timeTaken = new Date()-this.timer;
        var lp = Math.floor(Math.random() * this.longPress)
        if(timeTaken<lp){
            EventBus.$emit('showModal', "Sorry!!", "We have been having some issues with the buttons.<br/><br/>Please press them a bit harder.");
            EventBus.$emit('speak', "Oh, those stupid buttons. Press that mouse down really hard and you'll be away.");

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