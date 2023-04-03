<template>
  <div class="tableForms">
    <!-- <div @loadUsers="$emit('loadUsers')"> -->
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Тип кампании</th>
          <th>Название</th>
          <th>Статус</th>
          <th>Сортировка</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in companies" :key="item.ID">
          <td>
            <small-modal
              :itemDropdown="itemsDropdown"
              :activity="item.UF_ACTIVITY"
              @delete="deleteCompany(item.ID)"
              @update="update(item.ID, item)"
              @activate="activate(item.ID, item.UF_ACTIVITY)"
              @adt="adt(item.ID)"
              @statistic="statistic(item.ID)"
            />
          </td>
          <td>
            {{ item.UF_TYPE_COMPANY_NAME }}
          </td>
          <td class="clickPointer" @click="adt(item.ID)">
            {{ item.UF_NAME }}
          </td>
          <td>
            {{ item.UF_ACTIVITY_NAME }}
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
import { delCompany, updateStatus } from '@/api/company.js'

export default {
  props: {
    itemsDropdown: {
      type: Array,
      require: true,
    },
    companies: {
      type: Array,
      require: true,
    },
  },

  directives: {
    onClickaway: onClickaway,
  },

  methods: {
    away() {
      this.isShowMenu = false
    },
    click() {
      this.isShowMenu = !this.isShowMenu
    },
    async deleteCompany(id) {
      let params = {
        ID: id,
      }

      let result = await delCompany(params)
      if (result) {
        this.$toast.success('Компания удалена')
      }

      this.$emit('loadCompany')
    },
    async update(id, data) {
      this.$router.push({
        name: 'addchange',
        params: { id, data },
      })
    },
    async activate(id, active) {
      let params = {
        ID: id,
        UF_ACTIVITY: Number(!active),
      }

      let result = await updateStatus(params)
      if (result) {
        this.$toast.success('Статус обновлен')
      }

      this.$emit('loadCompany')
    },
    adt(id) {
      this.$router.push({ name: 'announcement', params: { id } })
    },

    statistic(id) {
      this.$router.push({ name: 'statisticscompany', params: { id } })
    },
  },

  components: { SmallModal },
}
</script>
<style>
.table {
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  width: 100%;
  border-collapse: collapse;
  /* padding: 50px 190px; */
}
.table thead th {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 22.08px;
  padding: 20px;
  border: 1px solid #dddddd;
}

.table tbody td {
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  padding: 20px;
  border: 1px solid #dddddd;
  line-height: 19.32px;
}
.table tbody td a {
  color: inherit;
  text-decoration: none;
}
.clickPointer {
  cursor: pointer;
}

@media screen and (max-width: 725px) {
  /* .table {
    padding: 30px 35px;
  } */
  .table thead th {
    font-size: 16px;
    font-weight: 700;
    line-height: 22.08px;
    padding: 20px;
  }

  .table tbody td {
    font-size: 14px;

    padding: 20px;

    line-height: 19.32px;
  }
}
@media screen and (max-width: 660px) {
  .table thead th {
    font-size: 12px;
    font-weight: 700;
    line-height: 15px;
    padding: 5px;
  }

  .table tbody td {
    font-size: 10px;

    padding: 5px;

    line-height: 15px;
  }
}
</style>
