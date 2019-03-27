<template>
  <div class="container">
    <h1 class="text-center">Comment this post</h1>
    <div id="div1" class="well text-center">
      <form v-on:submit.prevent="addComment">
        <div class="form-group">
          <label for="formGroupExampleInput">Title</label>
          <input
            type="text"
            class="form-control text-center"
            id="formGroupExampleInput"
            v-model="title"
          >
        </div>
        <div class="form-group" id="add">
          <label for="formGroupExampleInput2">Description</label>
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        </div>
        <input type="submit" value="Submit">
      </form>
      <!-- <div id="add">
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
#div1 {
  margin: 20px auto;
  padding: 10px 10px 10px 10px;
  border: 3px solid black;
  border-radius: 8px;
}

#div2 {
  margin: 0 auto;
}
input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: black;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
  background-color: #39ace7;
}

input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}
</style>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "add",
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      title: ''
    };
  },
  methods: {
      addComment() {
        console.log('masuk ke add comment')
          axios
        .post(`http://localhost:5000/answers/${this.$store.state.question.currentQuestion._id}`, {
          title: this.title,
          description: this.editorData,
          userId: localStorage.getItem("id")
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then((newPost) => {
          console.log(newPost)
          Swal.fire({
            type: "success",
            title: "Success added new Comment",
            showConfirmButton: false,
            timer: 1500
          });
          this.editorData = ''
          this.title = ''
          this.$store.dispatch('getOneQuestion', this.$store.state.question.currentQuestion._id)
          this.$router.push(`/onequestion/${this.$store.state.question.currentQuestion._id}`);
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
  }
};
</script>
