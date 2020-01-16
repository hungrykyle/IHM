<!--
Composant s'occupant du traitement des données à transmettre aux deux graphes de l'onglet fréquentation
-->
<template>
  <div  class="ui container">
    <div
      class=""
      v-for="gare in datafrequentation"
      :key="gare.msg"
    >
   
      <div>
      
     

        <canvas  class="graph" id="planet-chart"></canvas>
        <hr>
        <canvas  class="graph" id="bar-chart"></canvas>
       
      </div>
    </div>
  </div>
</template>
<script>

import Chart from "chart.js";
import store from "../store/index.js";
import { mapState } from "vuex";
export default {
  name: "Frequentation",
  data: function() {
    return {
      show : true,
      freq: true
    };
  },
  computed: mapState(["datafrequentation"]),
  mounted: function() {
   
    try {
      
    let department = store.state.departementmap;
    //let currentname = store.state.currentGarename;
    let departementfrequentation = store.state.departementfrequentation;
    let uic = store.state.uicgare;
    // eslint-disable-next-line no-unused-vars
    let datadepartement = departementfrequentation.get(department.get(uic));
    let datanational = store.state.nationalfrequentation;
      let lab = store.state.datafrequentation;
      let dataf = lab
        .values()
        .next()
        .value.values();
      let data1 = dataf.next().value;
      let data2 = dataf.next().value;
      let data3 = dataf.next().value;
      let data4 = dataf.next().value;
      let planetChartData = this.filldataplanetchart(
        data1,
        data2,
        data3,
        data4,
        dataf
      );
      let barchart = this.fillbarchart(
        data1,
        data2,
        data3,
        data4,
        datadepartement,
        datanational
      );
      this.createChart("bar-chart", barchart);
      
      // eslint-disable-next-line no-console
      this.createChart("planet-chart", planetChartData);
    } catch (error) {
      document.getElementById("feedback").innerHTML +=
        "Fréquentation de la gare non disponible";
      this.freq = false;
    }
  },
  methods: {
    fillbarchart(data1, data2, data3, data4, datadepartement,datanational) {
      const barChartData = {
      type: "bar",
        data: {
          labels: ["Nombre de voyageurs en 2015", "Nombre de voyageurs en 2016", "Nombre de voyageurs en 2017","Nombre de voyageurs en 2018"],
          datasets: [
            {
              // one line graph
              label: "Local",

              data: [data1, data2, data3, data4],
              backgroundColor: [
                "#8BBCF0",
                "#8BBCF0",
                "#8BBCF0",
                "#8BBCF0",
              ],
              borderColor: ["#8BBCF0", "#8BBCF0", "#8BBCF0", "#8BBCF0"],
              borderWidth: 3
            },
            {
              // one line graph
              label: "Département",

              data: [
                datadepartement.get("total_voyageurs_2015"),
                datadepartement.get("total_voyageurs_2016"),
                datadepartement.get("totalvoyageurs2017"),
                datadepartement.get("total_voyageurs_2018")
              ],
              backgroundColor: [
                "rgba(54,73,93,.5)", // Blue
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)"
              ],
              borderColor: ["#36495d", "#36495d", "#36495d", "#36495d"],
              borderWidth: 3
            },
            {
              // one line graph
              label: "National",
              hidden: true,
              data: [
                datanational.get("total_voyageurs_2015"),
                datanational.get("total_voyageurs_2016"),
                datanational.get("totalvoyageurs2017"),
                datanational.get("total_voyageurs_2018")
              ],
              backgroundColor: [
                "#263442", // Blue
                "#263442",
                "#263442",
                "#263442"
              ],
              borderColor: ["#263442", "#263442", "#263442", "#263442"],
              borderWidth: 3
            }
          ]
        },
        options: {
          title: {
            display: true,
            fontColor: "black",
            fontSize: 18,
            text: "Fréquentation des gares à l'échelle communale, départementale et nationale"
          },
          legend: {
            labels: {
            display: true,
            fontColor: "black",
            fontSize: 18
            }
          },
          responsive: true,
          barValueSpacing: 20,
          maintainAspectRatio: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                  
                  
            fontColor: "black",
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                  
                  
            fontColor: "black",
                }
              }
            ]
          }
        }
      };
      return barChartData;
    
    },
    filldataplanetchart(data1, data2, data3, data4, dataf) {
      // oui

      // eslint-disable-next-line no-unused-vars
      const planetChartData = {
        type: "line",
        data: {
          labels: ["2015", "2016", "2017", "2018"],
          datasets: [
            {
              // one line graph
              label: "Nombre de voyageurs en fonction de l'année",
              data: [data1, data2, data3, data4],
              backgroundColor: [
                "rgba(54,73,93,.5)", // Blue
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)"
              ],
              borderColor: ["#36495d", "#36495d", "#36495d", "#36495d"],
              borderWidth: 3
            },
            {
              // one line graph
              label: "Nombre de voyageurs et de non-voyageurs en fonction de l'année",
              data: [
                dataf.next().value,
                dataf.next().value,
                dataf.next().value,
                dataf.next().value
              ],
              backgroundColor: [
                "rgba(71, 183,132,.5)", // Blue
                "rgba(71, 183,132,.5)",
                "rgba(71, 183,132,.5)",
                "rgba(71, 183,132,.5)"
              ],
              borderColor: ["#47b784", "#47b784", "#47b784", "#47b784"],
              borderWidth: 3
            }
          ]
        },
        options: {
          title: {
            display: true,
            fontColor: "black",
            fontSize: 18,
            text: "Evolution de la fréquentation de la gare en fonction de l'année"
          },
          legend: {
            labels: {
            display: true,
            fontColor: "black",
            fontSize: 18
            }
          },
          responsive: true,
          maintainAspectRatio: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                  
                  
            fontColor: "black",
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                  
                  
            fontColor: "black",
                }
              }
            ]
          }
        }
      };
      return planetChartData;
    },
    
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      // eslint-disable-next-line no-console
      console.log(chartData);

      // eslint-disable-next-line no-unused-vars
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
        
      });
    }
  }
};
</script>
<style type="text/css">
.ui .container{
  width: auto;
}
.element {
  display: grid;
  grid-template-columns: 4fr 7fr;
}
h1{
  text-align : center;
}


</style>
