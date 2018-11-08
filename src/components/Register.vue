<template>
  <div>
    <AuthForm action="register" v-on:process="register($event)"/>
    <app-snackbar v-if="snackBar" :snackBar="snackBar" :text="message" :timeout="timeout"/>
  </div>
</template>

<script>
  import AppSnackbar from '@/components/SnackBar';
  import AuthForm from "@/components/forms/Auth";
  import {db} from "@/main";

  export default {
    name: "Register",
    components: {
      AppSnackbar,
      AuthForm
    },
    data (){
      return {
        snackBar: false,
        message: '',
        timeout: 5000
      }
    },
    methods: {
      register(user){
        this.$store.dispatch('firebaseRegister', user).then(userCredential  => {
          const data = {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            role: 'customer'
          };
          db.collection('users').doc(userCredential.user.uid).set(data).then(() => {
            this.$store.commit('setRole', data.role);
            this.$router.push('/')
          })
        }).catch(err => {
          this.message = err.message.substr(0, 70);
          this.snackBar = true;
          setTimeout(() => {
            this.snackBar = false
          }, this.timeout)
        })
      }
    }
  }
</script>
