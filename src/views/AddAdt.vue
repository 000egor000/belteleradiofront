<template>
	<div class="changeform">
		<header-item />

		<div class="adtCompany">
			<h2 class="title_item">{{ titleAdd }}</h2>
			<form id="formElem" class="addCompany_form" @submit.prevent="submitForm">
				<div class="input_component">
					<label>
						<p class="input_title">Название объявления</p>
						<input class="input_item" type="text" v-model="dataAds.UF_NAME" required />
					</label>
				</div>

				<label class="checkbox_item">
					<p class="input_title input_title--m">Активность</p>
					<input type="checkbox" v-model="dataAds.UF_ACTIVITY" />
				</label>

				<div class="input_component">
					<label>
						<p class="input_title">Ссылка в объявлении</p>
						<input class="input_item" type="text" v-model="dataAds.UF_LINK_IN_AD" required />
					</label>
				</div>

				<label class="checkbox_item">
					<p class="input_title input_title--m">Открывать ссылку в новом окне</p>
					<input type="checkbox" v-model="dataAds.UF_OPEN_LINK_IN_NEW_WINDOW" />
				</label>

				<div class="input_component">
					<label for="input_item--fileVideo">
						<p class="input_title">Загрузить видеоролик</p>
						<div class="space_help">
							<span class="custom_input">{{ video }}</span>
							<div class="input_svg">
								<svg width="18px" height="18px">
									<use xlink:href="@/assets/icons.svg#icon-6"></use>
								</svg>
							</div>
						</div>
					</label>

					<input
						class="input_item input_item--file"
						id="input_item--fileVideo"
						type="file"
						name="video"
						@change="changeVideo"
						ref="file"
						accept="video/*"
					/>
				</div>

				<div class="input_component input_component--add" v-show="isShow">
					<p class="input_title">Показывать объявление</p>

					<label class="checkbox_item checkbox_item--time" v-for="item in typeTime" :key="item.ID">
						<p class="input_title input_title--m">{{ item.NAME }}</p>
						<input
							type="checkbox"
							:id="item.ID"
							@change="changeTypeTime(item.ID)"
							:checked="issetInArray(dataAds.UF_AD_IMPRESSION, item.ID)"
						/>
					</label>
				</div>

				<div class="input_component">
					<label for="input_item--fileUrl">
						<p class="input_title">URL страницы сайта для показа объявления</p>
						<div class="space_help">
							<input class="input_item" type="url" v-model="newUrl" />

							<div class="input_svg" @click.prevent="clickUrl">
								<svg width="18px" height="18px">
									<use xlink:href="@/assets/icons.svg#icon-7"></use>
								</svg>
							</div>
						</div>
						<ul>
							<li class="itemUrl" v-for="(el, index) in url" :key="index">
								<span class="elemUrl">{{ el }}</span>
								<button class="btn_cloce" @click.prevent="url.splice(index, 1)">
									<svg width="20px" height="20px">
										<use xlink:href="@/assets/icons.svg#icon-8"></use>
									</svg>
								</button>
							</li>
							<li
								class="itemUrl"
								v-for="(el, index) in this.dataAds.UF_URL_PAGE_SHOW_AD"
								:key="index"
							>
								<span class="elemUrl">{{ el }}</span>
								<button
									class="btn_cloce"
									@click.prevent="dataAds.UF_URL_PAGE_SHOW_AD.splice(index, 1)"
								>
									<svg width="20px" height="20px">
										<use xlink:href="@/assets/icons.svg#icon-9"></use>
									</svg>
								</button>
							</li>
						</ul>
					</label>
				</div>

				<label class="sort">
					<p class="input_title input_title--m">Сортировка</p>
					<input
						class="input_sort"
						type="number"
						v-model.number="dataAds.UF_SORTING"
						max="999"
						required
					/>
				</label>
				<button-object class="upload_video" :src="srcNote" :msg="msg" />
			</form>
		</div>
	</div>
</template>

<script>
import imageNote from '@/assets/btn/note.svg'
import HeaderItem from '@/components/HeaderItem.vue'
import ButtonObject from '@/components/ButtonObject.vue'
import { getAdsById, getTypeAds, addAds, updateAds, beforAddAds } from '@/api/company.js'
export default {
	name: 'App',

	data() {
		return {
			dataAds: {
				UF_ADV_COMPANY: '',
				UF_NAME: '',
				UF_ACTIVITY: 0,
				UF_LINK_IN_AD: '',
				UF_OPEN_LINK_IN_NEW_WINDOW: 0,
				UF_AD_IMPRESSION: [],
				UF_URL_PAGE_SHOW_AD: [],
				UF_SORTING: 0,
				UF_VIDEO: '',
			},
			newUrl: '',
			url: [],
			typeCompanyActive: '',
			typeTime: [],
			video: '',
			titleAdd: '',
			isShow: true,
			srcNote: imageNote,
			msg: '',
			file: new FormData(),
		}
	},
	async created() {
		if (this.$route.name == 'addadt') {
			this.titleAdd = this.$route.meta.titleUpdate
			this.msg = this.$route.meta.titleBtn
			this.dataAds.UF_ADV_COMPANY = this.$route.params.id
		}
		if (this.$route.name == 'adtchange') {
			this.titleAdd = this.$route.meta.titleUpdate
			this.msg = this.$route.meta.titleBtn

			let params = {
				ID: this.$route.params.id,
			}
			this.dataAds = await getAdsById(params)
			this.video = this.dataAds.UF_VIDEO_IN
		}
		this.typeTime = await getTypeAds()
		this.typeCompanyActive = await beforAddAds()

		if (this.typeCompanyActive.UF_TYPE_COMPANY === 28) this.isShow = false
	},

	methods: {
		changeTypeTime(id) {
			if (this.dataAds.UF_AD_IMPRESSION.includes(id)) {
				this.dataAds.UF_AD_IMPRESSION = this.dataAds.UF_AD_IMPRESSION.filter((item) => item != id)
			} else {
				this.dataAds.UF_AD_IMPRESSION.push(id)
			}
		},
		issetInArray(list, val) {
			return list.includes(val)
		},
		async submitForm() {
			if (this.video) {
				let formData = new FormData()
				if (this.$route.name == 'addadt') {
					formData.append('UF_VIDEO', this.file)
					formData.append('UF_ADV_COMPANY', this.dataAds.UF_ADV_COMPANY)
					formData.append('UF_NAME', this.dataAds.UF_NAME)
					formData.append('UF_ACTIVITY', Number(this.dataAds.UF_ACTIVITY))
					formData.append('UF_LINK_IN_AD', this.dataAds.UF_LINK_IN_AD)
					formData.append(
						'UF_OPEN_LINK_IN_NEW_WINDOW',
						Number(this.dataAds.UF_OPEN_LINK_IN_NEW_WINDOW)
					)
					formData.append('UF_AD_IMPRESSION', Object.values(this.dataAds.UF_AD_IMPRESSION))
					formData.append('UF_URL_PAGE_SHOW_AD', this.url)
					formData.append('UF_SORTING', this.dataAds.UF_SORTING)

					let result = await addAds(formData)

					if (result.status === 'success') {
						this.$toast.success(result.message)
						this.$router.go(-1)
					} else if (result.status === 'error' && result.message) {
						this.$toast.error(result.message)
					} else if (result.status === 'error' && !result.message) {
						this.$toast.error('Что-то не так')
					}
				} else {
					formData.append('UF_VIDEO', this.file)
					formData.append('ID', this.$route.params.id)
					formData.append('UF_ADV_COMPANY', this.dataAds.UF_ADV_COMPANY)
					formData.append('UF_NAME', this.dataAds.UF_NAME)
					formData.append('UF_ACTIVITY', Number(this.dataAds.UF_ACTIVITY))
					formData.append('UF_LINK_IN_AD', this.dataAds.UF_LINK_IN_AD)
					formData.append(
						'UF_OPEN_LINK_IN_NEW_WINDOW',
						Number(this.dataAds.UF_OPEN_LINK_IN_NEW_WINDOW)
					)
					formData.append('UF_AD_IMPRESSION', Object.values(this.dataAds.UF_AD_IMPRESSION))
					formData.append(
						'UF_URL_PAGE_SHOW_AD',
						Object.values(this.dataAds.UF_URL_PAGE_SHOW_AD.concat(this.url))
					)
					formData.append('UF_SORTING', this.dataAds.UF_SORTING)

					let result = await updateAds(formData)
					if (result.status === 'success') {
						this.$toast.success(result.message)
						this.$router.go(-1)
					} else if (result.status === 'error' && result.message) {
						this.$toast.error(result.message)
					} else if (result.status === 'error' && !result.message) {
						this.$toast.error('Что-то не так')
					}
				}
			} else {
				this.$toast.error('Загрузите видео')
			}
		},

		async changeVideo(val) {
			this.video = val.target.files[0].name

			this.file = val.target.files[0]
		},
		clickUrl() {
			if (this.newUrl) {
				this.url.push(this.newUrl)

				this.newUrl = ''
			}
		},
	},

	components: { HeaderItem, ButtonObject },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap');
.addCompany_form {
	padding: 40px 40px 0 40px;
	text-align: left;
	margin-top: 40px;
	border: 0.5px solid #808080;
}
.title_item {
	font-size: 32px;
	line-height: 44px;
	color: #063f64;
	text-align: left;
}

.input_component ul {
	margin: 0;
	padding: 0;
	text-indent: 0;
	list-style-type: none;
}
.input_title {
	text-align: left;
	font-size: 16px;
	color: #808080;
	margin-bottom: 8px;
}
.input_item {
	max-width: 100%;
	width: 360px;
	height: 45px;
	padding: 12px 16px;
}

.input_title--m {
	margin-bottom: 0;
}
.input_title--time {
	margin: 0 12px;
}
.input_title--times {
	margin-right: 12px;
}

.space_help {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}
.input_item {
	height: 40px;
}
.input_item--file {
	display: none;
}
.custom_input {
	display: inline-block;
	min-width: 360px;
	/* width: 360px; */
	height: 45px;
	border: 0.5px solid #808080;
	background: #fff;
	padding: 12px 16px;
	cursor: pointer;

	line-height: 21.09px;
}
.input_svg {
	display: flex;
	margin-left: 16px;
}
.itemUrl {
	display: flex;
}

.elemUrl {
	min-width: 330px;
	margin-right: 10px;
}

.checkbox_item {
	display: flex;
	align-items: center;
	margin: 24px 0;
}
.checkbox_item input {
	cursor: pointer;
	margin-left: 12px;
	width: 20px;
	height: 20px;
}
.checkbox_item--time {
	margin: 12px 0;
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
.btn_cloce {
	align-items: center;
	border: 0;
	background: transparent;
}

.timeValue {
	width: 65px;
	height: 45px;
	padding: 10px 20px;
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
		height: 45px;
		padding: 3px 3px;
	}
	.timeControl {
		margin-bottom: 12px;
	}

	.custom_input {
		min-width: 75px;
		width: 360px;
		height: 35px;
		font-size: 12px;
		padding: 5px 8px;
	}
}
</style>
