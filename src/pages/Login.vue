<script setup>
import { ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { apiClient } from "../client";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const $q = useQuasar();
const router = useRouter();
const store = useStore();
const form = ref({
  email: "",
  password: "",
});

const loginMutation = useMutation({
  mutationKey: ["login"],
  mutationFn: async (mutation) => {
    const data = await apiClient.login(mutation);
    return data;
  },

  onError: async (error, mutation) => {
    $q.notify({
      type: "negative",
      message: `Login error: ${error.message}`,
    });
  },

  onSuccess: (data, mutation) => {
    console.log({ data });
    store.dispatch("login", data);
    router.replace("/products");
    $q.notify({ type: "positive", message: "Login successful" });
  },
});

const submitForm = () => {
  console.log(form.value);
  loginMutation.mutate(form.value);
};
</script>

<template>
  <form
    @submit.prevent="submitForm"
    style="display: flex; flex-direction: column; gap: 16px; min-width: 360px"
  >
    <p>Login</p>

    <q-input label="Email" v-model="form.email" standout type="email" />
    <q-input
      label="Password"
      v-model="form.password"
      standout
      type="password"
    />

    <q-btn
      type="submit"
      label="Submit"
      color="primary"
      :disabled="loginMutation.isPending.value"
      :loading="loginMutation.isPending.value"
    />

    <p>
      You don't have an account?
      <q-btn label="Register" href="/register" flat />
    </p>
  </form>
</template>
