/* eslint-disable no-console */

<!--
Vue principale
  -->
<template>
  <div>
    <div class="container">
      <router-view />
      <Map class="map" />
      <div class="ui two bottom attached buttons">
        <button class="ui button" id="previous" v-on:click="prev()">Précédent</button>
        <button class="ui button" id="next" v-on:click="next()">Suivant</button>
      </div>
      <button class="ui button toutesGare" id="toutesGare" v-on:click="afficheAllGare">
        Afficher toutes les gares
      </button>
    </div>
  </div>
</template>
<script>
import Map from "@/components/Map.vue";
import store from "../store/index.js";
import { mapState } from "vuex";

export default {
  name: "Recherche",

  components: {
    Map
  },
  created: function() {
    var vm = this;
    //Appel a l'api pour récuperer toutes les gares
    store.dispatch("allGare").then(function(){
      // eslint-disable-next-line no-console
      vm.$router.push("/recherche/liste_gare");
    });
  },
  computed: mapState(["result", "nbpage", "allgare", "nameGare"]),
  methods: {
    clique: function() {
      this.listeGare = store.state.result;
    },
    clickCallback: function(pageNum) {
      store.dispatch("turnPage", {
        page: pageNum
      });
    },

    prev: function() {
      if (store.state.etatPage == 0) {
        var pageP = store.state.numpage - 1;
        if (pageP < 1) {
          pageP = Math.round(store.state.queryList.length / 15);
        }
        store.dispatch("turnPage", {
          page: pageP
        });
        document.getElementById("toutesGare").innerText = "Afficher toutes les gares";

      } else {
        var indexP = store.state.indexPage - 1;
        if (indexP < 0) {
          indexP = store.state.queryList.length - 1;
        }
        this.$router.push("/recherche/infogare/");
        store.dispatch("changeCurrentGare", {
          index: indexP
        });
      }
    },
    next: function() {
      if (store.state.etatPage == 0) {
        // eslint-disable-next-line no-console
        console.log(Math.round(store.state.queryList.length / 15));
        var pageP = store.state.numpage + 1;
        if (pageP > Math.round(store.state.queryList.length / 15)) {
          pageP = 1;
        }
        store.dispatch("turnPage", {
          page: pageP
        });
        document.getElementById("toutesGare").innerText = "Afficher toutes les gares";

      } else {
        var indexP = store.state.indexPage + 1;
        if (indexP > store.state.queryList.length - 1) {
          indexP = 0;
        }
        this.$router.push("/recherche/infogare/");
        store.dispatch("changeCurrentGare", {
          index: indexP
        });
      }
    },
    afficheAllGare: function() {
      // eslint-disable-next-line no-console
      var txt = document.getElementById("toutesGare");
      if(txt.innerText == "Afficher toutes les gares"){
            store.dispatch("afficheToutesGares");
            document.getElementById("toutesGare").innerText = "Désactiver l'affichage de toutes les gares";        
      }
      else{
        store.dispatch("turnPage",{
          page: store.state.numpage
        })
        document.getElementById("toutesGare").innerText = "Afficher toutes les gares";
      }

    }
  }
};
</script>
<style type="text/css">

.container {
  display: grid;
  grid-template-columns: 7fr 4fr;
  grid-column-gap: 20px;
}
.list {
  height: 85vh;
}
.map {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 85vh;
}
.element {
  display: grid;
  padding: 5px;
  box-shadow: 2px 2px 2px gray, -1px -1px 2px white;
}
.pagination {
  display: grid;
  list-style: none;
  grid-template-columns: repeat(10, 1fr);
}
</style>
