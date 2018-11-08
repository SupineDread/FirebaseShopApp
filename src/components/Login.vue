<template>
  <div>
    <AuthForm action="login" v-on:process="login($event)"/>
    <app-snackbar v-if="snackBar" :snackBar="snackBar" :text="message" :timeout="timeout"/>
  </div>
</template>

<script>
  import AuthForm from '@/components/forms/Auth'
  import AppSnackbar from "@/components/SnackBar";
  import {db} from '@/main'

  export default {
    name: "login",
    components: {
      AppSnackbar,
      AuthForm
    },
    data(){
      return {
        snackBar: false,
        message: '',
        timeout: 5000
      }
    },
    methods: {
      login(user){
        this.$store.dispatch('firebaseLogin', user).then(data => {
          db.collection('users').doc(data.user.uid).onSnapshot(snapshot => {
            this.$router.push('/')
          })
        }).catch(err => {
          this.message = err.message.substr(0, 200)
          this.snackBar = true
          setTimeout(() => {
            this.snackBar = false
          }, this.timeout)
        })
      }
    }
  }
</script>
