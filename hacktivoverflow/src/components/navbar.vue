<template>
  <div>
    <nav class="navbar fixed-top  navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Stackoverflow</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li v-if='userid == null' class="nav-item">
            <router-link class="nav-link" to="/signin">Sign in</router-link>
          </li>
          <li v-if='userid == null' class="nav-item">
            <router-link class="nav-link" to="/signup">Join Us</router-link>
          </li>
          <li v-if='userid !== null' class="nav-item" @click='logout'>
            <router-link class="nav-link" to="/signin">Logout</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
</div>

</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  methods: {
    ...mapMutations([
      'logout'
    ])
  },
  computed: mapState([
    'userid',
    'name'
  ])
}
</script>

<style scoped>

</style>
