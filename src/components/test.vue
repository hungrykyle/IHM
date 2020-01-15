<!--
Onglet information
-->

<template>
  <div>
    <table class="ui table">
      <thead>
        <tr>
          <th>Nom de la gare</th>
          <th>Département</th>
          <th>code gui</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ currentGarename }}</td>
          <td>{{ currentdepartementGare }}</td>
          <td>{{ uicgare }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["currentGarename", "currentdepartementGare", "uicgare"])
};
</script>
<style></style>
