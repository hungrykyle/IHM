<!--
Composant du graphique camembert des objets trouves
-->

<template>
  <div v-if="this.freq">
    <canvas id="pieChart" width="1170px" height="585px" />
  </div>
</template>
<script>
import store from "../store/index.js";
import { mapState } from "vuex";
import Chart from "chart.js";
export default {
  data: function() {
    return {
      freq: true
    };
  },
  computed: mapState(["objettrouve", "pageObjettrouve", "objetCurrentPage"]),
  mounted: function() {
    try {
      this.createChart();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
  methods: {
    createChart: function() {
      new Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
          labels: store.state.statslabels,
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: [
                "#0088ce",
                "#cd0037",
                "#d2e100",
                "#82be00",
                "#a1006b",
                "#3cba9f",
                "#e05206",
                "#8e5ea2",
                "#ffb612",
                "#e8c3b9",
                "#c45850"
              ],
              data: store.state.statsnumber
            }
          ]
        },
        options: {
          legend: {
            labels: {
            display: true,
            fontColor: "black",
            fontSize : 12
            }
          },
          title: {
            display: true,
            text: "Objet trouvés par types",
            fontColor: "black",
            fontSize : 16
          }
        }
      });
    }
  }
};
</script>
<style>
</style>