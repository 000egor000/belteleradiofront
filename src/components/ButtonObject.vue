<template>
  <div class="btnStyle">
    <div class="btnStyle_item">
      <button class="btn" @click="click">
        <img class :src="src" alt="icon" />
        <span class="newCompanies_title">{{ msg }}</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: { src: { type: String }, msg: { type: String } },
  methods: {
    click() {
      this.$emit('eventClick')
    },
  },
}
</script>
<style>
.btn {
  display: flex;
  align-items: center;
  position: relative;
  background-color: #0172b9;
  color: #ffffff;
  padding: 15px 35px;
  margin-bottom: 32px;
  line-height: 24.84px;
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
  border: none;
  font-family: Helvetica, Arial, sans-serif;
}
.btn:hover {
  background-color: #44a5e2;
  transition: 0.2s background-color;
}
.btn:active {
  background-color: #065485;
  transition: 0.2s background-color;
}
.btn:disabled {
  background-color: #d6d6d6;
  transition: 0.2s background-color;
}

.btn img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ffffff;
  margin-right: 12px;
  padding: 7px 0;
}

@media screen and (max-width: 725px) {
  .btn {
    padding: 10px 18px;
    margin-bottom: 28px;
    line-height: 19.32px;
    font-size: 14px;
    font-weight: 400;
  }

  .btn img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #ffffff;
    padding: 5px;
  }
}
@media screen and (max-width: 660px) {
  .btn {
    padding: 8px 10px;
    margin-bottom: 14px;
    line-height: 15px;
    font-size: 12px;
    font-weight: 400;
  }

  .btn img {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #ffffff;
    padding: 5px;
  }
}
</style>
