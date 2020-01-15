/* eslint-disable no-undef */
import Vue from "vue";

import SuiVue from "semantic-ui-vue";

import "semantic-ui-css/semantic.min.css";

import {LMap, LTileLayer, LMarker} from "vue2-leaflet";

import * as d3 from "d3";

import Paginate from 'vuejs-paginate';

import VueMoment from 'vue-moment';

import App from "./App.vue";
import router from "./router";
import store from "./store";

import vuetify from "./plugins/vuetify";
const moment = require('moment');
require('moment/locale/fr');
Vue.use(VueMoment, {
  moment
  });


Vue.use(d3);
Vue.use(SuiVue);
Vue.component('paginate', Paginate);
Vue.component("l-map",LMap);
Vue.component("l-tile-layer",LTileLayer);
Vue.component("l-marker",LMarker);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
