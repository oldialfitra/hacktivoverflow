<template>
  <div class="container">
    <h1 class="text-center">All Question</h1>
    <div v-for="item in question.allQuestions" :key="item._id">
      <div id="div1" class="well text-center">
        <Question id="div2" class="container" :oneQuestion="item"></Question>
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

#div2 {
  margin: 0 auto;
}
</style>

<script>
// @ is an alias to /src
import Question from "@/components/Question.vue";
import { mapState } from "vuex";
export default {
  name: "home",
  components: {
    Question
  },
  mounted() {
    this.$store.dispatch("getAll");
  },
  computed: mapState(["question"])
};
</script>
