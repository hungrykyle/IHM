<!--
Composant utilisé pour la page des gares 
-->

<template>
  <div class="ui attached segment contGare">
    <button class="ui button" v-on:click="retour">Retour</button>
    <div v-for="gare in currentGare" :key="gare[1].get('nom')" >
     
      <div id="feedback"></div>
      <h1>{{ gare[1].get("nom") }}</h1>
      <div class="ui top attached tabular menu">
        <a v-on:click="test" :id="gare[1].get('code_uic')" class="item active"> Informations</a>
        <a v-on:click="horaire"  :id="gare[1].get('code_uic')" class="item"> Horaire </a>
        <a v-on:click="frequentation"  :id="gare[1].get('code_uic')" class="item"> Fréquentation </a>
        <a v-on:click="trouve" :id="gare[1].get('code_uic')" class="item obj"> Objets trouvés </a>
        <a v-on:click="exportation" :id="gare[1].get('code_uic')" class="item"> Exportation </a>
      </div>
      <div class="ui bottom attached segment infoContent">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/index.js";
import { mapState } from "vuex";


export default {
  name: "infoGare",
  
  created: function() {
    //On récolte les données pour la currentgare
    store.dispatch("horaireGare", {
      ville: store.state.uicgare
    });
    store.dispatch("frequentationGare", {
      ville: store.state.uicgare
    });
    store.dispatch("objetTrouve", {
        gare: store.state.uicgare
    })
  },
  computed: mapState([
    "allhorairegare",
    "datafrequentation",
    "nameGare",
    "currentGare",
    "departementmap"
  ]),
  mounted: function() {
    this.jsonfile();
  },
  methods: {
    // Les différentes méthodes pour naviguer dans la page
    retour: function() {
      store.dispatch("setEtatPage", {
        i: 0
      });
      document.getElementById("feedback").innerHTML = "";
      this.$router.push("/recherche/liste_gare");
      store.dispatch("returnListe");
      document.getElementById("previous").style.display="block";
      document.getElementById("next").style.display="block";
      document.getElementById("toutesGare").style.display="block";

    },
    test: function(event) {
      // eslint-disable-next-line no-console
      console.log(store.state.departementmap);
      document.getElementsByClassName("active")[0].className = "item";
      event.currentTarget.className = "item active";
      document.getElementById("feedback").innerHTML = "";
      this.$router.push("/recherche/infogare/test");
    },
    horaire: function(event) {
      // eslint-disable-next-line no-console
      console.log("LE UIC QUI MARCHE PAS LA" + store.state.uicgare);
      store.dispatch("horaireGare", {
      ville: event.currentTarget.id
    });
      document.getElementsByClassName("active")[0].className = "item";
      event.currentTarget.className = "item active";
      document.getElementById("feedback").innerHTML = "";
      this.$router.push("/recherche/infogare/Horaire");
    },
    trouve: function(event) {
      store.dispatch("objetTrouve", {
        gare: event.currentTarget.id
      })
      store.dispatch("setPageObjet",{
        page: 1
      })
      document.getElementsByClassName("active")[0].className = "item";
      event.currentTarget.className = "item active";
      document.getElementById("feedback").innerHTML = "";
      this.$router.push("/recherche/infogare/objet_trouve");
    },
    frequentation: function(event) {
      // eslint-disable-next-line no-console
      console.log(event.currentTarget.id);
      store.dispatch("frequentationGare", {
      ville: event.currentTarget.id
    });
      document.getElementsByClassName("active")[0].className = "item";
      event.currentTarget.className = "item active";
      document.getElementById("feedback").innerHTML = "";
      this.$router.push("/recherche/infogare/Frequentation");
    },
    exportation: function(event) {
      document.getElementsByClassName("active")[0].className = "item";
      event.currentTarget.className = "item active";
      document.getElementById("feedback").innerHTML = "";
      this.$router.push("/recherche/infogare/Export");
    },
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
<style >
  .contGare{
    background: linear-gradient( white) !important;
   border-style: solid;
  border-color: gray !important;
  border-radius: 10px;
  border-width: 2px !important;
  }
  .infoContent{
    background: linear-gradient(white) !important;
  }
  .active{
    background-color:white !important;
  }
</style>