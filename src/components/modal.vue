<template>
<!-- Modal -->
    <div :id="id" class="modal fade" role="dialog">
        <div class="modal-dialog">
    
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <img src="assets/logo.png" style="hight:100;width:100">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">{{modalheader}}</h4>
                </div>
                <div class="modal-body">
                <div v-html="modaltext"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
  name: 'modal',
  data: function () {
      return {
        id:'myModal',
        modaltext:0,
        modalheader:1000
      }
    },
    methods: {
        display:function(header, text){
            this.modaltext = text;
            this.modalheader = header;
            $("#" + this.id).modal("show")
      }
    },
    created: function() {
        this.$parent.$on('showModal', this.display);
    }
}
</script>