<template>
	<div class="header">
		<div class="logo">
			<div class="logo_img" @click="$router.push({ name: 'home' })">
				<img :src="srcLogo" alt="logo_img" width="131px" height="60px" />
			</div>
			<div class="header_title" @click="$router.push({ name: 'home' })">
				{{ nameTitle | toUpperCase }}
			</div>
		</div>
		<div class="admin">
			<div class="admin_logo">
				<svg class="svg" width="32px" height="32px">
					<use xlink:href="@/assets/icons.svg#icon-11"></use>
				</svg>
			</div>
			<div class="header_title">Админ</div>
		</div>
	</div>
</template>
<script>
import { directive as onClickaway } from 'vue-clickaway'
import imageLogo from '@/assets/logo.png'

export default {
	data() {
		return {
			nameTitle: 'Кампании',
			srcLogo: imageLogo,
			isShowMenu: false,
		}
	},
	directives: {
		onClickaway: onClickaway,
	},
	filters: {
		toUpperCase(val) {
			return val.toUpperCase()
		},
	},
	methods: {
		away() {
			this.isShowMenu = false
		},
		click() {
			this.isShowMenu = !this.isShowMenu
		},
	},
	comments: { imageLogo },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap');

.header {
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	background-color: #ffffff;
	padding: 30px 60px;
	margin-bottom: 50px;
	font-size: 18px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}
.logo,
.admin {
	display: flex;
	align-items: center;
	cursor: pointer;
}

.header_title {
	font-family: 'Roboto', sans-serif;
	padding: 0 60px;
	line-height: 21.09px;
	font-size: 18px;
	cursor: pointer;
}
.admin_logo {
	position: relative;
	width: 60px;
	height: 60px;
	/* border: 1px solid #0172b9; */
	background-color: #0172b9;
	border-radius: 50%;
	padding: 14px;
}

.header_title:hover {
	text-decoration: underline;
	text-decoration-color: #0172b9;
}

@media screen and (max-width: 1440px) {
	.header_title {
		padding: 0 50px;
	}
}
@media screen and (max-width: 725px) {
	.header {
		padding: 16px 30px;
		margin-bottom: 30px;
		font-size: 16px;
	}

	.header_title {
		padding: 0 30px;
		line-height: 18px;
		font-size: 16px;
	}
	.logo_img img {
		width: 71px;
		height: 32px;
	}
	.admin_logo {
		width: 32px;
		height: 32px;
		padding: 7px;
	}
	.admin_logo svg {
		width: 18px;
		height: 18px;
	}
}
@media screen and (max-width: 660px) {
	.header_title {
		padding: 0 25px;
		font-size: 12px;
	}
	.header {
		padding: 15px 15px;
		margin-bottom: 15px;
		font-size: 12px;
	}

	.header_title {
		padding: 0 15px;
		line-height: 15px;
		font-size: 12px;
	}
	.logo_img img {
		width: 30px;
		height: 16px;
	}
	.admin_logo {
		width: 25px;
		height: 25px;
		padding: 6px;
	}
	.admin_logo svg {
		width: 15px;
		height: 15px;
	}
}
</style>
