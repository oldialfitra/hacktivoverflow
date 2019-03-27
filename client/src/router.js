import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Question from './views/AddQuestion.vue';
import OneQuestion from './views/OneQuestion.vue';
import AddAnswer from './views/AddComment.vue';
import UpdateQuestion from './views/UpdateQuestion.vue';
import UpdateAnswer from './views/UpdateAnswer.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/addQuestion',
      name: 'question',
      component: Question,
    },
    {
      path: '/onequestion/:id',
      name: 'onequestion',
      component: OneQuestion,
    },
    {
      path: '/addanswer/:questionId',
      name: 'addanswer',
      component: AddAnswer,
    },
    {
      path: '/updatequestion/:questionId',
      name: 'updatequestion',
      component: UpdateQuestion,
    },
    {
      path: '/updateanswer/:answerid',
      name: 'updateanswer',
      component: UpdateAnswer,
    },
  ],
});
