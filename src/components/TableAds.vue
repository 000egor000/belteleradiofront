<template>
	<div class="tableForms">
		<!-- <div @loadUsers="$emit('loadAds')"> -->
		<table class="table">
			<thead>
				<tr>
					<th></th>
					<th>Название</th>
					<th>Статус</th>
					<th>Кампаниия</th>
					<th>Сортировка</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in ads" :key="item.ID">
					<td>
						<small-modal
							:itemDropdown="itemsDropdown"
							:activity="item.UF_ACTIVITY"
							@delete="deleteAds(item.ID)"
							@update="updateAds(item.ID, item)"
							@activate="activateAds(item.ID, item.UF_ACTIVITY)"
							@statistic="statisticAds(item.ID)"
						/>
					</td>
					<td>
						{{ item.UF_NAME }}
					</td>
					<td>
						{{ item.UF_ACTIVITY_NAME }}
					</td>
					<td>
						{{ item.UF_ADV_COMPANY_NAME }}
					</td>
					<td>
						{{ item.UF_SORTING }}
					</td>
				</tr>
			</tbody>
		</table>
		<!-- </div> -->
	</div>
</template>
<script>
import { directive as onClickaway } from 'vue-clickaway'
import SmallModal from './SmallModal.vue'
import { delAds, updateAdsStatus } from '@/api/company.js'

export default {
	props: {
		itemsDropdown: {
			type: Array,
			require: true,
		},
		ads: {
			type: Array,
			require: true,
		},
	},

	directives: {
		onClickaway: onClickaway,
	},
	created() {},
	methods: {
		away() {
			this.isShowMenu = false
		},
		click() {
			this.isShowMenu = !this.isShowMenu
		},
		async deleteAds(id) {
			let params = {
				ID: id,
			}

			let result = await delAds(params)
			if (result) {
				this.$toast.success('Обьявление удалено')
			}

			this.$emit('loadAds')
		},
		async updateAds(id, data) {
			this.$router.push({
				name: 'adtchange',
				params: { id, data },
			})
		},
		async activateAds(id, active) {
			let params = {
				ID: id,
				UF_ACTIVITY: Number(!active),
			}

			let result = await updateAdsStatus(params)
			if (result) {
				this.$toast.success('Статус обновлен')
			}

			this.$emit('loadAds')
		},
		statisticAds(id) {
			this.$router.push({ name: 'statisticadt', params: { id } })
		},
	},

	components: { SmallModal },
}
</script>
