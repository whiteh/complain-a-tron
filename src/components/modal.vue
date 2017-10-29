<template>
<!-- Modal -->
    <div :id="id" class="modal fade" role="dialog">
        <div class="modal-dialog">
    
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <img src="assets/logo.png" style="hight:100;width:100">
                    <button type="button" class="close" data-dismiss="modal"  v-if="showButton">&times;</button>
                    <h4 class="modal-title">{{modalheader}}</h4>
                </div>
                <div class="modal-body">
                <div v-html="modaltext"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" v-if="showButton" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { EventBus } from './events.js';

export default {
  name: 'modal',
  data: function () {
      return {
        id:'myModal',
        modaltext:0,
        modalheader:1000,
        showButton:true
      }
    },
    mounted () {
        EventBus.$on("showModal", this.display);
        EventBus.$on("showLoadingScreen", this.showLoadingScreen);
      },
    methods: {
        display:function(header, text){
            this.showButton=true;
            this.modaltext = text;
            this.modalheader = header;
            $("#" + this.id).modal("show")
      },
      showLoadingScreen:function(targetPage){
          this.display("Loading...", 
          `We are currently loading the next page.<br/><br/>
          Please be patient<br/><br/>
          This might seem like it is taking a long time but a lot of work is going on in the background.`
          );
          this.showButton=false;
          var t = this;
          setTimeout(function(){
            $("#" + t.id).modal("hide");
            t.$router.push({name: targetPage});
          }, 7000)
      }
    }
}
</script>