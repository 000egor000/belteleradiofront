<template>
  <div class="dropdown">
    <div class="dropbtn" v-on-clickaway="away" @click="click">
      <svg width="30px" height="30px">
        <use xlink:href="@/assets/icons.svg#icon-10"></use>
      </svg>
    </div>

    <div class="dropdown-content" v-if="isShowMenu">
      <span
        calss="inner_dropdown"
        v-for="el in menuList"
        :key="el.id"
        @click="clickMenu(el)"
      >
        <span>{{ el.title }}</span>
      </span>
    </div>
  </div>
</template>
<script>
import { directive as onClickaway } from 'vue-clickaway'
export default {
  data() {
    return {
      isShowMenu: false,
    }
  },
  props: { itemDropdown: { type: Array }, activity: { type: Number } },

  computed: {
    menuList() {
      return this.itemDropdown.map((item) => {
        let title = ''
        if (item.type === 'activate') {
          if (this.activity === 0) {
            title = 'Активировать'
          } else {
            title = 'Деактивировать'
          }
          return {
            ...item,
            title: title,
          }
        }
        return {
          ...item,
        }
      })
    },
  },
  directives: {
    onClickaway: onClickaway,
  },
  methods: {
    clickMenu(el) {
      if (el.title === 'Перейти к кампании') this.$emit('adt')
      else if (el.type === 'delete') this.$emit('delete')
      else if (el.type === 'update') this.$emit('update')
      else if (el.type === 'activate') this.$emit('activate')
      else if (el.type === 'statistic') this.$emit('statistic')
    },

    away() {
      this.isShowMenu = false
    },
    click() {
      this.isShowMenu = !this.isShowMenu
    },
  },
}
</script>
<style scoped>
.dropdown {
  display: inline-block;
}

.dropbtn {
  position: relative;
  text-align: left;
  cursor: pointer;
  text-align: center;
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  position: absolute;
  font-size: 14px;
  line-height: 19.32px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  text-align: left;
  border: 0.5px solid #808080;
  background: #ffffff;
  margin-top: 12px;
}

.dropdown-content span {
  padding: 12px 10px;
  text-decoration: none;
  font-size: 14px;
  color: #333333;
  cursor: pointer;
}
.dropdown-content span:hover {
  background: #efefef;
  transition: 0.3s;
}
.dropdown .dropbtn svg:hover {
  stroke: #0172b9;
}

@media screen and (max-width: 660px) {
  .dropdown .dropbtn svg {
    width: 15px;
    height: 15px;
  }

  .dropdown-content span {
    padding: 3px 3px;

    font-size: 10px;
  }
}
</style>
