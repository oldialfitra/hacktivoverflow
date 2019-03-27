<template>
  <div class="wrapper fadeInDown">
    <div id="formContent">
      <!-- Tabs Titles -->

      <!-- Icon -->
      <div class="fadeIn first">
        <span class="login">Login</span>
      </div>

      <!-- Login Form -->
      <form v-on:submit.prevent="loginUser">
        <input
          type="email"
          id="login"
          class="fadeIn second"
          name="login"
          placeholder="email"
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
        <input type="submit" class="fadeIn fourth" value="Log In">
      </form>

      <!-- Remind Passowrd -->
      <div id="formFooter">
        <router-link to="/register">
          <a class="underlineHover">Need new account?</a>
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
    loginUser() {
      this.$emit("logged-in", [this.email, this.password]);
      this.email = "";
      this.password = "";
    }
  }
};
</script>
