<template>
  <div>
    <div class="vote">
      <div v-if="currentVote===''">
        <button>
          <i class="fas fa-chevron-up" role="button" v-on:click="upvote(oneAnswer._id)"></i>
        </button>
        <span>{{oneAnswer.upvote.length - oneAnswer.downvote.length}}</span>
        <button>
          <i
            class="fas fa-chevron-up fa-rotate-180"
            role="button"
            v-on:click="downvote(oneAnswer._id)"
          ></i>
        </button>
      </div>
      <div v-if="currentVote==='upvote'">
        <button disabled>
          <i class="fas fa-chevron-up" role="button" v-on:click="upvote(oneAnswer._id)" disabled></i>
        </button>
        <span>{{oneAnswer.upvote.length - oneAnswer.downvote.length}}</span>
        <button>
          <i
            class="fas fa-chevron-up fa-rotate-180"
            role="button"
            v-on:click="downvote(oneAnswer._id)"
          ></i>
        </button>
      </div>
      <div v-if="currentVote==='downvote'">
        <button>
          <i class="fas fa-chevron-up" role="button" v-on:click="upvote(oneAnswer._id)"></i>
        </button>
        <span>{{oneAnswer.upvote.length - oneAnswer.downvote.length}}</span>
        <button disabled>
          <i
            class="fas fa-chevron-up fa-rotate-180"
            role="button"
            v-on:click="downvote(oneAnswer._id)"
            disabled
          ></i>
        </button>
      </div>
    </div>
    <div class="title">
      <h4>{{oneAnswer.title}}</h4>
    </div>
    <div class="description">
      <p v-html="oneAnswer.description"></p>
    </div>
    <div>
        <p>{{oneAnswer.createdAt}}</p>
    </div>
    <div class="option" v-if="oneAnswer.userId===this.$store.state.user.id">
      <router-link :to="'/onequestion/' + this.$store.state.user.id">
        <a v-on:click.prevent="deleteAnswer(oneAnswer._id)" role="button" class="delete">
          <i class="far fa-trash-alt"></i>
        </a>
      </router-link>
      <router-link :to="'/updateanswer/' + oneAnswer._id">
        <a v-on:click="updateAnswer(oneAnswer._id)" class="update">
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
  props: ["oneAnswer"],
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
          `http://hacktivoverflow.oldialfitra.com/answers/upvote/${id}`,
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
          this.$store.dispatch(
            "getOneQuestion",
            this.$store.state.question.currentQuestion._id
          );
        })
        .catch(err => {

          console.log(err);
        });
    },
    downvote(id) {
      axios
        .put(
          `http://hacktivoverflow.oldialfitra.com/answers/downvote/${id}`,
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
          this.currentUser = localStorage.getItem("id");
          for (let i = 0; i < upvoted.data.downvote.length; i++) {
            if (upvoted.data.downvote[i] === this.currentUser) {
              this.currentVote = "downvote";
              break;
            }
          }
          this.$store.dispatch(
            "getOneQuestion",
            this.$store.state.question.currentQuestion._id
          );
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
    },
    deleteAnswer(id) {
      console.log(id);
      axios
        .delete(`http://hacktivoverflow.oldialfitra.com/answers/${id}`, {
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
    },
    updateAnswer(id) {
        this.$store.dispatch('getOneAnswer', id)
    }
  }
};
</script>
