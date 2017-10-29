<template>
  <div>
    <div v-if="showIntro">
      We have to test you again
      <br/><br/>
      <stickyButton v-on:click="start()" text="Start the Test"></stickyButton>
    </div>
    <div v-if="showQuestions">
      {{question}}
      <ul id="example-1">
          <li v-for="answer in answers">
              <stickyButton v-on:click="nextQ()" :text="answer.answer"></stickyButton>
          </li>
      </ul>
    </div>
    <div v-if="showResults">
      The results are being calculated...
      
    </div>
    <div>
      <canvas id="foo"></canvas>
    </div>
    <div v-if="showResults">
      You have been determined to be human. Thank you for completing the test.

      <br/><br/>
      <stickyButton v-on:click="next()" text="Next"></stickyButton>
    </div>
  </div>
</template>

<script>

import stickyButton from '@/components/stickyButton'
import modal from '@/components/modal'
import { EventBus } from './events.js';

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
        showResults:false
      }
    },
    created: function () {
    },
    methods: {
      next:function(){
        this.$router.push({name: 'Review'});

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
