<template>
  <div>
    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    + Add new question
  </button>
    </p>
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        <form @submit.prevent='submitQuestion(formQuestion)'>
        <div class="form-group">
        <label for="title">Title</label>
        <input v-model='formQuestion.title' type="text" class="form-control" id="title" placeholder="Title">
        </div>
        <div class="form-group">
        <label for="body">Body</label>
        <input v-model='formQuestion.body' type="text" class="form-control" id="body" placeholder="explanation">
        </div>
        <div class="form-group">
        <label for="tags">Tags</label>
        <input v-model='formQuestion.tags' type="text" class="form-control" id="tags" placeholder="Any tag?">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      </div>
    </div>
  </div>

</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      formQuestion: {
        title: null,
        body: null,
        tags: null
      }
    }
  },
  methods: {
    ...mapActions([
      'submitQuestion'
    ])

  }
}
</script>

<style scoped>

</style>
