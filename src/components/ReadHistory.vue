<template>
  <div>
    <div v-for="i in readHistory" :key="i.child">
      {{ i.child }}
    </div>
    <ion-chip color="secondary">
      <ion-label color="dark">Secondary w/ Dark label</ion-label>
    </ion-chip>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { useWhosTurnData } from '@/composables/useWhosTurnData';

export default {
  name: 'ReadHistory',
  setup() {
    const { readHistory, confirm } = useWhosTurnData();

    return {
      readHistory,
      confirm,
    };
  },
};
</script>

<style lang="css"></style>
