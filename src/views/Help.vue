<template>
  <AppTemplatePage back title="Помощь">
    <Question v-for="q in questions" :key="q.title" :question="q"></Question>
  </AppTemplatePage>
</template>
<script>
import AppTemplatePage from '../components/ui/AppTemplatePage';
import Question from '../components/question/Question';
export default {
  setup() {
    const questions = [
      {title: 'Вопрос 1', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' },
      {title: 'Вопрос 2', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' },
    ]

    return {
      questions
    }
  },
  components: {
    AppTemplatePage,
    Question
  }
}
</script>
