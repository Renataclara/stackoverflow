<template>
  <div>
    <div class="list-group" v-for='list in lists'>
      <router-link :to="`/home/${list._id}`" class="list-group-item list-group-item-info flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
           <h4 class="mb-1">{{list.title}}</h4>
           <small>{{list.created_at}}</small>
         </div>
         <p class="mb-1">{{list.body}}</p>
         <small>Votes: {{list.votes.value}} |  by {{list.userid.name}}</small>
      </router-link>
    </div>
  </div>

</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      lists: [],
      body: null
    }
  },
  methods: {
    getQuestions () {
      this.$http.get(`questions/${this.id}`)
      // axios.get('http://localhost:3000')
      .then((data) => {
        this.lists = data.data
        console.log(this.lists, 'this is self question per id')
        console.log('====================================')
        this.answers = data.data[0].answers
        console.log(this.answers, 'this is self answers per id')
      })
      .catch((error) => {
        console.log(error)
      })
    },
    postAnswer (e) {
      e.preventDefault()
      console.log('halo sblm axios')
        // this.$http.put(`/questions/${this.id}/answer`, {
      this.$http.post(`/questions/${this.id}/answer`, {
        body: this.body
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((data) => {
        console.log(data.data)
        this.$router.push({path: `/home/${this.id}`}) // push to history
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getQuestions()
  },
  watch: {
    id () {
      this.getQuestions()
    }
  }
}
</script>

<style scoped>

</style>
