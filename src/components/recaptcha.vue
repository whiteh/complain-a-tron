<template>
  <div class="captcha">
    <div v-if="showText">
      Sorry about this but we need to check that you are not a robot.<br/><br/>
      Please complete the details requested below.
      <br/><br/>
      We take the issue of robots very seriously and any robots detected or who leave during the test will be reported to the authorities and may find their internet usage limited in future.
      <br/><br/>
    </div>
    <vue-recaptcha class="recaptcha" ref="recaptcha" :sitekey="captcha_key" @verify="onVerify"></vue-recaptcha>
    <div v-if="time>0" class="count">{{ time }}</div>
  </div>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';
  import { EventBus } from './events.js';

  /*setInterval(() => {
        self.reset()
      }, 10000);*/

  export default {
    data () {
      return {
        time: 0,
        interval: null,
        number_of_resets: 1,
        captcha_key: process.env.CAPTCHA_KEY,
        showText: true
      }
    },
    methods: {
      reset () {
        this.$refs.recaptcha.reset()
        this.number_of_resets+=1;
        EventBus.$emit("captchaReset");
        this.showText=true;
      },
      onVerify: function (response) {
        var rand = Math.floor(Math.random() * 5);

        if (rand === 1) {
          this.reset()
          EventBus.$emit("speak", "Sorry, you failed the test.  We don't believe you're human.  Please try again...")
          return;
        }
        EventBus.$emit("captchaPassed");
        this.showText=false
        this.time = Math.ceil(20 * (this.number_of_resets));
        clearInterval(this.interval);
        this.interval = setTimeout(this.updateCount, 1000);
      },
      updateCount() {
        this.time -= 1;
        if (this.time === 0) {
          EventBus.$emit("speak", "You've taken too long to submit the form.  Are you still human?")
          this.reset();
          clearInterval(this.interval);
          this.interval = null;
        } else {
          this.interval = setTimeout(this.updateCount, 1000);
        }
      }
    },
    components: { VueRecaptcha }
  };
</script>
<style scoped>
div.captcha {
  text-align: center;
  margin: auto;
  width: 100%;
}
div.captcha div.recaptcha {
  padding-left:40%;
}
div.count {
  font-size:24pt;
  color: green;
}
</style>