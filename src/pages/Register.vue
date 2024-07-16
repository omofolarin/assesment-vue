<script setup>
import { ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { apiClient } from "../client";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();
const form = ref({
  fullName: "",
  email: "",
  password: "",
});

const registerMutation = useMutation({
  mutationKey: ["registration"],
  mutationFn: async (mutation) => {
    const data = await apiClient.register(mutation);
    return data;
  },

  onSuccess: (mutation) => {
    router.push("/login");
    $q.notify({
      type: "positive",
      message: "Accounted created successfully, please login",
    });
  },
});

const onSubmit = () => {
  console.log(form.value);
  registerMutation.mutate(form.value);
};
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    style="display: flex; flex-direction: column; gap: 16px; min-width: 360px"
  >
    <p>Register</p>
    <q-input label="Full name" v-model="form.fullName" standout />
    <q-input label="Email" v-model="form.email" standout />
    <q-input label="Password" v-model="form.password" standout />

    <q-btn
      type="submit"
      label="Submit"
      color="primary"
      :disabled="registerMutation.isPending.value"
      :loading="registerMutation.isPending.value"
    />

    <p>Do you have an account? <q-btn label="Login" href="/" flat /></p>
  </form>
</template>
