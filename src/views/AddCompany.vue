<template>
	<div class="changeform">
		<header-item />
		<div class="addCompany">
			<h2 class="title_item">{{ titleAdd }}</h2>
			<form class="addCompany_form" @submit.prevent="sub">
				<div class="input_component">
					<label>
						<p class="input_title">Название кампании</p>
						<input class="input_item" type="text" v-model="dataCompany.UF_NAME" required />
					</label>
				</div>
				<div></div>
				<label class="select">
					<p class="input_title">Тип кампании</p>
					<select class="input_item" v-model="dataCompany.UF_TYPE_COMPANY">
						<option v-for="el in typeCompany" :key="el.ID" :value="el.ID">
							{{ el.NAME }}
						</option>
					</select>
				</label>

				<label class="checkbox_item">
					<p class="input_title input_title--m">Активность</p>
					<input type="checkbox" v-model="dataCompany.UF_ACTIVITY" />
				</label>
				<div>
					<label class="checkbox_item">
						<p class="input_title input_title--m">Случайный показ</p>
						<input type="checkbox" v-model="dataCompany.UF_ACTIVITY_RANDOM" />
					</label>
					<div class="input_component">
						<label>
							<p class="input_title">Дата начала кампании</p>
							<input
								class="input_item"
								type="date"
								v-model="dataCompany.UF_DATA_START"
								:max="dataCompany.UF_DATE_END"
								required
							/>
						</label>
					</div>

					<div class="input_component">
						<label>
							<p class="input_title">Дата окончания кампании</p>
							<input
								class="input_item"
								type="date"
								v-model="dataCompany.UF_DATE_END"
								:min="dataCompany.UF_DATA_START"
								required
							/>
						</label>
					</div>

					<label>
						<p class="input_title">Показывать кампанию:</p>
						<div class="timeControl">
							<span class="input_title input_title--times">с</span>

							<input
								type="time"
								class="input_item--time"
								v-model="dataCompany.UF_SHOW_CAMPAING_WITH"
								:max="dataCompany.UF_SHOW_CAMPAIGN_BY"
							/>

							<span class="input_title input_title--times">по</span>
							<input
								type="time"
								class="input_item--time"
								v-model="dataCompany.UF_SHOW_CAMPAIGN_BY"
								:min="dataCompany.UF_SHOW_CAMPAING_WITH"
							/>
						</div>
					</label>
				</div>

				<label class="sort">
					<p class="input_title input_title--m">Сортировка</p>
					<input
						class="input_sort"
						type="number"
						v-model="dataCompany.UF_SORTING"
						max="999"
						required
					/>
				</label>

				<button-object :src="srcNote" :msg="msg" />
			</form>
		</div>
	</div>
</template>

<script>
import imageNote from '@/assets/btn/note.svg'
import HeaderItem from '@/components/HeaderItem.vue'
import ButtonObject from '@/components/ButtonObject.vue'
import { addCompany, updateCompany, getCompanyById, getTypeCompany } from '@/api/company.js'
export default {
	name: 'App',
	data() {
		return {
			titleAdd: '',
			typeCompany: '',
			dataCompany: {
				UF_NAME: '',
				UF_TYPE_COMPANY: '28',
				UF_DATA_START: '',
				UF_DATE_END: '',
				UF_SORTING: 0,
				UF_ACTIVITY: '',
				UF_ACTIVITY_RANDOM: '',
				UF_SHOW_CAMPAING_WITH: '00:00',
				UF_SHOW_CAMPAIGN_BY: '23:59',
			},
			srcNote: imageNote,

			msg: '',
		}
	},
	async created() {
		if (this.$route.name == 'addchange') {
			this.titleAdd = this.$route.meta.titleUpdate
			this.msg = this.$route.meta.titleBtn
			let params = {
				ID: this.$route.params.id,
			}
			this.dataCompany = await getCompanyById(params)
		}
		if (this.$route.name == 'add') {
			this.titleAdd = this.$route.meta.titleUpdate
			this.msg = this.$route.meta.titleBtn
		}
		this.typeCompany = await getTypeCompany(this.$route.params.id)
	},
	props: { companies: { type: Array, require: true } },
	//

	methods: {
		async sub() {
			let params = {
				ID: this.$route.params.id,
				UF_TYPE_COMPANY: this.dataCompany.UF_TYPE_COMPANY,
				UF_NAME: this.dataCompany.UF_NAME,
				UF_ACTIVITY: Number(this.dataCompany.UF_ACTIVITY),
				UF_ACTIVITY_RANDOM: Number(this.dataCompany.UF_ACTIVITY_RANDOM),
				UF_DATA_START: this.dataCompany.UF_DATA_START,
				UF_DATE_END: this.dataCompany.UF_DATE_END,
				UF_SHOW_CAMPAIGN_BY: this.dataCompany.UF_SHOW_CAMPAIGN_BY,
				UF_SHOW_CAMPAING_WITH: this.dataCompany.UF_SHOW_CAMPAING_WITH,
				UF_SORTING: this.dataCompany.UF_SORTING,
			}
			if (this.$route.name == 'add') {
				let result = await addCompany(params)

				if (result.status === 'success') {
					this.$toast.success(result.message)
					this.$router.go(-1)
				} else if (result.status === 'error' && result.message) {
					this.$toast.error(result.message)
				} else if (result.status === 'error' && !result.message) {
					this.$toast.error('Что-то не так')
				}
			} else {
				let result = await updateCompany(params)

				if (result.status === 'success') {
					this.$toast.success(result.message)
					this.$router.go(-1)
				} else if (result.status === 'error' && result.message) {
					this.$toast.error(result.message)
				} else if (result.status === 'error' && !result.message) {
					this.$toast.error('Что-то не так')
				}
			}
		},
	},

	components: { HeaderItem, ButtonObject },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap');
.addCompany_form {
	padding: 40px 40px 0 40px;
	text-align: left;
	margin-top: 40px;
	border: 0.5px solid #808080;
}
.title_item {
	font-weight: 400;
	font-size: 32px;
	line-height: 44px;
	color: #063f64;
	text-align: left;
}
.sort {
	display: flex;
	align-items: center;
	margin-bottom: 30px;
}

.input_component {
	margin-bottom: 24px;
}
.input_title {
	text-align: left;
	font-size: 16px;
	color: #808080;
	margin-bottom: 8px;
	font-weight: 400;
	font-family: 'Roboto', sans-serif;
}
.input_item--time {
	max-width: 100%;
	width: 130px;
	height: 45px;
	padding: 12px 16px;
	font-size: 16px;
	cursor: pointer;
}
.input_item {
	max-width: 100%;
	width: 360px;
	height: 45px;
	padding: 12px 16px;
	align-items: center;
	cursor: pointer;
}

.input_sort {
	max-width: 100%;
	text-align: center;
	width: 50px;
	height: 32px;
	margin-left: 12px;
	padding: 3px 3px;
	cursor: pointer;
}

.input_title--m {
	margin-bottom: 0;
}
.input_title--time {
	margin: 0 12px;
}
.input_title--times {
	margin: 12px;
}

.input_component--add .input_title--m {
	width: 90px;
	margin-right: 10px;
}
.space_help {
	display: flex;
	align-items: center;
}

.input_item--file {
	display: none;
}

.input_svg {
	display: inline-block;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background: #0172b9;
	margin-right: 12px;
	padding: 7px;
	cursor: pointer;
}

.checkbox_item {
	display: flex;
	align-items: center;
	margin: 24px 0;
	/* margin-bottom: 24px; */
}
.checkbox_item input {
	cursor: pointer;
	margin-left: 12px;
	width: 20px;
	height: 20px;
}

.timeControl {
	display: flex;
	font-family: 'Roboto', sans-serif;
	align-items: center;
	font-size: 16px;
	line-height: 18.75px;
	margin-bottom: 24px;
	border-collapse: collapse;
}

.timeValue {
	width: 65px;
	height: 45px;
	padding: 10px 20px;
}
.select select {
	appearance: none;
	overflow: hidden;
	background: white url('../assets/btn/arrow.svg') no-repeat 93%;
}

@media screen and (max-width: 1440px) {
	.addCompany_form {
		padding: 32px 32px 0 32px;
	}
}

@media screen and (max-width: 725px) {
	.addCompany_form {
		padding: 27px 27px 0 24px;
	}

	.title_item {
		font-size: 20px;
		line-height: 27px;
		margin-bottom: 12px;
	}

	.input_title {
		font-size: 14px;
	}

	.input_item {
		font-size: 16px;
		line-height: 18px;
	}
}
@media screen and (max-width: 660px) {
	.input_component {
		margin-bottom: 12px;
	}
	.title_item {
		font-size: 25px;
		line-height: 30px;
	}
	.addCompany_form {
		margin-top: 20px;

		padding: 15px 15px 0 12px;
	}

	.title_item {
		font-size: 18px;
		line-height: 20px;
		margin-bottom: 6px;
	}

	.input_title {
		font-size: 12px;
	}

	.input_item {
		font-size: 12px;
		line-height: 12px;
		width: 360px;
		height: 35px;
		padding: 6px 8px;
	}

	.timeControl input {
		font-size: 12px;
		width: 75px;
		height: 35px;
		padding: 3px 3px;
	}
	.timeControl {
		margin-bottom: 12px;
	}
}
</style>
