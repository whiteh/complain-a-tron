<template>
  <div class="clippy">
  </div>
</template>

<script>
import { EventBus } from './events.js';
EventBus.$on("test", function(){console.log("test fired");});
export default {
    name: 'clippy',
    data () {
        return {};
      },
      mounted () {
        this.selectHelper();
        EventBus.$emit("test")
      },
      methods: {
        showHelper (helper) {
          var self = this;
          helper = helper || this.selectedHelper;
          clippy.load(helper, function(agent){
              // do anything with the loaded agent
              agent.show();
              agent.speak("This is a test");
              self.selectedHelper = helper;
              self.agent = agent;

              // gesture at a given point (if gesture animation is available)
              agent.gestureAt(200,200);
          });      
        },
        selectHelper () {
          const agents = ['Merlin', 'Clippy', 'Rover', 'Links'],
                index  = Math.floor(Math.random() * agents.length);
          this.showHelper(agents[index]);
        }
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
