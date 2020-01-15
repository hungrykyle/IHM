<template>
  <v-app class="vapp">
    <v-content >
     <router-view ></router-view>
    </v-content>
  </v-app>
</template>

<script>
import store from './store/index.js';

export default {
  name: "App",
  data: () => ({
    msg : "coucou",
    listeGare: []
    //
  }),

  //Fonction appelle quand le composant est mounted
  methods: {
    //On ajoute le resultat de l'API dans la variable qui sert d'attribut au composant 
    clique: function(){
      this.listeGare= store.state.result;
    }
  }
};
</script>
<style>
</style>