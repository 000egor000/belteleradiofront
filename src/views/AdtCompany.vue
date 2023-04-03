<template>
	<div class="adt">
		<header-item />
		<h2 class="title_item">{{ nameTitle }}</h2>
		<button-object @eventClick="eventClick" :src="srcPlus" :msg="msg" />
		<table-ads :itemsDropdown="itemsDropdown" :ads="ads" @loadAds="loadAdsUp" />
	</div>
</template>

<script>
import imagePlus from '@/assets/btn/+.svg'
import HeaderItem from '@/components/HeaderItem.vue'
import ButtonObject from '@/components/ButtonObject.vue'
import TableAds from '@/components/TableAds.vue'
import { getAds } from '@/api/company.js'

export default {
	name: 'App',

	data() {
		return {
			nameTitle: 'Объявления',
			msg: 'Добавить объявление',
			srcPlus: imagePlus,
			ads: [],
			nameCompany: '',

			itemsDropdown: [
				{ id: 1, title: 'Редактировать', type: 'update' },
				{ id: 2, title: '', type: 'activate' },
				{
					id: 3,
					title: 'Статистика',
					type: 'statistic',
				},
				{ id: 4, title: 'Удалить компанию', type: 'delete' },
			],
		}
	},

	async created() {
		await this.loadAds(this.$route.params.id)
	},

	methods: {
		eventClick() {
			this.$router.push({
				name: 'addadt',
				params: { typeCompany: this.typeCompany },
			})
		},
		async loadAds(id) {
			let params = {
				ID: id,
			}
			let data = await getAds(params)
			this.ads = data
		},
		async loadAdsUp() {
			await this.loadAds(this.$route.params.id)
		},
	},
	components: { ButtonObject, TableAds, HeaderItem },
}
</script>

<style></style>
