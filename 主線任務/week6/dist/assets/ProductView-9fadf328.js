import{_ as a,o as c,c as u,a as n,d as r,t as l,F as i}from"./index-2e3cb665.js";const{VITE_APP_URL:d,VITE_APP_PATH:p}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2/",VITE_APP_PATH:"202301-vue-shaoyu",BASE_URL:"/VueLiveClass-2022WinterClass_Hexschool/%E4%B8%BB%E7%B7%9A%E4%BB%BB%E5%8B%99/week6/dist/",MODE:"production",DEV:!1,PROD:!0},_={data(){return{product:{}}},methods:{getProduct(){console.log(this.$route.params);const{id:e}=this.$route.params,s=`${d}api/${p}/product/${e}`;this.$http.get(s).then(t=>{console.log(t.data),this.product=t.data.product}).catch(t=>{alert(t.response.data.message)})}},mounted(){this.getProduct()}},h=["src"];function P(e,s,t,m,o,B){return c(),u(i,null,[n(" 這是單一產品頁面 "),r("h2",null,l(o.product.title),1),r("img",{src:o.product.imageUrl,class:"img-fluid",alt:"",srcset:""},null,8,h)],64)}const g=a(_,[["render",P]]);export{g as default};
