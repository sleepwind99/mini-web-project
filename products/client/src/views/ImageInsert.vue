<template>
<main class="mt-3">
  <div class="container">
      <h2 class="text-center pb-3">제품 사진 등록</h2>
      <div class="mb-3 row pb-3">
          <label class="col-md-4 col-form-label">제품ID</label>
          <div class="col-md-8">
            {{productId}}
          </div>
      </div>
      <div class="mb-3 row pb-3">
          <label class="col-md-4 col-form-label">제품명</label>
          <div class="col-md-8">
            {{productDetail.product_name}}
          </div>
      </div>
      <div class="mb-3 row">
          <label class="col-md-4 col-form-label">썸네일 이미지</label>
          <div class="col-md-8">
              <div class="input-group mb-3">
                  <input type="file" class="form-control" accept=".png, .jpeg, .gif .jpg">
                  <label class="input-group-text">업로드</label>
              </div>
              <div class="alert alert-secondary" role="alert">
                  <ul>
                      <li class="text-start">이미지 사이즈 : 700*700</li>
                      <li class="text-start">파일 크기 : 1M 이하</li>
                      <li class="text-start">파일 확장자 : png, jpg, jpeg, gif만 가능</li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="mb-3 row">
          <label class="col-md-4 col-form-label">제품 이미지</label>
          <div class="col-md-8">
              <div class="input-group mb-3">
                  <input type="file" class="form-control" accept=".png, .jpeg, .gif .jpg" multiple>
                  <label class="input-group-text">업로드</label>
              </div>
              <div class="alert alert-secondary" role="alert">
                  <ul>
                      <li class="text-start">이미지 사이즈 : 700*700</li>
                      <li class="text-start">파일 크기 : 1M 이하</li>
                      <li class="text-start">파일 확장자 : png, jpg, jpeg, gif만 가능</li>
                      <li class="text-start">최대 5개까지 업로드 가능</li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="mb-3 row">
          <label class="col-md-4 col-form-label">제품 상세 정보 이미지</label>
          <div class="col-md-8">
              <div class="input-group mb-3">
                  <input type="file" class="form-control" accept=".png, .jpeg, .gif .jpg">
                  <label class="input-group-text">업로드</label>
              </div>
              <div class="alert alert-secondary" role="alert">
                  <ul>
                      <li class="text-start">파일 크기 : 5M 이하</li>
                      <li class="text-start">파일 확장자 : png, jpg, jpeg, gif만 가능</li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="mb-3 row">
          <div class="col-6 d-grid p-1">
              <button type="button" class="btn btn-lg btn-danger">저장</button>
          </div>
          <div class="col-6 d-grid p-1">
              <button type="button" class="btn btn-lg btn-dark" @click="goToList()">취소</button>
          </div>
      </div>
  </div>
</main>
</template>
<script>
export default {
    data() {
        return {
            productId: 0,
            productName: "",
            productDetail: {},
            productImage: []
        };
    },
    created() {
        this.productId = this.$route.query.product_id;
        this.getProductDetail();
        this.getProductImage();
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    mounted() {
        if(this.user.email == undefined){
            alert('로그인을 해야 이용할 수 있습니다.');
            this.$router.push({path:'/'});
        }
    },
    methods: {
        goToList(){
            this.$router.push({path:'/sales'});
        },
        async getProductDetail(){
            let productDetail = await this.$api("/api/productDetail", {param:[this.productId]});
            if(productDetail.length > 0) this.productDetail = productDetail[0];
            console.log(this.productDetail);
        },
        async getProductImage(){
            this.productImage = await this.$api("/api/productMainImage", {param:[this.productId]});
        }
    }
}
</script>
