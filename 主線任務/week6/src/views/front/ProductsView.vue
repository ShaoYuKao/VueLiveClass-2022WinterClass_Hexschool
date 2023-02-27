<template>
  這是產品列表頁面
  <table class="table">
    <thead>
      <tr>
        <th>商品名稱</th>
        <th>圖片</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.title }}</td>
        <td>
          <img :src="product.imageUrl" width="200" alt="" srcset="">
        </td>
        <td>
          <RouterLink :to="`/product/${product.id}`" class="btn btn-outline-secondary">產品細節</RouterLink>
          <button type="button" class="btn btn-outline-primary" @click="addToCart(product.id)">加入購物車</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { RouterLink } from 'vue-router'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      products: []
    }
  },
  components: {
    RouterLink
  },
  methods: {
    getProducts () {
      const url = `${VITE_APP_URL}api/${VITE_APP_PATH}/products/all`
      this.$http
        .get(url)
        .then((response) => {
          console.log(response)
          this.products = response.data.products
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    addToCart (id) {
      const data = {
        product_id: id,
        qty: 1
      }
      const url = `${VITE_APP_URL}api/${VITE_APP_PATH}/cart`
      this.$http
        .post(url, { data })
        .then((response) => {
          console.log(response)
          // alert(response.data.message);
          // this.loadingStatus.loadingItem = "";
          // this.$refs.userProductModal.hideModal();
          // this.isLoading = false;
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
