<template>
<main class="mt-3">
  <div class="container">
      <h2 class="text-center pb-3">제품 수정</h2>
      <div class="mb-3 row pb-3">
          <label class="col-md-4 col-form-label">제품명</label>
          <div class="col-md-8">
            <input type="text" class="form-control" v-model="productDetail.product_name">
          </div>
      </div>
      <div class="mb-3 row">
          <label class="col-md-4 col-form-label">제품 가격</label>
          <div class="col-md-8">
              <div class="input-group mb-3">
                  <input type="number" class="form-control" v-model="productDetail.product_price">
                  <span class="input-group-text">₩</span>
              </div>
          </div>
      </div>
      <div class="mb-3 row">
          <label class="col-md-4 col-form-label">배송비</label>
          <div class="col-md-8">
              <div class="input-group mb-3">
                  <input type="number" class="form-control" v-model="productDetail.delivery_price">
                  <span class="input-group-text">₩</span>
              </div>
          </div>
      </div>
      <div class="mb-3 row">
          <label class="col-md-4 col-form-label">추가 배송비(도서산간)</label>
          <div class="col-md-8">
              <div class="input-group mb-3">
                  <input type="number" class="form-control" v-model="productDetail.add_delivery_price">
                  <span class="input-group-text">₩</span>
              </div>
          </div>
      </div>
      <div class="mb-3 row">
          <label class="col-md-4 col-form-label">출고일</label>
          <div class="col-md-8">
              <div class="input-group mb-3">
                  <input type="number" class="form-control" v-model="productDetail.outbound_days">
                  <span class="input-group-text">일 이내 출고(주말, 공휴일 제외)</span>
              </div>
          </div>
      </div>
      <div class="mb-3 row pb-3">
          <label class="col-md-4 col-form-label">제품 카테고리</label>
          <div class="col-md-8">
              <div class="row">
                  <div class="col-auto">
                      <select class="form-select" v-model="productDetail.category1">
                          <option>전자제품</option>
                          <option></option>
                      </select>
                  </div>
                  <div class="col-auto">
                      <select class="form-select" v-model="productDetail.category2">
                          <option>컴퓨터</option>
                          <option></option>
                      </select>
                  </div>
                  <div class="col-auto">
                      <select class="form-select" v-model="productDetail.category3">
                          <option>주변기기</option>
                          <option></option>
                      </select>
                  </div>
              </div>
          </div>
      </div>
      <div class="mb-3 row pb-3">
          <label class="col-md-4 col-form-label">태그</label>
          <div class="col-md-8">
            <input type="text" class="form-control" v-model="productDetail.tags">
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
            productDetail: {}
        };
    },
    created() {
        this.productId = this.$route.query.product_id;
        this.getProductDetail();
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
        async getProductDetail(){
            let productDetail = await this.$api("/api/productDetail", {param:[this.productId]});
            if(productDetail.length > 0){
                this.productDetail = productDetail[0];
            }
            console.log(this.productDetail);
        },
        goToList(){
            this.$router.push({path:'/sales'});
        }
    }
}
</script>
