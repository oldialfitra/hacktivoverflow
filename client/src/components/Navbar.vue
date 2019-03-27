<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <button class="navbar-toggler" data-toggle="collapse" data-target="collapse_target">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapse_target">
      <router-link to="/">
        <a class="navbar-brand">
          <i class="fab fa-stack-overflow"></i> HackOverflow
        </a>
      </router-link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/">
            <a class="nav-link">Forum</a>
          </router-link>
        </li>
        <li class="nav-item" v-if="this.$store.state.user.isLogin===true">
          <router-link to="/addQuestion">
            <a class="nav-link">Ask Question</a>
          </router-link>
        </li>
        <li class="nav-item" v-if="this.$store.state.user.isLogin===false">
          <router-link to="/login">
            <a class="nav-link">Login</a>
          </router-link>
        </li>
        <li class="nav-item" v-if="this.$store.state.user.isLogin===true">
          <router-link to>
            <a class="nav-link" v-on:click.prevent="logout">Logout</a>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    logout() {
      console.log("logout");
      localStorage.clear();
      this.$store.dispatch("logout");
      console.log(this.$store.state.user.isLogin);
      this.$router.push("/login");
    }
  }
};
</script>
