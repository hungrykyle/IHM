<template>
  <div>
    <div id="staggered-list-demo">
      <input v-model="query" />
      <transition-group name="staggered-fade" tag="div" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" class="ui items">
        <!-- <li v-for="(item, index) in resultFiltre" v-bind:key="item.msg" v-bind:data-index="index">{{item.msg}}</li>-->
        <ElementRecherche v-for="(item, index) in resultFiltre" v-bind:key="item.msg" v-bind:data-index="index" :msg="item.msg" />
      </transition-group>
    </div>
    <Map />
  </div>
</template>

<script>
import Velocity from "velocity-animate";
import ElementRecherche from "./ElementRecherche";
import Map from "./Map";
export default {
  props: {
    source: String,
    msg: String,
    liste: Array
  },
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
    query: "",
    resultFiltre: []
  }),
  components: {
    ElementRecherche,
    Map
  },
  methods: {
    //Methode d'effet
    beforeEnter: function(el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    enter: function(el, done) {
      var delay = el.dataset.index * 150;
      setTimeout(function() {
        Velocity(
          el,
          { opacity: 1, height: '1.6em' },
          {complete: done }
        )
      }, delay);
    },
    leave: function(el, done) {
      var delay = el.dataset.index * 150;
      setTimeout(function() {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay);
    }
  },
  watch: {
    //Methode appele quand la variable query est modif
    query: function() {
      var vm = this;
      this.resultFiltre = this.liste.filter(function(item) {
        if (vm.query == "") {
          return false;
        }
        return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1;
      });
    }
  }
};
</script>
