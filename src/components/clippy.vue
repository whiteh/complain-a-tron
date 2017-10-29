<template>
  <div class="clippy">
  </div>
</template>

<script>
import { EventBus } from './events.js';

export default {
    name: 'clippy',
    data () {
        return {
          synth: window.speechSynthesis || null
        };
      },
      mounted () {
        this.selectHelper();
        EventBus.$on("speak", this.speak);
        EventBus.$on("checkForSuggestions", this.suggestionFromText);
        EventBus.$on("please", ()=>{this.please()});
        EventBus.$on("suggest", ()=>{this.suggestion()});
        EventBus.$on("alert", ()=>{this.agent.play("GetAttention")});
        //console.log(this.suggestionFromText("Your product sucks. It's terrible."));
      },
      methods: {
        showHelper (helper) {
          var self = this;
          helper = helper || this.selectedHelper;
          clippy.load(helper, function(agent){
              // do anything with the loaded agent
              agent.show();
              self.selectedHelper = helper;
              self.agent = agent;

              // gesture at a given point (if gesture animation is available)
              console.log(agent.animations());

          });      
        },
        selectHelper () {
          const agents = ['Clippy'],
                index  = Math.floor(Math.random() * agents.length);
          this.showHelper(agents[index]);
        },
        // Actions
        please () {
          this.speak("You didn't say the magic word...");
        },
        speak (text) {
          this.agent.speak(text);
        },
        suggestion() {
          const suggestions = [
            'Have you considered using allcaps?',
            'Have you tried Googling the problem?',
            'Do any of your friends have this issue?  Maybe it\'s just you...'
          ],
          index = Math.floor(Math.random() * suggestions.length);
          this.speak(suggestions[index]);
        },
        suggestionFromText(text) {
          var doc= nlp(text),
              sentences = doc.sentences(),
              suggestion = doc.sentences().toNegative().random(1).out("text").trim();
              this.speak('Did you mean \''+suggestion+'\'?');
        },
        speak(message) {
          if (this.synth) { 
            var utterThis = new SpeechSynthesisUtterance(message);
            this.synth.speak(utterThis);
          }
          this.agent.speak(message);
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
