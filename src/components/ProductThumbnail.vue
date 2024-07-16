<script setup>
import { matRemove, matAdd } from "@quasar/extras/material-icons";
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps(["data"]);

const qty = ref(0);

const addToCart = () => {
  console.log("...add to cart", props.data);
  store.dispatch("addToCart", { ...props.data, qty: qty.value });
  qty.value = 0;
};
</script>

<template>
  <div style="min-width: 20em; min-height: 22em; background-color: beige">
    <div style="height: 70%">
      <div
        style="
          width: 100%;
          height: 100%;
          max-height: 20em;
          background-color: #000;
          display: flex;
        "
      >
        <img
          :src="data.img"
          :alt="data.name"
          style="width: 100%; max-height: 20em; align-self: center"
        />
      </div>
      <p>{{ data.name }}</p>
    </div>
    <div
      style="
        height: 30%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      "
    >
      <div
        style="
          width: 5em;
          margin-bottom: 2em;
          margin-right: 1em;
          display: flex;
          align-items: center;
          gap: 8px;
        "
      >
        <q-icon :name="matRemove" size="xs" color="#000" @click="qty--" />
        <q-input placeholder="1" style="text-align: center" v-model="qty" />
        <q-icon
          :name="matAdd"
          color="#000"
          @click="
            {
              qty++;
            }
          "
        />
      </div>

      <div>
        <q-btn
          label="add to cart"
          style="background-color: #ccc"
          flat
          size="14px"
          icon="shopping_cart"
          :disabled="qty === 0"
          @click="addToCart"
        />
      </div>
    </div>
  </div>
</template>
