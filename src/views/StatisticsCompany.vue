<template>
  <div class="static">
    <header-item />
    <h2 class="title_item">Статистика кампании {{ nameTitle }}</h2>
    <label>
      <p class="input_season">Выберите период</p>

      <div class="input_space">
        <div class="input_component">
          <label>
            <p class="input_title">Дата начала</p>
            <input
              class="input_item input_item--statistics"
              type="date"
              v-model="isDateStart"
              :max="isDateEnd"
            />
          </label>
        </div>
        <span class="item_line"></span>
        <div class="input_component">
          <label>
            <p class="input_title">Дата окончания</p>
            <input
              class="input_item input_item--statistics"
              type="date"
              v-model="isDateEnd"
              :min="isDateStart"
            />
          </label>
        </div>
      </div>
    </label>
    <div class="btn_space">
      <button-object :src="srcloop" :msg="msgloop" @eventClick="viewTime" />
      <download-excel :data="statisticDatas" :fields="json_fields">
        <button-object :src="srcDow" :msg="msgDow" />
      </download-excel>
    </div>
    <table-statistic
      v-if="isShowTableStatistic"
      :statisticData="statisticData"
      :dateTable="dateTable"
    />
  </div>
</template>

<script>
import imageLoop from '@/assets/btn/loop.svg'
import imageDownload from '@/assets/btn/download.svg'
import HeaderItem from '@/components/HeaderItem.vue'
import { getStatByCmp, getStatByAds } from '@/api/company.js'
import ButtonObject from '@/components/ButtonObject.vue'
import TableStatistic from '@/components/TableStatistic.vue'
export default {
  name: 'App',
  data() {
    return {
      json_fields: {
        Дата: 'UF_DATE_T',
        Показы: 'UF_SHOW',
        Клики: 'UF_GO',
        'СTR (%)': 'CTR',
      },
      nameTitle: '',
      isDateStart: '',
      isDateEnd: '',
      dateTable: 'За весь период',
      statisticData: [],
      statisticDatas: [],
      srcDow: imageDownload,
      srcloop: imageLoop,
      msgloop: 'Показать',
      msgDow: 'Выгрузить',
      isShowTableStatistic: false,
    }
  },
  async created() {
    await this.loadStatistic()
  },

  methods: {
    async loadStatistic() {
      let params = {
        ID: this.$route.params.id,
        isDateStart: this.isDateStart,
        isDateEnd: this.isDateEnd,
      }

      if (this.$route.name == 'statisticscompany') {
        let { STAT, COMPANY } = await getStatByCmp(params)

        this.statisticData = STAT

        this.isShowTableStatistic = true
        this.nameTitle = COMPANY
      } else if (this.$route.name == 'statisticadt') {
        let { STAT, COMPANY } = await getStatByAds(params)

        this.statisticData = STAT
        this.isShowTableStatistic = true
        this.nameTitle = COMPANY
      }
      var tempData = []
      let ufShow = 0,
        ufGo = 0,
        CTR = 0
      for (var index = 0; index < this.statisticData.length; index++) {
        ufShow += this.statisticData[index]['UF_SHOW']
        ufGo += this.statisticData[index]['UF_GO']
        CTR += this.statisticData[index]['CTR']
        this.statisticData[index]['CTR'] = String(
          this.statisticData[index]['CTR']
        ).replace('.', ',')
        tempData.push(this.statisticData[index])
      }
      tempData.push({
        CTR: String(CTR).replace('.', ','),
        UF_DATE_T: this.dateTable,
        UF_GO: ufGo,
        UF_SHOW: ufShow,
      })
      this.statisticDatas = tempData
    },

    viewTime() {
      this.loadStatistic()
      this.dateTable = this.isDate()
    },
    isDate() {
      if (this.isDateStart == '' && this.isDateEnd == '')
        return 'За весь период'
      else if (this.isDateEnd == '')
        return 'Всего с ' + this.isDateStart.split('-').reverse().join('.')
      else if (this.isDateStart == '')
        return 'Всего по ' + this.isDateEnd.split('-').reverse().join('.')
      else
        return (
          'Всего с ' +
          this.isDateStart.split('-').reverse().join('.') +
          ' по ' +
          this.isDateEnd.split('-').reverse().join('.')
        )
    },
  },
  computed: {},
  components: { HeaderItem, ButtonObject, TableStatistic },
}
</script>

<style>
.input_season {
  margin-top: 32px;
  margin-bottom: 16px;
  text-align: left;
  font-size: 20px;
  color: #333333;
}
.input_space {
  display: flex;
  flex-direction: row;
}

.item_line {
  width: 14px;
  height: 2px;
  background-color: #808080;

  margin: 45px 5px;
}

.btn_space {
  display: flex;
  justify-content: space-between;
}
.input_item--statistics {
  width: 184px;
}
@media screen and (max-width: 725px) {
  .input_season {
    margin: 16px 0;
  }
}
@media screen and (max-width: 660px) {
  .input_item--statistics {
    width: 110px;
    font-size: 10px;
    padding: 3px;
  }
}
</style>
