<template>
  <FormCenter>
    <FormContainer @submit.prevent="login" title="Login" :error="error">
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
import { inject, reactive, ref } from "vue";
import FormInput from "../components/form/FormInput.vue";
import { object, string, ValidationError } from "yup";
import FormCenter from "../components/form/FormCenter.vue";
import FormContainer from "@/components/form/FormContainer.vue";
import FormButton from "@/components/form/FormButton.vue";
import { useRouter } from "vue-router";
import { useMainStore } from "@/store/mainStore";
import { VioletApi } from "@/api/violet";

interface FormErrorKeyType {
  [key: string]: string;
}

interface FormError extends FormErrorKeyType {
  username: string;
  password: string;
}

const username = ref("");
const password = ref("");
const form = reactive({
  username,
  password,
});
const error = ref("");
const formError = reactive<FormError>({
  username: "",
  password: "",
});

const store = useMainStore();
const router = useRouter();
const violetApi = inject<VioletApi>("violetApi");

const formValidator = object({
  username: string().required(),
  password: string().required(),
}).required();

async function login() {
  error.value = "";

  formError.password = "";
  formError.username = "";

  if (!violetApi) {
    console.log("VioletApi not found");
    return;
  }

  try {
    await formValidator.validate(form, { abortEarly: false });

    const result = await violetApi.login(form.username, form.password);

    if (!result) {
      error.value = "Invalid username or password";
      formError.username = "";
      formError.password = "";
    } else {
      store.token = result.token;
      router.push("/dashboard");
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      error.inner.forEach(({ path, message }) => {
        if (path) {
          formError[path] = message;
        }
      });
    } else {
      console.log(error);
    }
  }
}
</script>
