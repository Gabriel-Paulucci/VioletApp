<template>
  <FormCenter>
    <FormContainer @submit.prevent="login" title="Login">
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
        <router-link class="px-2 py-1 text-teal-800" to="/singup"
          >Sing up</router-link
        >
        <FormButton text="Login" />
      </div>
    </FormContainer>
  </FormCenter>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import FormInput from "../components/form/FormInput.vue";
import { object, string, ValidationError } from "yup";
import config from "@/config";
import FormCenter from "../components/form/FormCenter.vue";
import FormContainer from "@/components/form/FormContainer.vue";
import FormButton from "@/components/form/FormButton.vue";
import { useRouter } from "vue-router";

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

const router = useRouter();

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
      case 500: // Internal Server Error
        alert("Internal server error");
        break;
      case 200: // OK
        {
          interface Result {
            token: string;
          }

          const data: Result = await result.json();
          localStorage.setItem("token", data.token);

          router.push("/dashboard");
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
    } else {
      console.log(error);
    }
  }
}
</script>
