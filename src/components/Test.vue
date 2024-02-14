<template>
  <div>
    <v-chip-group
        v-model="neighborhoods"
        column
        multiple
      >
        <v-chip
          filter
          variant="outlined"
        >
          Snowy Rock Place
        </v-chip>
        <v-chip
          filter
          variant="outlined"
        >
          Honeylane Circle
        </v-chip>
        <v-chip
          filter
          variant="outlined"
        >
          Donna Drive
        </v-chip>
        <v-chip
          filter
          variant="outlined"
        >
          Elaine Street
        </v-chip>
        <v-chip
          filter
          variant="outlined"
        >
          Court Street
        </v-chip>
        <v-chip
          filter
          variant="outlined"
        >
          Kennedy Park
        </v-chip>
      </v-chip-group>
  </div>
</template>

<script>
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'

export default {
  name: 'Test',
  data() {
    return {
        neighborhoods: [],
      // Your data properties here
    };
  },
  methods: {
    // Your methods here
  },
  mounted() {
    // Code to run when the component is mounted
  },
};
</script>

<style scoped>
/* Your component styles here */
</style>
