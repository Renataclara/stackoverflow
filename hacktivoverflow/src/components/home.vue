<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div class="row">
         <div class="col-sm-8">
           <Addquestion></Addquestion>
           <Mainlist></Mainlist>
         </div>
         <div class="col-sm-4">
           <div class="container">
             <div class="row">
               lol
             </div>
           </div>
           <div class="container">
             <div class="row">
               lol2
             </div>
           </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/navbar'
import Mainlist from '@/components/mainlist'
import Addquestion from '@/components/addquestion'
export default {
  components: {
    Navbar,
    Mainlist,
    Addquestion
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
