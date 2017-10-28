Vue.component('annoyingbox', {
    template: `
    <div>
        Name : <input type="text" v-on:keydown="op" id="nameField">
        <!-- Modal -->
        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
        
              <!-- Modal content-->
              <div class="modal-content">
                  <div class="modal-header">
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
    </div>
    `,
    data: function () {
      return {
        counter: 0,
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
          this.modaltext = this.annoyingintro[this.counter].text;
          this.modalheader = this.annoyingintro[this.counter].header;
          this.counter++;
          $("#myModal").on('hidden.bs.modal', function () {
            $("#nameField").focus();
          });
          $("#myModal").on('show.bs.modal', function () {
            $("#nameField").blur();
          });
          $("#myModal").modal("show")
          return false;
        }
      },
      incrementCounter: function () {
        this.counter += 1
        this.$emit('until')
      }
    }
})