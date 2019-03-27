import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    question: {
      allQuestions: [],
      currentQuestion: '',
    },
    user: {
      isLogin: false,
      id: '',
    },
    answer: {
      currentAnswer: '',
    },
  },
  mutations: {
    setLogin(state, payload) {
      state.user.isLogin = true;
      state.user.id = payload;
    },
    setAllQuestion(state, payload) {
      state.question.allQuestions = payload;
    },
    setOneQuestion(state, payload) {
      state.question.currentQuestion = payload;
    },
    setLogout(state) {
      state.user.isLogin = false;
      state.user.id = '';
    },
    setOneAnswer(state, payload) {
      state.answer.currentAnswer = payload;
    },
  },
  actions: {
    getAll(context) {
      Axios.get('http://localhost:5000/questions')
        .then((response) => {
          context.commit('setAllQuestion', response.data);
          // context.state.question.allQuestions = [];
          // console.log(response.data);
          // context.state.question.allQuestions = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login(context, id) {
      console.log('masuk login');
      context.commit('setLogin', id);
    },
    getOneQuestion(context, id) {
      console.log('masuk ke store get one');
      console.log(id)
      Axios
        .get(`http://localhost:5000/questions/${id}`, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then((response) => {
          console.log('masuk ke one');
          console.log(response.data);
          context.commit('setOneQuestion', response.data);
          Router.push(`/onequestion/${id}`);
          // context.state.question.currentQuestion = '';
          // context.state.question.currentQuestion = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOneQuestionUpdate(context, id) {
      Axios.get(`http://localhost:5000/questions/${id}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((response) => {
          console.log('masuk ke one');
          console.log(response.data);
          context.commit('setOneQuestion', response.data);
          Router.push(`/updatequestion/${id}`);
          // context.state.question.currentQuestion = '';
          // context.state.question.currentQuestion = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOneAnswer(context, id) {
      console.log(id);
      console.log('masuk ke store update answer')
      Axios.get(`http://localhost:5000/answers/${id}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((response) => {
          console.log('masuk ke then');
          console.log(response.data);
          context.commit('setOneAnswer', response.data);
          console.log(context.state.answer.currentAnswer);
          Router.push(`/updateanswer/${id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout(context) {
      context.commit('setLogout');
    },
  },
});
