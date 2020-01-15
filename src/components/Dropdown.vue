<!--
Composant de l'onglet filter
-->


<template lang="html">
  <sui-dropdown
                text="Filter Posts"
                icon="filter"
                floating
                labeled
                button
                class="icon"
                v-model="selectedValue"
                :menu-header="menuHeader"
                :search-in-menu="searchInMenu"
                :options="options"

  />
</template>

<script>
import store from "../store/index.js";
export default {
  name: 'DropdownExample',
  data() {
    return {
      menuHeader: {
        icon: '',
        content: 'Header',
      },
      searchInMenu: {
        icon: 'search',
        iconPosition: 'left',
      },
      selectedValue: 'Name',
      options: [
        {
          key: 'Name',
          text: 'Nom de la gare',
          value: 'Name',
          label: { color: 'red', empty: true, circular: true },
        },
        {
          key: 'Departement',
          text: 'Département',
          value: 'Departement',
          label: { color: 'blue', empty: true, circular: true },
        },
        {
          key: 'Commune',
          text: 'Commune',
          value: 'Commune',
          label: { color: 'black', empty: true, circular: true },
        },
        {
          key: 'Historique',
          text: 'Historique des gares consulté',
          value: 'Historique',
          label: { color: 'yellow', empty: true, circular: true },
        },
      ],
    };
  },
  mounted: function(){
    store.dispatch("changeFilter",{
      value: "Name"
    })
  },
  watch: {
    selectedValue: function() {
      // eslint-disable-next-line no-console
      console.log(this.$parent.query);
      store.dispatch("changeFilter", {
        value: this.selectedValue
      });
      if(this.selectedValue == "Historique"){
        store.dispatch("queryGare", {
          liste: store.state.historiqueGare
        })
      }
      else{
        store.dispatch("queryGare", {
          liste: store.state.nameGare
        })
      }
      //Vide l'input lorsque que l'on change de critère de recherche
      this.$parent.query = "";
    }
  }
};
</script>
