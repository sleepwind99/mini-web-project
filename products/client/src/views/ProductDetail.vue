<template>
<main class="mt-3">
  <div class="container">
      <div class="row">
          <div class="col-md-5">
              <div id="carouselExampleIndicators" class="carousel carousel-dark slide" data-bs-ride="carousel">
                  <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  </div>
                  <div class="carousel-inner">
                    <div :class="`carousel-item ${i==0 ? 'active':''}`" :key="i" v-for="(pimg, i) in productImage">
                      <img :src="pimg.path" class="d-block w-100" alt="...">
                    </div>
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
          </div>
          <div class="col-md-7">
              <div class="card shadow-sm">
                  <div class="card-body">
                      <h5 class="card-title text-start ps-3 pt-2 pb-2 fw-bolder">{{productDetail.product_name}}</h5>
                      <h5 class="card-title pt-3 pb-2 border-top text-start ps-3">{{productDetail.product_price.toLocaleString('en-US')}}원</h5>
                      <p class="card-text border-top pt-3 text-start ps-3">
                          <span class="badge bg-dark me-1">{{productDetail.category1}}</span>
                          <span class="badge bg-dark me-1">{{productDetail.category2}}</span>
                          <span class="badge bg-dark">{{productDetail.category3}}</span>
                      </p>
                      <p class="card-text text-start ps-3">
                          배송비 {{productDetail.delivery_price.toLocaleString('en-US')}}원 | 도서산관(제주도) 배송비 추가 {{productDetail.add_delivery_price.toLocaleString('en-US')}}원 | {{productDetail.outbound_days}}일 이내 출고 (주말, 공휴일 제외)
                      </p>
                      <div class="card-text border-top pt-3 pb-3 ps-3">
                          <div class="row">
                              <div class="col-auto">
                                  <label class="col-form-label">구매수량</label>
                              </div>
                              <div class="col-auto">
                                  <div class="input-group">
                                      <span class="input-group-text" style="cursor:pointer" @click="calculatePrice(-1)">-</span>
                                      <input type="text" class="form-control" style="width:40px" v-model="total">
                                      <span class="input-group-text" style="cursor:pointer" @click="calculatePrice(1)">+</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <p class="border-bottom"></p>
                      <div class="row pt-3 pb-3">
                          <div class="col-6 text-start ps-4">
                              <h3>총 상품 금액</h3>
                          </div>
                          <div class="col-6 pe-3" style="text-align: right;">
                              <h3>{{totalPrice.toLocaleString('en-US')}}원</h3>
                          </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center ">
                          <div class="col-6 d-grid p-1">
                              <button type="button" class="btn btn-lg btn-danger">주문하기</button>
                          </div>
                          <div class="col-6 d-grid p-1">
                              <button type="button" class="btn btn-lg btn-dark">장바구니 담기</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <div class="row">
      <div class="col-12">
          <img :src="productDetail.path" alt="..." class="img-fluid rounded mx-auto d-block">
      </div>
  </div>
</main>
</template>

<script>
export default {
  data() {
    return {
      productId: 0,
      productDetail: {},
      productImage: [],
      total: 1,
      totalPrice: 0
    };
  },
  created() {
    this.productId = this.$route.query.product_id;
    this.getProductDetail();
    this.getProductImage();
  },
  methods: {
    async getProductDetail(){
      let productDetail = await this.$api("/api/productDetail", {param:[this.productId]});
      if(productDetail.length > 0){
        this.productDetail = productDetail[0];
        this.totalPrice = this.productDetail.product_price;
        }
      console.log(this.productDetail);
    },
    async getProductImage(){
      this.productImage = await this.$api("/api/productMainImage", {param:[this.productId]});
    },
    goToDetail(product_id){
      this.$router.push({path:'/productdetail', query:{product_id:product_id}});
    },
    calculatePrice(count){
      if(count == -1){
        if(this.total > 1) this.total = this.total + count;
      }else this.total = this.total + count;
      this.totalPrice = this.productDetail.product_price * this.total;
    }
  }
}
</script>