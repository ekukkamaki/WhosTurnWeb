<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Kuvat</ion-title>
      </ion-toolbar>
    </ion-header>
    <div class="image-page">
      <div class="image-page__section">
        <div class="image-page__header">
          <ion-img
            src="/assets/child-image.jpeg"
            class="image-page__header--image"
          ></ion-img>
          <h2 class="image-page__header--text">Lapset</h2>
        </div>
        <div class="image-page__section-container">
          <card :cardHeader="'Lenni'"></card>
          <card :cardHeader="'Lumi'"></card>
        </div>
      </div>
      <div class="image-page__section">
        <div class="image-page__header">
          <ion-img
            src="/assets/adult-image.jpeg"
            class="image-page__header--image"
          ></ion-img>
          <h2 class="image-page__header--text">Aikuiset</h2>
        </div>
        <div class="image-page__section-container">
          <card :cardHeader="'Äiti'"></card>
          <card :cardHeader="'Isi'"></card>
        </div>
      </div>

      <!-- {{ firstImage.webviewPath }} -->
    </div>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonImg } from "@ionic/vue";
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { ref } from "vue";
import Card from "@/atoms/CardElement.vue";

export default {
  name: "Tab3View",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonPage,
    Card,
    IonImg,
  },
  setup() {
    const { photos } = usePhotoGallery();
    const firstImage = ref(photos.value[0]?.webviewPath);
    console.log(photos);
    return { photos, firstImage };
  },
};
</script>

<style lang="scss" scoped>
.image-page {
  // display: flex;
  // justify-content: center;
  margin: 20px auto;
  &__section {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-top: 20px;
    &:first-child {
      padding-bottom: 30px;
      border-bottom: 1px solid rgb(28, 29, 26);
    }
    &-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    &--image {
      width: 80px;
    }
    &--text {
      text-orientation: upright;
      writing-mode: vertical-rl;
    }
  }
}
.ion-page {
  justify-content: inherit;
  margin-left: 10px;
  margin-right: 10px;
  overflow-y: auto;
}

.align-center {
  display: flex;
  justify-content: center;
}
</style>