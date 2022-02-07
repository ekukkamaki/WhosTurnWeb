<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Kuvat</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="image-page">
        <h3 class="align-center">Lapset</h3>
        <div class="align-center">
          <!-- <ion-img :src="photos[0].webviewPath"></ion-img> -->
          <ion-grid>
            <ion-row>
              <ion-col>
                <card :cardHeader="'Lenni'"></card>
                <!-- <div v-if="photos && photos[0]">
              <ion-img :src="photos[0].webviewPath"></ion-img>
            </div> -->
              </ion-col>
              <ion-col><card :cardHeader="'Lumi'"></card></ion-col>
            </ion-row>
          </ion-grid>
        </div>

        <h3 class="align-center">Aikuiset</h3>
        <div class="align-center">
          <ion-grid>
            <ion-row>
              <ion-col>
                <card :cardHeader="'Äiti'"></card>
                <!-- <div v-if="photos && photos[0]">
              <ion-img :src="photos[0].webviewPath"></ion-img>
            </div> -->
              </ion-col>
              <ion-col><card :cardHeader="'Isi'"></card></ion-col>
            </ion-row>
          </ion-grid>
        </div>

        <!-- {{ firstImage.webviewPath }} -->
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonImg,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/vue";
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { ref } from "vue";
import Card from "@/atoms/CardElement.vue";

export default {
  name: "Tab3View",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCol,
    IonGrid,
    IonRow,
    Card,
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
}
.align-center {
  display: flex;
  justify-content: center;
}
</style>