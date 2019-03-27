<template>
  <div class="wrapper fadeInDown">
    <div id="formContent">
      <!-- Tabs Titles -->

      <!-- Icon -->
      <div class="fadeIn first">
        <span class="login">Register</span>
      </div>

      <!-- Login Form -->
      <form v-on:submit.prevent="registerUser">
        <input
          type="email"
          id="login"
          class="fadeIn second"
          name="login"
          placeholder="login"
          v-model="email"
        >
        <input
          type="password"
          id="password"
          class="fadeIn third"
          name="login"
          placeholder="password"
          v-model="password"
        >
        <input type="submit" class="fadeIn fourth" value="Register">
      </form>

      <!-- Remind Passowrd -->
      <div id="formFooter">
        <router-link to="/login">
          <a class="underlineHover">Already have an account?</a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/formSign.css";
</style>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    registerUser() {
      this.$emit("register-user", [this.email, this.password]);
      this.email = ''
      this.password = ''
    }
  }
};
</script>
