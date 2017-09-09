<template>
  <div>
    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    + Add new question
  </button>
    </p>
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        <form @submit='postQuestion'>
        <div class="form-group">
        <label for="title">Title</label>
        <input v-model='title' type="text" class="form-control" id="title" placeholder="Title">
        </div>
        <div class="form-group">
        <label for="body">Body</label>
        <input v-model='body' type="text" class="form-control" id="body" placeholder="explanation">
        </div>
        <div class="form-group">
        <label for="tags">Tags</label>
        <input v-model='tags' type="text" class="form-control" id="tags" placeholder="Any tag?">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  data () {
    return {
      title: null,
      body: null,
      tags: null
    }
  },
  methods: {
    postQuestion (e) {
      e.preventDefault()
      console.log('halo sblm axios')
      this.$http.post('/questions', {
        title: this.title,
        body: this.body,
        tags: this.tags
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((data) => {
        console.log(data.data)
        this.$router.push({path: '/home'}) // push to history
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
