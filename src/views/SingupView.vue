<template>
  <FormCenter>
    <FormContainer @submit.prevent="register">
      <h1 class="text-teal-800">Register</h1>
      <h2 v-if="error" class="text-red-700">{{ error }}</h2>
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
      <FormInput
        placeholder="Repeat Password"
        type="password"
        v-model="form.repeatPassword"
        :error="formError.repeatPassword"
      />
      <div>
        <router-link class="px-2 py-1 text-teal-800" to="/">Back</router-link>
        <FormButton text="Register" />
      </div>
    </FormContainer>
  </FormCenter>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import FormCenter from "../components/form/FormCenter.vue";
import FormContainer from "@/components/form/FormContainer.vue";
import FormInput from "@/components/form/FormInput.vue";
import { object, string, ref as yupRef, ValidationError } from "yup";
import config from "@/config";
import FormButton from "@/components/form/FormButton.vue";
import { useRouter } from "vue-router";

interface FormErrorKeyType {
  [key: string]: boolean;
}

interface FormError extends FormErrorKeyType {
  username: boolean;
  password: boolean;
  repeatPassword: boolean;
}

const username = ref("");
const password = ref("");
const repeatPassword = ref("");

const error = ref("");

const form = reactive({
  username,
  password,
  repeatPassword,
});

const formError = reactive<FormError>({
  username: false,
  password: false,
  repeatPassword: false,
});

const formValidator = object({
  username: string().required(),
  password: string().required().min(8),
  repeatPassword: string()
    .required()
    .oneOf([yupRef("password"), null]),
}).required();

const router = useRouter();

async function register() {
  try {
    await formValidator.validate(form, { abortEarly: false });

    const response = await fetch(config.apiUrl + "/auth/singup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
        repeat_password: form.repeatPassword,
      }),
    });

    switch (response.status) {
      case 409: {
        error.value = "Username already exists";
        formError.username = true;
        break;
      }
      case 200: {
        router.push("/");
        break;
      }
      default:
        console.log(response);
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
