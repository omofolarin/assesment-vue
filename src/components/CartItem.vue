<script setup>
import { defineProps } from "vue";
const props = defineProps(["data"]);
</script>

<template>
  <div
    style="display: flex; flex-direction: row; justify-content: space-between"
  >
    <span>{{ props.data?.name }}</span>

    <span>N{{ props.data?.price }} X {{ props.data?.qty }}</span>
  </div>
</template>
