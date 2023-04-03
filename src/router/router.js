import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import AddCompany from '@/views/AddCompany.vue'
import AdtCompany from '@/views/AdtCompany.vue'
import AddAdt from '@/views/AddAdt.vue'

import StatisticsCompany from '@/views/StatisticsCompany.vue'

export default new VueRouter({
  mode: 'history',
  base: '/beltel-project/',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      meta: {},
    },
    {
      name: 'announcement',
      path: '/announcement/:id',
      component: AdtCompany,
      meta: {},
    },
    {
      name: 'add',
      path: '/addcompany',
      component: AddCompany,
      props: true,
      meta: { titleUpdate: 'Добавить кампанию', titleBtn: 'Сохранить' },
    },
    {
      name: 'addchange',
      path: '/addchange/:id',
      component: AddCompany,
      meta: { titleUpdate: 'Редактирование компании', titleBtn: 'Обновить' },
    },
    {
      name: 'addadt',
      path: '/addadt/:id',
      component: AddAdt,
      meta: { titleUpdate: 'Добавить обьявление', titleBtn: 'Сохранить' },
      props: true,
    },
    {
      name: 'adtchange',
      path: '/adtchange/:id',
      component: AddAdt,
      meta: { titleUpdate: 'Редактирование обьявления', titleBtn: 'Обновить' },
    },

    {
      name: 'statisticscompany',
      path: '/statisticscompany/:id',
      component: StatisticsCompany,
    },
    {
      name: 'statisticadt',
      path: '/statisticadt/:id',
      component: StatisticsCompany,
    },
  ],
})
