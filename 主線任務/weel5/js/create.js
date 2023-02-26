import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import productModal from './userProductModal.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = '202301-vue-shaoyu';

const app = createApp({
  data() {
    return {
      products: [],
      productId: '',
      cart: {},
      loadingItem: '',  // 存 id
    }
  },
  methods: {
    getProducts() {
      const url = `${apiUrl}/api/${apiPath}/products/all`;
      axios.get(url).then((response) => {
        console.log('產品列表', response);
        this.products = response.data.products;
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
    openModal(id) {
      this.productId = id;
    },
    addToCart(product_id, qty = 1) {
      this.loadingItem = product_id;
      const url = `${apiUrl}/api/${apiPath}/cart`;
      const data = {
        product_id,
        qty,
      };
      axios.post(url, { data }).then((response) => {
        console.log('加入購物車', response);
        this.$refs.productModal.hide();
        this.getCarts();
        this.loadingItem = '';
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
    getCarts() {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      axios.get(url).then((response) => {
        console.log('購物車', response);
        this.cart = response.data.data;
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
    updateCartItem(item) {  // 購物車 id, 產品 id
      this.loadingItem = item.id;
      const url = `${apiUrl}/api/${apiPath}/cart/${item.id}`;
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };

      axios.put(url, { data }).then((response) => {
        console.log('更新購物車', response);
        // this.loadingStatus.loadingItem = '';
        this.getCarts();
        this.loadingItem = '';
      }).catch((err) => {
        alert(err.response.data.message);
        // this.loadingStatus.loadingItem = '';
      });
    },
    deleteItem(item) {
      this.loadingItem = item.id;
      const url = `${apiUrl}/api/${apiPath}/cart/${item.id}`;
      axios.delete(url).then((response) => {
        console.log('刪除購物車', response);
        this.getCarts();
        this.loadingItem = '';
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
    deleteAllCarts() {
      const url = `${apiUrl}/api/${apiPath}/carts`;
      axios.delete(url).then((response) => {
        this.getCarts();
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
  },
  mounted() {
    this.getProducts();
    this.getCarts();
  },
  components: {
    productModal,
  }
});

app.mount('#app');