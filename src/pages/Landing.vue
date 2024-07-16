<script setup>
import ProductList from "../components/ProductList.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useStore();
const totalProductsCounts = computed(() =>
  store.getters.cartItems.reduce((a, b) => a + b.qty, 0)
);

watch(store.getters.cartItems, () => {
  console.log(
    "debugging store",
    totalProductsCounts.value,
    store.getters.cartItems
  );
});

const checkout = () => {
  router.push("/checkout");
};
</script>

<template>
  <ProductList :layout="'grid'" />
  <div
    style="
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 5em;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color: #eee;
    "
  >
    <q-btn
      :label="'Checkout ' + totalProductsCounts.toString() + ' item(s)'"
      style="width: 20em; align-self: center"
      color="primary"
      @click="checkout"
      :disabled="totalProductsCounts === 0"
    />
  </div>
</template>
