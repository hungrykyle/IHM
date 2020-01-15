<!--
Création du tableau de données qu'on envoit au composant Download afin de créer un fichier JSON
-->


<template>
  <div class="ui attached segment">
    <Download
      :download-data="jsonfiledata"
      file-type="json"
      file-name="exportJson"
      class="periodic_table color-3"
      button-text="Exporter au format Json"
    />
  </div>
</template>
<script>
import store from "../store/index.js";
import { mapState } from "vuex";
import Download from "@/components/Download";

export default {
  components: {
    Download
  },
  data: function() {
    return {
      jsonfiledata: []
    };
  },

  computed: mapState(["allhorairegare", "datafrequentation"]),
  mounted: function() {
    this.jsonfile();
  },
  methods: {
    jsonfile: function() {
      let horaire = {};
      store.state.allhorairegare.forEach((value, key) => {
        let horaire2 = {};

        store.state.allhorairegare.get(key).forEach((un, deux) => {
          horaire2[deux] = store.state.allhorairegare.get(key).get(deux);
        });
        horaire[key] = horaire2;
      });
      let freq = {};
      store.state.datafrequentation.forEach((value, key) => {
        let freq2 = {};

        store.state.datafrequentation.get(key).forEach((un, deux) => {
          freq2[deux] = store.state.datafrequentation.get(key).get(deux);
        });
        freq[key] = freq2;
      });

      this.jsonfiledata = [{ horaire: horaire, freq: freq }];
    }
  }
};
</script>
