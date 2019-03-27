<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view @logged-in="login" @register-user="register" @add-question="addQuestion"></router-view>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import Navbar from "@/components/Navbar.vue";
import { mapState } from "vuex";
export default {
  components: {
    Navbar
  },
  methods: {
    login(payload) {
      axios
        .post("http://localhost:5000/users/login", {
          email: payload[0],
          password: payload[1]
        })
        .then(({ data }) => {
          Swal.fire({
            type: "success",
            title: "Logged in",
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.id);
          let id = localStorage.getItem("id");
          this.$store.dispatch("login", id);
          console.log(this.$store.state.user.isLogin);
          this.$router.push("/");
        })
        .catch(({response}) => {
          Swal.fire({
            title: response.data.message,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
          console.log(err);
        });
    },
    register(payload) {
      axios
        .post("http://localhost:5000/users/register", {
          email: payload[0],
          password: payload[1]
        })
        .then(newUser => {
          Swal.fire({
            type: "success",
            title: "Register success",
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push("/login");
        })
        .catch(({response}) => {
          Swal.fire({
            type: 'error',
            title: response.data.message,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
          console.log(err);
        });
    },
    addQuestion(payload) {
      axios
        .post(
          "http://localhost:5000/questions",
          {
            title: payload[0],
            description: payload[1],
            userId: localStorage.getItem("id")
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(newPost => {
          Swal.fire({
            type: "success",
            title: "Success added new Question",
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push("/");
        })
        .catch(({response}) => {
          Swal.fire({
            title: response.data.message,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      let id = localStorage.getItem("id");
      this.$store.dispatch("login", id);
    }
    console.log(this.$store.state.user.isLogin);
  },
  computed: mapState(["user"])
};
</script>

