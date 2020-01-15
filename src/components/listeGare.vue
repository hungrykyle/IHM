<!--
Composant qui affiche toutes les gares qui corrrespondent a la requête
-->

<template>
  <div class="list ui attached segment cont" id="divprincipale">
    <div class="recherche">
      <Dropdown id="Dropdown" />
      <div class="recherche ui category search">
        <div class="ui icon input">
          <input class="prompt" v-model="query" placeholder="Recherche.." />
          <i class="search icon" />
        </div>
      </div>
    </div>
    <div class="resultat">
      <div
        class="element gare"
        v-on:click.stop="afficheGare"
        v-for="gare in result"
        :key="gare[0]"
        :id="gare[1].get('nom') + ' - ' + gare[1].get('code_uic')"
        
      >
        <div class="icones">
          <sui-icon class="icones" size="huge" name="train" />
        </div>
        <div>
          
          <h4>{{ gare[1].get("nom") }}</h4>
          <p>{{ gare[1].get("commune") }}</p>
          <p>{{ gare[1].get("departement") }}</p>
          <p>{{ $route.params.id }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import store from "../store/index.js";
import Dropdown from "@/components/Dropdown.vue";
export default {
  components: {
    Dropdown
  },
  data: () => ({
    query: "",
    resultFiltre: []
  }),
  computed: mapState(["result", "nameGare", "namedepartement", "namecommune"]),
  methods: {
    afficheGare: function(event) {
      //Pour affichage de la date en francais
      this.$moment().locale("fr");
      
      
      const words = (event.currentTarget.id).split(' - ');
      store.dispatch("currentGare", {
        gare: words[0]
      });
      store.dispatch("setEtatPage", {
        i: 1
      });
      store.dispatch("objetTrouve", {
        gare: words[1]
      })
      //Eleve les boutons inutile 
      document.getElementById("previous").style.display="none";
      document.getElementById("next").style.display="none";
      document.getElementById("toutesGare").style.display="none";
      this.$router.push("/recherche/infogare/");
    }
  },
  watch: {
    //Fonction qui écoute la variable query qui est le contenue de l'input
    query: function() {
      
      var vm = this;
      var listeQuery = [];
      var indexItem = 0
      var listeIndex = [];
      //Filter
      if(store.state.filter == "Name"){
        this.resultFiltre = this.nameGare.filter(function(item) {
          if (item.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1) {
            listeQuery.push(item);
          }
        });       
      }
      if(store.state.filter == "Departement"){
        this.resultFiltre = this.namedepartement.filter(function(item) {
          if (item.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1){
            listeIndex.push(indexItem);
          }
          indexItem++;
        })
        for(var i in listeIndex){
          listeQuery.push(vm.nameGare[listeIndex[i]]);
        }        
      }
      if(store.state.filter == "Commune"){
        this.resultFiltre = this.namecommune.filter(function(item) {
          if (item.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1){
            listeIndex.push(indexItem);
          }
          indexItem++;
        })
        for(var y in listeIndex){
          listeQuery.push(vm.nameGare[listeIndex[y]]);
        }        
      }
      store.dispatch("queryGare", {
        liste: listeQuery
      });

    }
  }
};
</script>
<style>
.recherche{
  display: inline-block;
  margin-bottom: 5px;
}
.gare {
  height: 13vh;
  background: linear-gradient(#578BC7) !important;
  margin-bottom: 30px;
  box-shadow:2px 2px 2px gray,
  -1px -1px 2px white;
  border-radius: 30px;
  padding:auto;
  text-align: center;
}
#divprincipale{
  border-style: solid;
  border-color: gray !important;
  border-radius: 10px;
  border-width: 2px !important;
}
.cont{
  background: linear-gradient(#FFFFFF) !important;
  
  border-color: gray !important;
  border-radius: 10px;
  border-width: 2px !important;
  
  color: #deead5;
}
.resultat {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 30px;
}
.icones {
  vertical-align: bottom;
}
</style>
