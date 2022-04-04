<template>
  <FormCenter>
    <FormContainer @submit.prevent="register" title="Register" :error="error">
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
import { inject, reactive, ref } from "vue";
import FormCenter from "../components/form/FormCenter.vue";
import FormContainer from "@/components/form/FormContainer.vue";
import FormInput from "@/components/form/FormInput.vue";
import { object, string, ref as yupRef, ValidationError } from "yup";
import FormButton from "@/components/form/FormButton.vue";
import { useRouter } from "vue-router";
import { VioletApi } from "@/api/violet";

interface FormErrorKeyType {
  [key: string]: string;
}

interface FormError extends FormErrorKeyType {
  username: string;
  password: string;
  repeatPassword: string;
}

const username = ref("");
const password = ref("");
const repeatPassword = ref("");
const form = reactive({
  username,
  password,
  repeatPassword,
});
const error = ref("");
const formError = reactive<FormError>({
  username: "",
  password: "",
  repeatPassword: "",
});

const router = useRouter();
const violetApi = inject<VioletApi>("violetApi");

const formValidator = object({
  username: string().required(),
  password: string().required().min(8),
  repeatPassword: string()
    .required()
    .oneOf([yupRef("password"), null]),
}).required();

async function register() {
  error.value = "";

  formError.password = "";
  formError.repeatPassword = "";
  formError.username = "";

  if (!violetApi) {
    console.log("VioletApi not found");
    return;
  }

  try {
    await formValidator.validate(form, { abortEarly: false });

    const result = await violetApi.register(
      form.username,
      form.password,
      form.repeatPassword
    );

    if (!result) {
      error.value = "Already exists";
      formError.username = "";
      formError.password = "";
      formError.repeatPassword = "";
    } else {
      router.push("/");
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      error.inner.forEach(({ path, message }) => {
        if (path) {
          console.log(message);
          formError[path] = message;
        }
      });
    } else {
      console.log(error);
    }
  }
}
</script>
