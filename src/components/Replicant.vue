<template>
  <div>
    <div v-if="showIntro">
      Ombudsman time is a resource that must be protected and one of the worst culprits for that is robots submitted fake complaints.<br/><br/>
      You have passed the previous robot tests but our analysis indicates that you may be the hardest form of robot to identify - a replicant.
      <br/><br/>
      We will, therefore, need you to undergo an additional test that will be interpreted using a Voight-Kampff machine.
      <br/><br/>
      If you fail or do not complete this test we will assume that you are a robot and will pass your details to all relevent authorities which may affect your freedom to access the internet.
      <br/><br/>
      <stickyButton v-on:click="start()" text="Start the Test >>>"></stickyButton>
    </div>
    <div v-if="showQuestions">
      {{question}}
      <ul id="example-1">
          <li v-for="answer in answers">
              <stickyButton v-on:click="nextQ()" :text="answer.answer"></stickyButton><br/><br/>
          </li>
      </ul>
    </div>
    <div v-if="showResults">
      The results are being calculated...
      
    </div>
    <div>
      <canvas id="foo"></canvas>
    </div>
    <div v-if="showResultsString">
      You have been determined to be human. Thank you for completing the test.

      <br/><br/>
      You may now complete the process to lodge your complaints<br/><br/>
      <stickyButton v-on:click="next()" text="Send Complaint >>>"></stickyButton>
    </div>

    <clippy></clippy>    
    <modal></modal>

  </div>
</template>

<script>

import stickyButton from '@/components/stickyButton'
import modal from '@/components/modal'
import { EventBus } from './events.js';
import clippy from '@/components/clippy'

import questions from '@/components/data/questions.json'

export default {
  name: 'Replicant',
  data: function () {
      return {
        questionNumber:0,
        questionCount: 0,
        question: "",
        answers:[],
        showQuestions:false,
        showIntro:true,
        showResults:false,
        showResultsString: false
      }
    },
    created: function () {
      setTimeout(function(){
          EventBus.$emit('speak', "I'm pretty sure you're not a robot but better safe than sorry. Come on, you can do it buddy.");
      }, 3000)
    },
    methods: {
      next:function(){
        EventBus.$emit('showLoadingScreen', "finish");

      },
      start:function(){
          this.showQuestions=true;
          this.showIntro=false;
          this.question = questions[this.questionNumber].question;
          this.answers = questions[this.questionNumber].answers;
      },
      nextQ:function(){
        this.questionNumber++;
        if(this.questionNumber<questions.length){
          this.question = questions[this.questionNumber].question;
          this.answers = questions[this.questionNumber].answers;
        }else{
          this.showQuestions=false;
          this.showResults=true;
          this.showGauge();
          var t = this;
          setTimeout(function(){
            t.showResultsString=true;
            EventBus.$emit('speak', "I knew it. Well done. This is in the bag now!!");

            }, 4000)
        }
      },
      showGauge:function(){
        var opts = {
            angle: 0.15, // The span of the gauge arc
            lineWidth: 0.15, // The line thickness
            radiusScale: 0.9, // Relative radius
            pointer: {
              length: 0.64, // // Relative to gauge radius
              strokeWidth: 0.035, // The thickness
              color: '#000000' // Fill color
            },
            limitMax: false,     // If false, max value increases automatically if value > maxValue
            limitMin: false,     // If true, the min value of the gauge will be fixed
            colorStart: 'red',   // Colors
            colorStop: 'green',    // just experiment with them
            strokeColor: 'red',  // to see which ones work best for you
            generateGradient: true,
            highDpiSupport: true     // High resolution support
          };
          var target = document.getElementById('foo'); // your canvas element
          var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
          gauge.maxValue = 1000; // set max gauge value
          gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
          gauge.animationSpeed = 23; // set animation speed (32 is default value)
          gauge.set(Math.random() * (1000 - 800) + 800); // set actual value
      }
    },
    components: {
      clippy: clippy,
      stickyButton: stickyButton,
      modal: modal
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
