<template>
  <div>
    <h4>{{ props.cardHeader }}</h4>
    <div class="card-container content-align-center">
      <!-- <vue-feather type="upload"></vue-feather> -->
      <img src="/assets/No-Image-Placeholder.svg.png" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardHeader: String,
  },
  name: "CardElement",
  components: {},
  setup(props) {
    return { props };
  },
};
</script>

<style lang="css" scoped>
.card-container {
  width: 100%;
  max-width: 300px;
  /* border: black solid 1px; */
}

.content-align-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

