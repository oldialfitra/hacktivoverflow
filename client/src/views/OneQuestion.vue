<template>
  <div class="container">
    <div id="div1" class="well text-center">
      <div class="vote">
        <div v-if="currentVote===''">
          <button>
            <i
              class="fas fa-chevron-up"
              role="button"
              v-on:click="upvote(question.currentQuestion._id)"
            ></i>
          </button>
          <span>{{question.currentQuestion.upvote.length - question.currentQuestion.downvote.length}}</span>
          <button>
            <i
              class="fas fa-chevron-up fa-rotate-180"
              role="button"
              v-on:click="downvote(question.currentQuestion._id)"
            ></i>
          </button>
        </div>
        <div v-if="currentVote==='upvote'">
          <button disabled>
            <i
              class="fas fa-chevron-up"
              role="button"
              v-on:click="upvote(question.currentQuestion._id)"
              disabled
            ></i>
          </button>
          <span>{{question.currentQuestion.upvote.length - question.currentQuestion.downvote.length}}</span>
          <button>
            <i
              class="fas fa-chevron-up fa-rotate-180"
              role="button"
              v-on:click="downvote(question.currentQuestion._id)"
            ></i>
          </button>
        </div>
        <div v-if="currentVote==='downvote'">
          <button>
            <i
              class="fas fa-chevron-up"
              role="button"
              v-on:click="upvote(question.currentQuestion._id)"
            ></i>
          </button>
          <span>{{question.currentQuestion.upvote.length - question.currentQuestion.downvote.length}}</span>
          <button disabled>
            <i
              class="fas fa-chevron-up fa-rotate-180"
              role="button"
              v-on:click="downvote(question.currentQuestion._id)"
              disabled
            ></i>
          </button>
        </div>
      </div>
      <div id="div2" class="container">
        <div class="title">
          <h4>{{question.currentQuestion.title}}</h4>
        </div>
        <div class="description">
          <p v-html="question.currentQuestion.description"></p>
        </div>
        <div>
          <p>Posted By: {{question.currentQuestion.userId.email}}</p>
        </div>
        <div>
          <p>{{question.currentQuestion.createdAt}}</p>
        </div>
      </div>
    </div>
    <router-link :to="'/addanswer/' + question.currentQuestion._id">
      <a>Add Comment</a>
    </router-link>
    <h4 class="text-center">Answer</h4>
    <div v-for="item in question.currentQuestion.comment" :key="item._id">
      <div id="div1" class="well text-center">
        <Answer id="div2" class="container" :oneAnswer="item"></Answer>
      </div>
    </div>
  </div>
</template>

<style scoped>
#div1 {
  margin: 20px auto;
  padding: 10px 10px 0px 10px;
  border: 3px solid black;
  border-radius: 8px;
}
.title {
  border-bottom: 1px solid grey;
}
.description {
  background-color: lightgrey;
}
#div2 {
  margin: 0 auto;
}
</style>

<script>
// @ is an alias to /src
import Answer from "@/components/Answer.vue";
import { mapState } from "vuex";
export default {
  components: {
    Answer
  },
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
          `http://hacktivoverflow.oldialfitra.com/questions/upvote/${id}`,
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
          `http://hacktivoverflow.oldialfitra.com/questions/downvote/${id}`,
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
        .catch(({ response }) => {
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
  computed: mapState(["question"])
};
</script>
