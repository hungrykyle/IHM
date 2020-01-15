<!--
Liste des objets trouvés pour la current gare
-->

<template>
  <div>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>Type d'objet</th>
          <th>Date</th>
          <th>Date de restitution</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="objet in objetCurrentPage" :key="objet[0]">
          <td data-label="objet">{{ objet.fields.gc_obo_type_c }}</td>
          <td data-label="date">
            {{ objet.fields.date | moment("dddd Do MMMM YYYY") }}
          </td>
          <td data-label="dateR">
            {{
              objet.fields.gc_obo_date_heure_restitution_c
                | moment("dddd Do MMMM YYYY")
            }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="5">
            <div class="ui right floated pagination menu">
              <a
                v-for="page in objettrouve"
                v-on:click="changePage"
                :key="page[0]"
                class="item"
                >{{ page[0] }}</a
              >
            </div>
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
import store from "../store/index.js";
import { mapState } from "vuex";
export default {
  computed: mapState(["objettrouve", "pageObjettrouve", "objetCurrentPage"]),
  methods: {
    changePage: function(event) {
      store.dispatch("setPageObjet", {
        page: event.target.innerText
      });
    }
  }
};
</script>
