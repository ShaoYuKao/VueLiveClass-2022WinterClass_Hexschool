<template>
  這是購物車頁面
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="deleteItem(item)"
              :disabled="item.id === loadingItem"
            >
              <i
                class="fas fa-spinner fa-pulse"
                v-if="item.id === loadingItem"
              ></i>
              x
            </button>
          </td>
          <td>
            {{ item.product.title }}
            <!-- <div class="text-success">
                    已套用優惠券
                  </div> -->
          </td>
          <td>
            <div class="input-group input-group-sm">
              <select
                name=""
                id=""
                class="form-control"
                v-model="item.qty"
                @change="updateCartItem(item)"
                :disabled="item.id === loadingItem"
              >
                <option :value="i" v-for="i in 20" :key="i + '1234578'">
                  {{ i }}
                </option>
              </select>
            </div>
          </td>
          <td class="text-end">
            <!-- <small class="text-success">折扣價：</small> -->
            {{ item.total }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cart.total }}</td>
      </tr>
      <tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cart.final_total }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      productId: '',
      cart: {},
      loadingItem: '' // 存 id
    }
  },
  methods: {
    getCarts () {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
      this.$http.get(url).then((response) => {
        console.log('購物車', response)
        this.cart = response.data.data
      }).catch((err) => {
        alert(err.response.data.message)
      })
    },
    updateCartItem (item) { // 購物車 id, 產品 id
      this.loadingItem = item.id
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${item.id}`
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }

      this.$http.put(url, { data }).then((response) => {
        console.log('更新購物車', response)
        // this.loadingStatus.loadingItem = '';
        this.getCarts()
        this.loadingItem = ''
      }).catch((err) => {
        alert(err.response.data.message)
        // this.loadingStatus.loadingItem = '';
      })
    },
    deleteItem (item) {
      this.loadingItem = item.id
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${item.id}`
      this.$http.delete(url).then((response) => {
        console.log('刪除購物車', response)
        this.getCarts()
        this.loadingItem = ''
      }).catch((err) => {
        alert(err.response.data.message)
      })
    },
    deleteAllCarts () {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/carts`
      this.$http.delete(url).then((response) => {
        this.getCarts()
      }).catch((err) => {
        alert(err.response.data.message)
      })
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>
