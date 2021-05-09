<template>
  <div id="wrapper">
      home
      <button @click="LandingPage">landing page</button>
  </div>
</template>

<script>
console.log('home');
export default {
    name: 'home',
    // components: { SystemInformation },
    data () {
        return {
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
