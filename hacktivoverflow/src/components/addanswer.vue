<template>
  <div>
    <form @submit='postQuestion'>
      <div class="form-group">
        <label for="body">Body</label>
        <input v-model='body' type="text" class="form-control" id="body" placeholder="explanation">
      </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      body: null
    }
  },
  methods: {
    postQuestion (e) {
      e.preventDefault()
      console.log('halo sblm axios')
      this.$http.post('/questions', {
        body: this.body
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((data) => {
        console.log(data.data)
        this.$router.push({path: '/home/'}) // push to history
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
