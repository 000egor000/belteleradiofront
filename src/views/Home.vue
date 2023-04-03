<template>
	<div class="home">
		<header-item />
		<h2 class="title_item">{{ nameTitle }}</h2>
		<button-object @eventClick="eventClick" :src="srcPlus" :msg="msg" />
		<table-companies
			:itemsDropdown="itemsDropdown"
			:companies="companies"
			@loadCompany="loadCompany"
		/>
	</div>
</template>

<script>
import imagePlus from '@/assets/btn/+.svg'
import HeaderItem from '@/components/HeaderItem.vue'
import ButtonObject from '@/components/ButtonObject.vue'
import TableCompanies from '@/components/TableCompanies.vue'
import { getCompany } from '@/api/company.js'
export default {
	name: 'App',
	data() {
		return {
			nameTitle: 'Кампании',
			srcPlus: imagePlus,
			msg: 'Добавить кампанию',
			companies: [],
			itemsDropdown: [
				{
					id: 1,
					title: 'Перейти к кампании',
					type: 'moveCompany',
				},
				{ id: 2, title: 'Редактировать', type: 'update' },
				{ id: 3, title: '', type: 'activate' },
				{
					id: 4,
					title: 'Статистика',
					type: 'statistic',
				},
				{ id: 5, title: 'Удалить компанию', type: 'delete' },
			],
		}
	},
	async created() {
		await this.loadCompanies()
	},

	methods: {
		async loadCompanies() {
			let data = await getCompany()
			this.companies = data
		},

		eventClick() {
			this.$router.push({ name: 'add' })
		},
		async loadCompany() {
			await this.loadCompanies()
		},
	},

	components: { ButtonObject, TableCompanies, HeaderItem },
}
</script>

<style>
.title_item {
	margin-bottom: 16px;
}
@media screen and (max-width: 725px) {
	.title_item {
		margin-bottom: 12px;
		font-size: 20px;
	}
}
</style>
