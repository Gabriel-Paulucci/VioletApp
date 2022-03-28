<template>
  <div class="home">
    <form @submit.prevent="login">
      <input type="password" name="email" placeholder="Email" v-model="email" />
      <input
        type="email"
        name="password"
        placeholder="Password"
        v-model="password"
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const password = ref("");
const email = ref("");

function login() {
  console.log(email.value, password.value);
}
</script>
