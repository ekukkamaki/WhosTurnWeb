<template>
  <div>
    <div class="card-container" @click="addPersonImage(props.cardHeader)">
      <div class="content-align-center">
        <ion-img :src="imageUrl"></ion-img>
        <!-- <img src="/assets/No-Image-Placeholder.svg.png" /> -->
      </div>
      <div class="right-upper-corner">
        <vue-feather
          type="plus"
          :stroke="'#953737'"
          :size="'50px'"
        ></vue-feather>
      </div>
      <div class="left-right-corner">
        <h2>{{ props.cardHeader }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { watch } from "@vue/runtime-core";
import { IonImg } from "@ionic/vue";
import { ref } from "vue";
export default {
  props: {
    cardHeader: String,
    personId: Number,
  },
  name: "CardElement",
  components: { IonImg },
  setup(props: any) {
    const { photos, takePhoto } = usePhotoGallery();
    const addPersonImage = (name: string) => {
      takePhoto(name);
    };
    const imageUrl = ref("");
    watch(photos, (value) => {
      if (value) {
        const foundPhotos = value.filter((f) =>
          f.filepath.startsWith(props.cardHeader)
        );
        if (foundPhotos && foundPhotos.length > 0) {
          imageUrl.value = foundPhotos[0].webviewPath ?? "";
          return;
        }
      }
      imageUrl.value = "/assets/No-Image-Placeholder.svg.png";
    });

    return { props, addPersonImage, photos, imageUrl };
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  width: 100%;
  max-width: 600px;
  position: relative;
  /* border: black solid 1px; */
}

.content-align-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.right-upper-corner {
  position: absolute;
  top: 0px;
  z-index: 10;
}
.left-right-corner {
  position: absolute;
  bottom: 0px;
  z-index: 10;
  right: 20px;
  & > h2 {
    color: lightpink;
  }
}
</style>

