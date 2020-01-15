<!--
Encadré pour chaque gare dans la liste
-->

<template>
	<div>
		<div class="ui segment element" v-for="gare in result" :key="gare.msg">
			<div>
				<sui-icon size="huge" name="train" />
			</div>
			<div>
				<h4>{{gare[0]}}</h4>
				<p>{{gare[1].get("commune")}}</p>
				<p>{{gare[1].get("departement")}}</p>
				<p>{{$route.params.id}}</p>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState} from "vuex";
export default {

	computed: mapState(["result"]),
}
</script>
<style type="text/css">
	.element {
		display: grid;
		grid-template-columns: 4fr 7fr;
	}
</style>