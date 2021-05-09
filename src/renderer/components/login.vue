<template>
  <div id="wrapper">
      login
      <div>mac: {{mac}}</div>
      <button @click="LandingPage">landing page</button>
  </div>
</template>

<script>
import {getMAC} from '../lib/util';
// import {net} from 'electron';

export default {
    name: 'login',
    // components: { SystemInformation },
    data () {
        return {
            mac: getMAC()
        };
    },
    methods: {
        LandingPage () {
            this.$router.push({name: 'landing-page'});
        }
    }
};
</script>

<style>
</style>
