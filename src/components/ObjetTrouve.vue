<!--
Compossant de l'onglet objet trouve
  -->

<template>
  <div>
    <div class="ui top attached tabular menu">
      <a v-on:click="tableau" class="item active">Liste des objets trouvés</a>
      <a v-on:click="statsOb" class="item active"
        >Statistique sur les objets trouvés</a
      >
    </div>
    <div class="ui bottom attached segment infoContent">
      <router-view />
    </div>
  </div>
</template>
<script>
import store from "../store/index.js";
import { mapState } from "vuex";
export default {
  data: function() {
    return {
      freq: true
    };
  },
  computed: mapState(["objettrouve", "pageObjettrouve", "objetCurrentPage"]),
  methods: {
    tableau: function() {
      this.$router.push("/recherche/infogare/objet_trouve/liste_objet");
      // eslint-disable-next-line no-console
      console.log("tableau");
    },
    statsOb: function() {
      this.$router.push("/recherche/infogare/objet_trouve/stats");
      // eslint-disable-next-line no-console
      console.log("stats");
    },
    changePage: function() {
      store.dispatch("setPageObjet", {
        page: event.target.innerText
      });
      // eslint-disable-next-line no-console
      console.log(event.target.innerText);
    }
  }
};
</script>
<style>


</style>