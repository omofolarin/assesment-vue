<script setup>
import { ref, computed } from "vue";
import CartItem from "../components/CartItem.vue";
import { useStore } from "vuex";
import { watch } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { apiClient } from "../client";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const $q = useQuasar();
const store = useStore();
const router = useRouter();
const orderForm = ref({
  address: "",
  firstName: "",
  lastName: "",
  additionalInfo: "",
  orderedItems: [],
  phone: "",
});

const createOrderMutation = useMutation({
  mutationKey: ["createOrder"],
  mutationFn: async (mutation) => {
    const data = await apiClient.createOrder(mutation);
    return data;
  },
  onSuccess: async (data, mutation) => {
    $q.notify({ type: "positive", message: "Order created" });
    router.replace("/products");
  },
  onError: async (error, mutation) => {
    $q.notify({
      type: "negative",
      message: `Error creating order: ${error.message}`,
    });
  },
});

const submitOrder = () => {
  console.log(orderForm);
  const cartItems = store.getters.cartItems;
  const order = {
    email: store.state.profile.email,
    phone: orderForm.value.phone,
    fullName: `${orderForm.value.firstName} ${orderForm.value.lastName}`,
    address: orderForm.value.address,
    additionalInfo: orderForm.value.additionalInfo,
    orderItems: cartItems,
  };
  createOrderMutation.mutate(order);
};

const { cartTotalPrice, cartItems } = store.getters;
watch(
  () => cartTotalPrice,
  () => {
    console.log(cartTotalPrice);
  }
);
</script>

<template>
  <h1>Checkout</h1>

  <form
    style="display: flex; flex-direction: column; gap: 16px"
    @submit.prevent="submitOrder"
  >
    <q-input standout label="Address" v-model="orderForm.address" required />
    <q-input
      standout
      label="First name"
      v-model="orderForm.firstName"
      required
    />
    <q-input standout label="Last name" v-model="orderForm.lastName" required />
    <q-input standout label="Phone" v-model="orderForm.phone" />
    <q-input
      standout
      label="Additional info"
      v-model="orderForm.additionalInfo"
    />

    <q-expansion-item label="Cart items">
      <CartItem
        v-for="cartItem in cartItems"
        :key="cartItem.id"
        :data="cartItem"
      />
    </q-expansion-item>

    <div
      style="
        display: flex;
        flex-direction: row;
        gap: 16px;
        width: 100%;
        justify-content: space-between;
      "
    >
      <p>Total amount</p>

      <p style="">N {{ cartTotalPrice }}</p>
    </div>

    <q-btn label="submit" color="primary" type="submit" />
  </form>
</template>
