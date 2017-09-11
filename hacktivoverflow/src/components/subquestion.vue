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
    <div class="list-group" v-for='answer in answers'>
      <div class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
           <p class="mb-1">{{answer.body}}</p>
           <small>{{answer.created_at}}</small>
            <button type="button" @click="deleteAnswer(`${answer._id}`)" class="btn btn-outline-danger btn-sm">X</button>
         </div>
         <small>by {{answer.userid.name}}</small>
         <button type="button" @click="voteUp(`${answer._id}`)" class="btn btn-outline-dark btn-sm">+</button>
         <small>votes: {{answer.votes[0]}}</small>
         <button type="button" @click="voteDown(`${answer._id}`)" class="btn btn-outline-dark btn-sm">-</button>
      </div>
    </div>
    <div class="list-group">
      <div class="list-group-item-secondary">
        <div>
        <form @submit='postAnswer'>
          <div class="form-group">
            <label for="body">Answer it</label>
            <textarea v-model='body' type="text" class="form-control" id="body" placeholder="Your answer here..." rows="3"></textarea>
          </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      lists: [],
      answers: [],
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
    },
    deleteAnswer (ida) {
      console.log('halo sblm axios')
      this.$http.delete(`/questions/${this.id}/answer/${ida}`, {
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
    },
    voteUp (ida) {
      console.log('halo sblm axios')
      this.$http.post(`/questions/${this.id}/answer/${ida}/vote`, {
        value: 1
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
    },
    voteDown (ida) {
      console.log('halo sblm axios')
      this.$http.post(`/questions/${this.id}/answer/${ida}/vote`, {
        value: -1
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
