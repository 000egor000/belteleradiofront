<template>
	<div class="tableForms">
		<table class="table">
			<thead>
				<tr>
					<td>{{ dateTable }}</td>
					<td>{{ UF_SHOW }}</td>
					<td>{{ UF_GO }}</td>
					<td>{{ isCtr }}</td>
				</tr>

				<tr>
					<th>Дата</th>
					<th>Показы</th>
					<th>Клики</th>
					<th>СTR (%)</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in statisticData" :key="item.ID">
					<td>{{ item.UF_DATE_T }}</td>
					<td>{{ item.UF_SHOW }}</td>
					<td>{{ item.UF_GO }}</td>
					<td>{{ item.CTR }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
export default {
	data() {
		return {}
	},

	props: {
		statisticData: {
			type: Array,
			require: true,
		},
		dateTable: {
			type: String,
			require: true,
		},
	},

	computed: {
		UF_SHOW: function () {
			let sum = 0
			for (const iterator of this.statisticData) {
				sum += iterator.UF_SHOW
			}
			return sum
		},
		UF_GO: function () {
			let sum = 0
			for (const iterator of this.statisticData) {
				sum += iterator.UF_GO
			}
			return sum
		},
		isCtr: function () {
			let sum = 0
			for (const iterator of this.statisticData) {
				sum += Number(String(iterator.CTR).replace(',', '.'))
			}

			return (sum == 0 ? 0 : sum / this.statisticData.length).toFixed(2)
		},
	},
}
</script>
<style>
/*  */
.table thead td {
	border: 1px solid #dddddd;
	padding: 20px 20px;
	font-size: 16px;
	font-family: Helvetica, Arial, sans-serif;
}

@media screen and (max-width: 725px) {
	.table thead td {
		padding: 20px 20px;
	}
}
@media screen and (max-width: 660px) {
	.table thead td {
		font-size: 10px;
		font-family: Helvetica, Arial, sans-serif;
	}
}
</style>
