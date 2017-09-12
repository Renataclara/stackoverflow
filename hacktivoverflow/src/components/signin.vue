<template>
  <div>
    <form @submit='getSignin'>
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
      <router-link class="nav-link" to="/signup">Don't have an account yet? Sign up now</router-link>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    getSignin (e) {
      e.preventDefault()
      console.log('halo sblm axios')
      this.$http.post('/signin', {
        username: this.username,
        password: this.password
      })
      .then((data) => {
        this.signin = data.data
        console.log('signin data', this.signin)
        localStorage.setItem('token', this.signin.token)
        localStorage.setItem('id', this.signin.id)
        localStorage.setItem('name', this.signin.name)
        this.$router.push({path: '/'}) // push to history
        this.login()
      })
      .catch((error) => {
        console.log(error)
      })
    },
    ...mapMutations([
      'login'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
