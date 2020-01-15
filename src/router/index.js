import Vue from "vue";

import VueRouter from "vue-router";

import SuiVue from "semantic-ui-vue";

import chargement from "../components/Chargement.vue";
import Export from "../components/Export.vue";
import Frequentation from "../components/Frequentation.vue";
import Horaire from "../components/Horaire.vue";
import trouve from "../components/ObjetTrouve.vue";
import infoGare from "../components/infoGare.vue";
import listeGare from "../components/listeGare.vue";
import liste_objet from "../components/liste_objet.vue";
import stats from "../components/stats.vue";
import test from "../components/test.vue";
import About from "../views/About.vue";
import Recherche from "../views/Recherche.vue";
Vue.use(VueRouter);
Vue.use(SuiVue);

//Router

const routes = [
  {
    path: "/",
    name: "Recherche",
    component: Recherche
  },
  {
    path: "/Recherche/",
    name: "Recherche",
    component: Recherche,
    children: [{
      path: "",
      component: chargement
    },
    {
      path: "liste_gare",
      component: listeGare 
    },
    {
      path: "infogare",
      component: infoGare,
      children: [{
        path: "",
        component: test
      },{
        path: "test",
        component: test
      },
      {
        path: "Horaire",
        component: Horaire
      },
      {
        path: "Frequentation",
        component: Frequentation
      },
      {
        path: "Export",
        component: Export
      },
      {
        path: "objet_trouve",
        component: trouve,
        children:[{
          path: "",
          component: liste_objet
        },{
          path:"stats",
          component: stats
        },{
          path:"liste_objet",
          component: liste_objet
        }]
      }
    ]
    }]
  },
  {
    path: "/About/",
    name: "About",
    component: About
  }
];

const router = new VueRouter({
  mode: "history",
  routes: routes
});

export default router;
