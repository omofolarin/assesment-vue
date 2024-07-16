<script setup>
import { computed } from "vue";
import ProductThumbnail from "./ProductThumbnail.vue";

defineProps(["layout"]);

import { useQuery } from "@tanstack/vue-query";
import { delay } from "../utils";
import { apiClient } from "../client";

const {
  data: products,
  fetchStatus,
  isFetching,
} = useQuery({
  queryKey: ["products"],
  queryFn: async () => {
    const data = await apiClient.listProducts();
    return data.docs ?? [];
  },
});
</script>

<template>
  <div v-if="layout === 'grid'">
    <div v-if="isFetching && !products?.length">
      <q-spinner color="primary" size="3em" :thickness="2" />
    </div>
    <div style="display: flex; flex-direction: row; gap: 24px">
      <ProductThumbnail
        v-for="product in products"
        :key="product.id"
        :data="product"
      />
    </div>
  </div>
</template>
