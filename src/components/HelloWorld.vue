<template>
  <div>
    So you want to make a complaint... 
    <br/><br/>
    Let's make this nice and easy...
    <br/><br/>
    First enter your name.
    <br/><br/>
    <input type="text" v-bind:value="name" v-on:keydown="op" id="nameField">
    <span style="color:red">{{errormessage}}</span>
    <button type="button"  @mousedown="startpress" @click="next" class="btn btn-info btn-lg" id="btnNext">Next >>></button>
    <sticky_button></sticky_button>
        <!-- Modal -->
        <div id="myModal" class="modal fade" role="dialog">
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
        <clippy></clippy>
    </div>
</template>

<script>

import clippy from '@/components/clippy'
import sticky_button from '@/components/stickyButton'

export default {
  name: 'HelloWorld',
  data: function () {
      return {
        counter: 10,
        timer:0,
        longPress:1000,
        errorcount:0,
        name:"peter",
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
      // `this` points to the vm instance

    },
    methods: {
      op:function(e){
        if(this.counter<this.annoyingintro.length){
          this.modal(this.annoyingintro[this.counter].header,this.annoyingintro[this.counter].text);
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
        this.modaltext = text;
        this.modalheader = header;
        
        $("#myModal").modal("show")
      },
      startpress:function(){
          this.timer=new Date();
      },
      next:function(){
        var timeTaken = new Date()-this.timer;
        if(timeTaken<this.longPress){
          this.modal("Sorry!!", "We have been having some issues with the buttons.<br/><br/>Please press them a bit harder.")
        }else{
          this.longPress=false;
          switch(this.errorcount){
            case 0:
              this.errormessage="*"
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
        }
        
        
        //this.$router.push({name: 'Email'});
        
        
      }
    },
    components: {
      clippy: clippy
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
