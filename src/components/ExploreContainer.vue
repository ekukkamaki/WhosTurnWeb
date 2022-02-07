<template>
  <!-- <read-history></read-history> -->
  <ion-loading
    :is-open="loading"
    cssClass="my-custom-class"
    message="Arvontamylly laulaa..."
    :duration="timeout"
  >
  </ion-loading>
  <IonContent class="dark">
    <div v-for="party in parties" :key="party.Reader">
      <div v-if="party.Reader === 'Isi'">
        <strong> Isin vuoro lukea:</strong>
        <p style="padding-top: 20px">
          <span style="font-size: 30px" v-if="party.Listener">
            {{ party.Listener?.FirstName + " " + party.Listener?.LastName }}
          </span>
          <span v-else>??</span>
        </p>
      </div>
      <div v-if="party.Reader === 'Äiti'">
        <strong> Äitin vuoro lukea:</strong>
        <p style="padding-top: 20px">
          <span style="font-size: 30px" v-if="party.Listener">
            {{ party.Listener?.FirstName + " " + party.Listener?.LastName }}
          </span>
          <span v-else>??</span>
        </p>
      </div>
    </div>
    <section style="padding-top: 50px">
      <header>Meneekö homma näin?</header>
      <ion-button color="success" size="medium">Kyllä</ion-button>
      <ion-button color="danger" size="medium">Ei</ion-button>
    </section>
    <ion-button
      expand="block"
      color="secondary"
      size="small"
      @click="RandomReader()"
      >Arvonta</ion-button
    >
  </IonContent>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { IonButton, IonLoading, IonContent } from "@ionic/vue";
interface Parties {
  Reader: string;
  Listener: Child | null;
}
interface Child {
  FirstName: string;
  LastName: string;
}

export default {
  name: "ExploreContainer",
  props: {
    name: String,
  },
  components: {
    IonButton,
    IonLoading,
    IonContent,
  },
  setup() {
    const loading = ref(false);
    const childs: Child[] = [
      { FirstName: "Lumi", LastName: "Kukkamäki" },
      { FirstName: "Lenni", LastName: "Kukkamäki" },
    ];

    const parties: Parties[] = reactive([
      {
        Reader: "Isi",
        Listener: null,
      },
      {
        Reader: "Äiti",
        Listener: null,
      },
    ]);
    const RandomReader = () => {
      loading.value = true;
      parties.forEach((f) => {
        f.Listener = null;
      });
      setTimeout(() => {
        const random = Math.random() < 0.5;
        parties[0].Listener = childs[random ? 1 : 0];
        parties[1].Listener = childs[random ? 0 : 1];
        loading.value = false;
      }, 3000);
    };
    RandomReader();

    return { RandomReader, parties, loading };
  },
};
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
.red {
  color: "red";
}
.blue {
  color: "blue";
}
</style>
