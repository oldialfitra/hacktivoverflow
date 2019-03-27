<template>
  <div>
    <div class="vote">
      <div>
          <span>{{oneQuestion.comment.length}} </span>
          <span> Answer(s)</span>
      </div>
      <div v-if="currentVote===''">
        <button>
          <i class="fas fa-chevron-up" role="button" v-on:click="upvote(oneQuestion._id)"></i>
        </button>
        <span>{{oneQuestion.upvote.length - oneQuestion.downvote.length}}</span>
        <button>
          <i
            class="fas fa-chevron-up fa-rotate-180"
            role="button"
            v-on:click="downvote(oneQuestion._id)"
          ></i>
        </button>
      </div>
      <div v-if="currentVote==='upvote'">
        <button disabled>
          <i class="fas fa-chevron-up" role="button" v-on:click="upvote(oneQuestion._id)" disabled></i>
        </button>
        <span>{{oneQuestion.upvote.length - oneQuestion.downvote.length}}</span>
        <button>
          <i
            class="fas fa-chevron-up fa-rotate-180"
            role="button"
            v-on:click="downvote(oneQuestion._id)"
          ></i>
        </button>
      </div>
      <div v-if="currentVote==='downvote'">
        <button>
          <i class="fas fa-chevron-up" role="button" v-on:click="upvote(oneQuestion._id)"></i>
        </button>
        <span>{{oneQuestion.upvote.length - oneQuestion.downvote.length}}</span>
        <button disabled>
          <i
            class="fas fa-chevron-up fa-rotate-180"
            role="button"
            v-on:click="downvote(oneQuestion._id)"
            disabled
          ></i>
        </button>
      </div>
    </div>
    <div>
      <router-link :to="'/onequestion/' + oneQuestion._id">
        <a class="title" v-on:click.prevent="getOneQuestion(oneQuestion._id)">
          <h4>{{oneQuestion.title}}</h4>
        </a>
      </router-link>
    </div>
    <div class="description">
      <p v-html="oneQuestion.description"></p>
    </div>
    <div>
      <p>Posted By: {{oneQuestion.userId.email}}</p>
    </div>
    <div>
        <p>{{oneQuestion.createdAt}}</p>
    </div>
    <div class="option" v-if="this.$store.state.user.id===oneQuestion.userId._id">
      <router-link to="/">
        <a v-on:click.prevent="deleteQuestion(oneQuestion._id)" role="button" class="delete">
          <i class="far fa-trash-alt"></i>
        </a>
      </router-link>
      <router-link :to="'/updatequestion/' + oneQuestion._id">
        <a v-on:click="updateQuestion(oneQuestion._id)" class="update">
          <i class="fas fa-edit"></i>
        </a>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.title {
  border-bottom: 1px solid grey;
}
.description {
  background-color: lightgrey;
}
.icon-flipped {
  transform: scaleX(-1);
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -ms-transform: scaleX(-1);
}
.option {
  margin: 10px;
}

.delete {
  margin: 10px;
}

.update {
  margin: 10px;
}
</style>


<script>
export default {
  props: ["oneQuestion"],
  data() {
    return {
      currentUser: "",
      currentVote: "",
      currentUp: 0,
      currentDown: 0
    };
  },
  methods: {
    upvote(id) {
      axios
        .put(
          `http://localhost:5000/questions/upvote/${id}`,
          {
            userId: localStorage.getItem("id")
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(upvoted => {
          console.log(upvoted);
          for (let i = 0; i < upvoted.data.downvote.length; i++) {
            console.log(typeof upvoted.data.downvote[i]);
            console.log(typeof this.currentUser);
            if (upvoted.data.downvote[i] === this.currentUser) {
              this.currentVote = "upvote";
              break;
            }
          }
          console.log(this.currentVote);
          this.$store.dispatch("getAll");
          this.$router.push("/");
        })
        .catch(({ response }) => {
          Swal.fire({
            title: response.data.message,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    },
    downvote(id) {
      axios
        .put(
          `http://localhost:5000/questions/downvote/${id}`,
          {
            userId: localStorage.getItem("id")
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(downvoted => {
          //   console.log(downvoted);
          //   console.log(downvoted.data._id)
          this.currentUser = localStorage.getItem("id");
          for (let i = 0; i < downvoted.data.upvote.length; i++) {
            if (downvoted.data.upvote[i] === this.currentUser) {
              // console.log(downvoted.data.downvote[i], 'ini i')
              this.currentVote = "downvote";
              break;
            }
          }
          //   console.log(this.currentUser, 'ini current')
          console.log(this.currentVote);
          this.$store.dispatch("getAll");
          this.$router.push("/");
        })
        .catch(({ response }) => {
          Swal.fire({
            title: response.data.message,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    },
    getOneQuestion(id) {
      console.log("masuk ke one get");
      this.$store.dispatch("getOneQuestion", id);
    },
    deleteQuestion(id) {
      console.log("masuk ke delete");
      axios
        .delete(`http://localhost:5000/questions/${id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(response => {
          Swal.fire({
            type: "success",
            title: "Success delete",
            showConfirmButton: false,
            timer: 1500
          });
          this.$store.dispatch("getAll");
          this.$router.push("/");
        })
        .catch(({ response }) => {
          Swal.fire({
            title: response.data.message,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    },
    updateQuestion(id) {
      this.$store.dispatch("getOneQuestionUpdate", id);
    }
  },
  created() {
    this.currentUser = localStorage.getItem("id");
  }
};
</script>
