<template>
  <v-app style="background-color: #2d2f90;">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style scoped>
::v-deep .centered_text_field input {
  text-align: center;
}

::v-deep .v-messages__message {
  font-weight: normal;
  color: whitesmoke;
}
</style>