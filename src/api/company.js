import { HTTP } from '../../plugins/http.js'

/////company//////

export const getCompany = async () => {
	let { data } = await HTTP.get('/api_integrations/company/getCompany.php')
	return data
}
export const getTypeCompany = async () => {
	let { data } = await HTTP.get('/api_integrations/company/getTypeCompany.php')
	return data
}

export const getCompanyById = async (params) => {
	let { data } = await HTTP.post('/api_integrations/company/getCompanyById.php', params)
	return data
}

export const delCompany = async (params) => {
	let { data } = await HTTP.post('/api_integrations/company/delCompany.php', params)
	return data
}

export const updateStatus = async (params) => {
	let { data } = await HTTP.post('/api_integrations/company/updateCompany.php', params)

	return data
}

export const updateCompany = async (params) => {
	let { data } = await HTTP.post('/api_integrations/company/updateCompany.php', params)
	return data
}

export const addCompany = async (params) => {
	let { data } = await HTTP.post('/api_integrations/company/addCompany.php', params)
	return data
}

/////ads//////

export const addAds = async (params) => {
	let { data } = await HTTP.post('/api_integrations/ads/addAds.php', params)
	return data
}

export const getAds = async (params) => {
	let { data } = await HTTP.post('/api_integrations/ads/getAds.php', params)
	return data
}

export const getAdsById = async (params) => {
	let { data } = await HTTP.post('/api_integrations/ads/getAdsById.php', params)
	return data
}

export const delAds = async (params) => {
	let { data } = await HTTP.post('/api_integrations/ads/delAds.php', params)
	return data
}

export const updateAds = async (params) => {
	let { data } = await HTTP.post('/api_integrations/ads/updateAds.php', params)
	return data
}

export const getTypeAds = async () => {
	let { data } = await HTTP.get('/api_integrations/ads/getTypeAds.php')
	return data
}

export const updateAdsStatus = async (params) => {
	let { data } = await HTTP.post('/api_integrations/ads/updateAds.php', params)

	return data
}

export const beforAddAds = async () => {
	let { data } = await HTTP.get('/api_integrations/ads/beforAddAds.php')
	return data
}

///statistic///

export const getStatByCmp = async (params) => {
	let { data } = await HTTP.post('/api_integrations/stat/statByCmp.php', params)

	return data
}

export const getStatByAds = async (params) => {
	let { data } = await HTTP.post('/api_integrations/stat/statByAds.php', params)

	return data
}

export const downloadAds = async (params) => {
	let { data } = await HTTP.post('/api_integrations/stat/xlsCmp.php', params)

	return data
}

///auth///

export const auth = async (params) => {
	const headers = {
		'Access-Control-Allow-Origin': '*',
	}
	let { data } = await HTTP.post('/api_integrations/auth.php', params, { headers })

	return data
}
