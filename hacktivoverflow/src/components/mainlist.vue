<template>
  <div>
    <Addquestion></Addquestion>
    <div class="list-group" v-for='(list, index) in lists'>
      <div class="list-group-item list-group-item-action flex-column align-items-start">
      <!-- <router-link :to="`/home/${list._id}`" class="list-group-item list-group-item-action flex-column align-items-start"> -->
      <router-link :to="`/home/${list._id}`">
        <div class="d-flex w-100 justify-content-between">
           <h5 class="mb-1">{{list.title}}</h5>
           <small>{{list.created_at}}</small>
         </div>
       </router-link>
         <small>by {{list.userid.name}}</small>
         <button v-if="userid === list.userid._id" type="button" @click="deleteQuestion(`${list._id}`)" class="btn btn-outline-danger btn-sm">X</button>
         <button type="button" @click="vote({id:`${list._id}`, value: 1 })" class="btn btn-outline-dark btn-sm">+</button>
         <small v-if='list.votes.length === 0'>votes: 0 </small>
         <small v-if='list.votes.length !== 0'>votes: {{nets[index]}} </small>
         <button type="button" @click="vote({id:`${list._id}`, value: -1 })" class="btn btn-outline-dark btn-sm">-</button>
         <!-- Button trigger modal -->
        <button v-if='userid === list.userid._id' type="button" @click="getQuestion(`${list._id}`)" class="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#exampleModalLong">
          Edit
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Edit question</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent='editQuestion(formQuestion)'>
                <div class="form-group">
                <label for="title">Title</label>
                <input v-model='formQuestion.title' type="text" class="form-control" id="title" placeholder="Title">
                </div>
                <div class="form-group">
                <label for="body">Body</label>
                  <textarea v-model='formQuestion.body' type="text" class="form-control" id="body" placeholder="Explanation" rows="5"></textarea>
                </div>
                <div class="form-group">
                <label for="tags">Tags</label>
                <input v-model='formQuestion.tags' type="text" class="form-control" id="tags" placeholder="Any tag?">
                </div>
                <button id='editedQuestion' type="submit" class="btn btn-primary">Submit</button>
              </form>
              </div>
            </div>
          </div>
        </div>
        <!-- end of modal -->
      <!-- </router-link> -->
      </div>
    </div>
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import Addquestion from '@/components/addquestion'

export default {
  components: {
    Addquestion
  },
  data () {
    return {
      editquestions: [],
      id: null,
      formQuestion: {
        _id: null,
        title: null,
        body: null,
        tags: null
      }
    }
  },
  methods: {
    ...mapActions([
      'getQuestions',
      'deleteQuestion',
      'editQuestion',
      'vote'
    ]),
    getQuestion (id) {
      this.id = id
      this.$http.get(`questions/${id}`)
      // axios.get('http://localhost:3000')
      .then((data) => {
        this.editquestions = data.data
        console.log(this.editquestions, 'ini tohhh')
        this.formQuestion._id = this.editquestions[0]._id
        this.formQuestion.title = this.editquestions[0].title
        this.formQuestion.body = this.editquestions[0].body
        this.formQuestion.tags = this.editquestions[0].tags
        console.log('====================================')
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  computed: {
    lists () {
      return this.$store.state.mainlist
    },
    nets () {
      var listNet = []
      this.$store.state.mainlist.forEach(q => {
        if (q.votes.length > 0) {
          var net = 0
          q.votes.forEach(v => {
            net += v.uservalue
          })
          console.log(net, 'the ones not 0')
          listNet.push(net)
        } else {
          listNet.push(0)
        }
      })
      return listNet
    },
    ...mapState([
      'userid'
    ])
  },
  created () {
    this.getQuestions()
  }
}
</script>

<style scoped>

</style>
