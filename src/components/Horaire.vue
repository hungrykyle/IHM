<!--
Composant affichant les horaires d'une gare
-->

<template>
  <div>
    <table class="ui table">
  <thead>
    <tr><th>Jour</th>
    <th>Horaire</th>
    <th>Horaire jours fériés</th>
  </tr></thead><tbody>
    <tr v-for="gare in allhorairegare"
      :key="gare.msg">
    
    
   
      <td>{{ gare[1].get("jour") }}</td>
      <td>{{ gare[1].get("horaire_normal") }}</td>
      <td>{{ gare[1].get("horaire_ferie") }}</td>
    </tr>
    
  </tbody>
</table>

      
    </div>

</template>
<script>
import { mapState } from "vuex";
import store from "../store/index.js";
export default {
  data: function() {
    return {
      horaire: true
    };
  },

  methods: {
    check() {
      if (store.state.allhorairegare.size === 0) {
        document.getElementById("feedback").innerHTML +=
          "Horaires de la gare non disponible";
      } else {
        // eslint-disable-next-line no-console
        console.log(store.state.allhorairegare);
        const obj = Object.fromEntries(store.state.allhorairegare);
		
		let testjson = new Map();
		testjson.set("oui",obj);
		// eslint-disable-next-line no-console
        console.log(Object.fromEntries(testjson));
      }
    }
  },
  mounted: function() {
    this.check();
  },
  computed: mapState(["allhorairegare"])
};
</script>
<style type="text/css">
.element {
  display: grid;
  grid-template-columns: 4fr 7fr;
}
td{
  background-color: #f9fafb;
}
</style>
