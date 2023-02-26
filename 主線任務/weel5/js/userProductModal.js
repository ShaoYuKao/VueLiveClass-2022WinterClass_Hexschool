const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = '202301-vue-shaoyu';

export default {
  // 當 id 變動時，取得遠端資料，並呈現 Modal
  props: ['id', 'addToCart', 'openModal'],
  data() {
    return {
      modal: {},
      tempProduct: {},
      qty: 1,
    }
  },
  template: '#userProductModal',
  methods: {
    hide() {
      this.modal.hide();
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static'
    });
    // 監聽 DOM，當 Modal 關閉時...要做其他事情
    this.$refs.modal.addEventListener('hidden.bs.modal', (event) => {
      this.openModal('');
    })
  },
  watch: {
    id() {
      console.log('id', this.id);
      if(!this.id) {
        return;
      }
      const url = `${apiUrl}/api/${apiPath}/product/${this.id}`;
      axios.get(url).then((response) => {
        console.log('單一產品', response.data);
        this.tempProduct = response.data.product;
        this.modal.show();
      }).catch((err) => {
        alert(err.response.data.message);
      });
    }
  }
};