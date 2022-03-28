<template>
  <div class="w-full h-full flex justify-center items-center bg-teal-50">
    <form
      class="flex flex-col items-center bg-emerald-400 rounded p-4"
      @submit.prevent="login"
    >
      <h1 class="text-teal-800">Login</h1>
      <FormInput
        placeholder="Username"
        type="text"
        v-model="form.username"
        :error="formError.username"
      />
      <FormInput
        placeholder="Password"
        type="password"
        v-model="form.password"
        :error="formError.password"
      />
      <div>
        <router-link class="px-2 py-1" to="/register">Sing up</router-link>
        <button
          class="rounded px-2 py-1 my-2 bg-emerald-700 text-white w-fit mx-auto"
          type="submit"
        >
          Sign in
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import FormInput from "../components/form/FormInput.vue";
import { object, string, ValidationError } from "yup";
import config from "@/config";

interface FormErrorKeyType {
  [key: string]: boolean;
}

interface FormError extends FormErrorKeyType {
  username: boolean;
  password: boolean;
}

const username = ref("");
const password = ref("");

const form = reactive({
  username,
  password,
});

const formError = reactive<FormError>({
  username: false,
  password: false,
});

const formValidator = object({
  username: string().required(),
  password: string().required(),
}).required();

async function login() {
  try {
    await formValidator.validate(form, { abortEarly: false });

    const result = await fetch(config.apiUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
      }),
    });

    switch (result.status) {
      case 401: // Unauthorized
        formError.username = true;
        formError.password = true;
        break;
      case 500:
        alert("Internal server error");
        break;
      case 200:
        {
          interface Result {
            token: string;
          }

          const data: Result = await result.json();
          localStorage.setItem("token", data.token);
        }
        break;
      default:
        break;
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      error.inner.forEach(({ path }) => {
        if (path) {
          formError[path] = true;
        }
      });
    }
    console.log(error);
  }
}
</script>
