<!--
Compossant map leaflet
-->
<template>
  <div class="map">
    <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
      <l-marker
        v-for="gare in mapMarker"
        v-bind:key="gare[0]"
        :id="gare[1].get('nom')"
        :lat-lng="gare[1].get('coordonnee')"
        v-on:click="markerClique(gare[1].get('nom'))"
      ></l-marker>
      <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store/index.js";
export default {
  computed: mapState(["mapMarker"]),
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 6,
      center: [46.52863469527167,2.43896484375],
      bounds: null
    };
  },
  methods: {
    markerClique: function(id) {
      store.dispatch("currentGare", {
        gare: id
      });
      store.dispatch("setEtatPage", {
        i: 1
      });
      this.$router.push("/recherche/infogare/");
      document.getElementById("previous").style.display="none";
      document.getElementById("next").style.display="none";
      document.getElementById("toutesGare").style.display="none";
    }
  }
};
</script>
<style>
  .map{
    border-style: solid;
    border-color: gray !important;
    border-width: 2px !important;
  }
  l-marker{
    background: linear-gradient(rgb(162,24,60), rgb(215,15,22)) !important;
  }
</style>
