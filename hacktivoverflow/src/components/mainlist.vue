<template>
  <div>
    <div class="list-group" v-for='list in lists'>
      <router-link :to="`/home/${list._id}`" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
           <h5 class="mb-1">{{list.title}}</h5>
           <small>{{list.created_at}}</small>
         </div>
         <small>by {{list.userid.name}}</small>
      </router-link>
    </div>
  </div>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'getQuestions'
    ])
  },
  computed: {
    lists () {
      return this.$store.state.mainlist
    }
  },
  created () {
    this.getQuestions()
  }
}
</script>

<style scoped>

</style>
