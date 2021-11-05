<template>
  <ion-button @click="setOpen(true)">Show Loading</ion-button>
  <ion-loading
    :is-open="isOpenRef"
    cssClass="my-custom-class"
    message="Please wait..."
    :duration="timeout"
    @onDidDismiss="setOpen(false)"
  >
  </ion-loading>
</template>

<script lang="ts">
import { IonLoading, IonButton } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    timeout: { type: Number, default: 1000 },
  },
  components: { IonLoading, IonButton },
  setup() {
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => (isOpenRef.value = state);

    return { isOpenRef, setOpen };
  },
});
</script>
