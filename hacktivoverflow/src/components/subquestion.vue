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
    <div class="list-group" v-for='(answer, index) in answers'>
      <div class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
           <p class="mb-1">{{answer.body}}</p>
           <small>{{answer.created_at}}</small>
            <button v-if="userid === answer.userid._id" type="button" @click="deleteAnswer(`${answer._id}`)" class="btn btn-outline-danger btn-sm">X</button>
         </div>
         <small>by {{answer.userid.name}}</small>
         <button type="button" @click="vote({id:`${answer._id}`, value: 1 })" class="btn btn-outline-dark btn-sm">+</button>
         <small v-if='answer.votes.length === 0'>votes: 0 </small>
         <small v-if='answer.votes.length !== 0'>votes: {{nets[index]}}</small>
         <button type="button" @click="vote({id:`${answer._id}`, value: -1 })" class="btn btn-outline-dark btn-sm">-</button>
      </div>
    </div>
    <div class="list-group">
      <div class="list-group-item-secondary">
        <div>
        <form @submit.prevent='postAnswer'>
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
        // console.log(this.lists, 'this is self question per id')
        // console.log('====================================')
        this.answers = data.data[0].answers
        // console.log(this.answers, 'this is self answers per id')
      })
      .catch((error) => {
        console.log(error)
      })
    },
    postAnswer () {
      // console.log('halo sblm axios')
      this.$http.post(`/questions/${this.id}/answer`, {
        body: this.body
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((data) => {
        // console.log(data.data, 'ini hasil axios post answer')
        this.answers = data.data.answers
        // console.log(this.answers, 'the answers')
      })
      .catch((error) => {
        console.log(error)
      })
    },
    deleteAnswer (ida) {
      // console.log('halo sblm axios')
      this.$http.delete(`/questions/${this.id}/answer/${ida}`, {
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((data) => {
        // console.log(data.data)
        const filteredAnswer = this.answers.filter((list) => list._id !== ida)
        // console.log('the filtered answers', filteredAnswer)
        this.answers = filteredAnswer
      })
      .catch((error) => {
        console.log(error)
      })
    },
    vote (payload) {
      // console.log('halo sblm axios')
      // console.log('ini id question lol', this.id)
      // console.log('ini id answer lol', payload.id)
      this.$http.post(`/questions/${this.id}/answer/${payload.id}/vote`, {
        value: payload.value
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((data) => {
        // console.log('overall data', data)
        // console.log('result proses ke axios ini toh cari success nya', data.data.inserted)
        // console.log('status', data.data.success)
        var userid = localStorage.getItem('id')
        // console.log(userid, 'the userid')
        // console.log(payload.id, 'the answers id')
        // console.log(this.answers, 'the answers')
        var idx = this.answers.findIndex((answer) => (answer._id === payload.id))
        // console.log(idx, 'index answer')
        // console.log('------ check type of data')
        // console.log('type of uservoteid data', this.answers[idx].votes[0].uservoteid._id)
        // console.log('type of userid data', userid)
        var idxvted = this.answers[idx].votes.findIndex((vote) => (vote.uservoteid._id === userid))
        // console.log(idxvted, 'index vote in answer')
        if (idxvted === -1) {
          console.log('not exist, make new one')
          this.answers[idx].votes.push({
            uservalue: payload.value,
            uservoteid: {_id: userid}
          })
          console.log(this.answers[idx].votes)
        } else {
          this.answers[idx].votes.splice(idxvted, 1)
          // console.log('alredy exist, delete past one')
          // console.log(this.answers[idx].votes)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getQuestions()
  },
  computed: {
    userid () {
      return localStorage.getItem('id')
    },
    nets () {
      var listNet = []
      this.answers.forEach(q => {
        if (q.votes.length > 0) {
          var net = 0
          q.votes.forEach(v => {
            net += v.uservalue
          })
          // console.log(net, 'the ones not 0')
          listNet.push(net)
        } else {
          listNet.push(0)
        }
      })
      return listNet
    }
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
