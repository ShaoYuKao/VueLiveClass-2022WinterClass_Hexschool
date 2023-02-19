import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import pagination from './pagination.js';

let productModal = null;
let delProductModal = null;

const app = createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: '202301-vue-shaoyu',
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
      isLoading: false,
      products: [],
      page: {}
    }
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    // Bootstrap 方法
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    });
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    });

    this.checkAdminUser();
  },
  methods: {
    checkAdminUser() {
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getProducts();
        })
        .catch((err) => {
          console.error("err", err);
          window.location = 'login.html';
        })
    },
    getProducts(page = 1) {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/?page=${page}`;
      this.isLoading = true;
      axios.get(url).then((res) => {
        this.products = res.data.products;
        this.page = res.data.pagination;
      }).catch((err) => {
        alert(err.data.message);
      }).finally(() => {
        this.isLoading = false;
      })
    },
    updateProduct() {
      const { title, category, unit, origin_price, price} = this.tempProduct;

      if(!title) {
        alert('請輸入[標題]');
        return;
      }
      if(!category) {
        alert('請輸入[請輸入分類]');
        return;
      }
      if(!unit) {
        alert('請輸入[單位]');
        return;
      }
      if(!origin_price) {
        alert('請輸入[原價]');
        return;
      }
      if(!price) {
        alert('請輸入[售價]');
        return;
      }

      // add
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let method = 'post';

      if (!this.isNew) {
        // update
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        method = 'put'
      }
      this.isLoading = true;
      axios[method](url, { data: this.tempProduct }).then((response) => {
        alert(response.data.message);
        productModal.hide();
        this.getProducts();
      }).catch((err) => {
        alert(err.data.message);
      }).finally(() => {
        this.isLoading = false;
      })
    },
    openModal(status, item) {
      this.tempProduct = {
        imagesUrl: [],
      };
      if (status === 'new') {
        this.isNew = true;
        productModal.show();
      } else if (status === 'edit') {
        this.tempProduct = {...this.tempProduct, ...item };
        this.isNew = false;
        productModal.show();
      } else if (status === 'delete') {
        this.tempProduct = {...this.tempProduct, ...item };
        delProductModal.show()
      }
    },
    delProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
      this.isLoading = true;
      axios.delete(url).then((response) => {
        alert(response.data.message);
        delProductModal.hide();
        this.getProducts();
      }).catch((err) => {
        alert(err.data.message);
      }).finally(() => {
        this.isLoading = false;
      })
    },
  },
  components: {
    pagination
  }
})

app.component('product-modal', {
  props: ['tempProduct', 'updateProduct', 'isLoading', 'isNew'],
  template: '#product-modal-template',
});

app.mount('#app');