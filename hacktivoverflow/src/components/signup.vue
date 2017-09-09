<template>
  <div>
    <form @submit='getSignup'>
      <div class="form-group">
        <label for="signupName">Name</label>
        <input v-model='name' class="form-control" id="signupName" placeholder="Your name">
      </div>
      <div class="form-group">
        <label for="signupEmail">Email address</label>
        <input v-model='username' type="email" class="form-control" id="signupEmail" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="signupPassword">Password</label>
        <input v-model='password' type="password" class="form-control" id="signupPassword" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  // props: ['perarticle'],
  data () {
    return {
      username: null,
      name: null,
      password: null
    }
  },
  methods: {
    getSignup (e) {
      e.preventDefault()
      console.log('halo sblm axios')
      this.$http.post('/signup', {
        name: this.name,
        username: this.username,
        password: this.password
      })
      .then((data) => {
        this.signup = data.data
        console.log('signup data', this.signup)
        this.$router.push({path: '/signin'}) // push to history
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
