<template>
    <div class="background">
        <div class="goods_detail" style="height: 100%;">
            <header class="top_bar">
                <a onclick="window.history.go(-1)" class="icon_back"></a>
                    <h3 class="cartname">商品详情</h3>
            </header>
            <div class="tast_list_bd" style="padding-top: 44px;">
                <main class="detail_box">
                    <!-- 页面上部分的轮播图，会对商品的图片滚动显示 -->
                    <div class="home_ban">
                        <div class="m_banner clearfix" id="my_banner">
                            <ul class="banner_box">
                                <div v-for="image in good_images">
                                    <li>
                                        <img :src="image" alt="" style="height: 300px" />
                                    </li>
                                </div>
                                <div v-for="image in good_images">
                                    <li>
                                        <img :src="image" alt="" style="height: 300px" />
                                    </li>
                                </div>
                            </ul>
                            <ul class="point_box">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    <!-- 对商品的价格等信息进行展示 -->
                    <section class="product_info clearfix">
                        <div class="product_left">
                            <p class="p_name">{{ good.name }}</p>
                            <div class="product_pric">
                                <span>￥</span>
                                <span class="rel_price">{{ good.price }}</span>
                                <span></span>
                                <span style='color: grey;
text-decoration: line-through;
font-size: 18px;
margin-left: 14px;'>
                                    原价: ?￥{{ good.original_price }}
                                </span>
                            </div>
                        </div>
                    </section>
                    <span class="divider" style="height: 2px;"></span>
                    <!-- 让用户输入数量 -->
                    <div id="choose_number" style="height: 40px; background-color: #fff;">
                        <label style="font-size: 18px; float: left; margin-left: 10.5px;
margin-top: 7.5px;">购买数量</label>
                        <div style="padding-top: 5px;">
                            <img src="../assets/logo.png" style="margin-right: 10px;
display: inline;float:right;width:30px;" class="plus" @click="plus" />
                            <input pattern="[0-9]*" v-model="buy_count" type="text" name="counts" style="width:30px;display: inline;float:right;border: 0.5px
solid #e2e2e2;line-height:28px;text-align:center;" />
                            <img src="../assets/logo.png" style="display:
inline;float:right;width:30px;" class="minus" @click="minus" />
                        </div>
                    </div>
                    <!-- 商品的详细介绍，图片文字等，信息都来自于后端接口 -->
                    <section class="product_intro">
                        <div class="pro_det" v-html="good.description" style='padding: 0
6.5px;'>
                        </div>
                    </section>
                </main>
            </div>
            <!-- 底部购物车 -->
            <footer class="cart_d_footer">
                <div class="m">
                    <ul class="m_box">
                        <li class="m_item">
                            <a @click="toCart" class="m_item_link">
                                <em class="m_item_pic three"></em>
                                <span class="m_item_name">购物车</span>
                                </a>
                        </li>
                    </ul>
                    <div class="btn_box clearfix">
                        <a @click="addToCart" class="buy_now">加入购物车</a>
                            <a @click="zhifu" class="buybuy">立即购买</a>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>
<script>
import { go } from '../../libs/router'
import { scrollPic } from '../../libs/index.js'
import { useStore } from 'vuex'
const axios = require('axios');
export default {
    data() {
        return {
            good_images: [],
            good: "",
            buy_count: 1,
            good_id: this.$route.query.good_id,
        }
    },
    watch: {},
    mounted() {
        // 页面加载后轮播图就开始滚动
        scrollPic();
        // 向后端接口发起请求
        axios.get(this.api + '/goods/goods_details?good_id=' +
            this.good_id).then((response) => {
                this.good = response.data.good
                this.good_images = response.data.good_images
            }, (error) => {
                console.error(error)
            });
    },
    methods: {
        //方法：加入购物车
        addToCart() {
            let good = {
                id: parseInt(this.good_id),
                title: this.good.name,
                quantity: this.buy_count,
                price: this.good.price,
                image: this.good_images[0]
            }
            // 这里会调用Vuex的方法
            this.$store.dispatch('addToCart', good)
            alert("商品已经加入到了购物车")
        },
        // 点击后会跳转到购物车的详情页面
        toCart() {
            go("/cart2", this.$router)
        },
        // 增加购买的商品数量
        plus() {
            this.buy_count = this.buy_count + 1
        },
        // 减少购买商品的数量
        minus() {
            if (this.buy_count > 1) {
                this.buy_count = this.buy_count - 1
            }
        },
        // 点击“支付”按钮后触发的行为
        zhifu() {
            go("/shops/dingdanzhifu?good_id=" + this.good_id + "&buy_count=" +
                this.buy_count, this.$router)
        },
    },
    components: {},
    computed: {},
    store: useStore()
}
</script>