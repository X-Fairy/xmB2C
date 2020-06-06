<template>
	<view class="speciall" :scrollTop="scrollTop">
		<!-- 顶部导航 -->
		<view class="topTabBar" :style="{position:headerPosition}">
			<scroll-view scroll-x scroll-with-animation class="tab-view" :scroll-left="scrollLeft">
				<view class="tab-bar-item" :class="[index==tabbarIndex?'on':'']" v-for="(item,index) in tabList" :key="index" @tap="to(index)">
					<text class="text">{{item}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="place">

		</view>
		<!-- 商品列表 -->
		<view class="goods-list one" v-if="goodsList.length>0">
			<image src="http://web.xmcpcn.com/img/smallBanner/05.png" mode="" class="banner"></image>
			<view class="product-list">
				<view class="product" v-for="(goods,index) in goodsList" :key="index">
					<view class="" style="position: relative;" @tap="toGoods(goods)">
						<image mode="widthFix" :src="goods.pro_sn"></image>
						<view class="sign">
							限时特惠
						</view>
					</view>
					<view class="name title-one" @tap="toGoods(goods)">{{goods.pro_name}}</view>
					<view class="info">
						<view class="price" v-if="goods.dis_price">{{goods.dis_price}}
							<text style="font-size: 24rpx;color: #B2B2B2;padding-left: 6rpx;text-decoration: line-through;">{{goods.pro_price}}</text>
						</view>
						<view class="price" v-else>{{goods.pro_price}}</view>
						<image src="../../static/img/cart.png" mode="" class="cart" @tap="joinCart(goods)"></image>
					</view>
					<view class="buy" @tap="tobuy(goods)">
						立即抢购
					</view>
				</view>
			</view>
		</view>
		<view class="goods-list" v-if="productList.length>0" style="margin-top: 0;">
			<image src="http://web.xmcpcn.com/img/smallBanner/04.png" mode="" class="banner"></image>
			<view class="product-list">
				<view class="product" v-for="(goods,index) in productList" :key="index">
					<view class="" style="position: relative;" @tap="toGoods(goods)">
						<image mode="widthFix" :src="goods.pro_sn"></image>
						<view class="sign">
							买一送一
						</view>
					</view>
					<view class="name title-one" @tap="toGoods(goods)">{{goods.pro_name}}</view>
					<view class="info">
						<view class="price" v-if="goods.dis_price">{{goods.dis_price}}
							<text style="font-size: 24rpx;color: #B2B2B2;padding-left: 6rpx;text-decoration: line-through;">{{goods.pro_price}}</text>
						</view>
						<view class="price" v-else>{{goods.pro_price}}</view>
						<image src="../../static/img/cart.png" mode="" class="cart" @tap="joinCart(goods)"></image>
					</view>
					<view class="buy" @tap="tobuy(goods)">
						立即抢购
					</view>
				</view>
			</view>
			<view class="loading-text">{{loadingText}}</view>
		</view>

		<view class="cartIcon">
			<image src="../../static/img/gocart.png" mode="" class="cart" @tap="goCart"></image>
		</view>
	</view>
</template>

<script>
	export default {
		onShareAppMessage(res) {
			return {
				title: '五一限时特惠',
				path: 'pages/speciall/speciall',
				success: (res) => {
					console.log(res);
				},
				fail: (res) => {
					console.log(res);
				}
			}
		},
		data() {
			return {
				scrollTop: 0,
				headerPosition: "fixed",
				scrollLeft: 0, //tab标题的滚动条位置
				// 标题索引
				tabbarIndex: 0,
				// nav标题列表
				tabList: ['限时特价', '买一送一'],
				goodsList: [], //限时特价
				productList: [], //买一送一
				loadingText: "正在加载中..."

			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
			uni.createSelectorQuery().select(".one").boundingClientRect((data) => {
				if (e.scrollTop >= data.height - 50) {
					this.tabbarIndex = 1;
				} else if (e.scrollTop < data.height) {
					this.tabbarIndex = 0;
				}
			}).exec()

		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			this.tabbarIndex == 0;
			this.getgoodList();
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {

		},
		onLoad(option) {
			this.tabbarIndex = option.index;
			if (this.tabbarIndex == 0) {
				this.reload();
			} else {
				this.getgoodList();
			}
		},
		methods: {
			// 获取限时特价
			reload() {
				this.$xm.post('/Product/xsqg', '', (res) => {
					res.data.map(ele => {
						ele.pro_sn = 'http://img.xmvogue.com/thumb/' + ele.pro_sn + '.jpg?x-oss-process=style/300';
						ele.pro_name = ele.pro_name.slice(0, 15) + '...'
					})
					this.goodsList = res.data;
					this.getgoodList();
				})
			},
			// 获取买一送一
			getgoodList() {
				this.$xm.post('/Product/BOGO', '', (res) => {
					res.list.map(ele => {
						ele.pro_sn = 'http://img.xmvogue.com/thumb/' + ele.pro_sn + '.jpg?x-oss-process=style/300';
					});
					this.productList = res.list;
					this.loadingText = '到底了！'
				})
			},
			// 切换导航
			to(index) {
				this.tabbarIndex = index;
				if (index == 1) {
					uni.createSelectorQuery().select(".one").boundingClientRect((data) => {
						uni.pageScrollTo({
							scrollTop: data.height,
							duration: 200
						});
					}).exec()
				} else {
					if (this.goodsList.length > 0) {
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 200
						});
					} else {
						this.reload();
					}

				}
			},
			// 跳转详情
			toGoods(e) {
				uni.navigateTo({
					url: '../goods/goods?gid=' + e.id
				})
			},
			// 加入购物车
			joinCart(e) {
				let data = {
					proid: e.id,
					pronum: 1
				}
				this.$xm.post('/Cart/add', data, (res) => {
					let result = res.msg;
					uni.showToast({
						title: result
					});
				})
			},
			tobuy(e) {
				let store;
				if (uni.getStorageSync('store').store_code) {
					store = uni.getStorageSync('store').store_code;
				} else {
					store = 10001
				}
				uni.navigateTo({
					url: '../order/confirmation?store=' + store + '&proid=' + e.id + '&pronum=1'
				})
			},
			goCart() {
				uni.switchTab({
					url: '../tabBar/cart/cart'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		// background-color: ;
	}

	.cartIcon {
		width: 80rpx;
		height: 80rpx;
		background-color: #3FD0BA;
		border-radius: 50%;
		position: fixed;
		right: 40rpx;
		bottom: 90rpx;
		z-index: 999999;
		display: flex;
		justify-content: center;
		align-items: center;

		.cart {
			width: 40rpx;
			height: 40rpx;
		}

	}

	.topTabBar {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		height: 80upx;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
		background-color: #F5F5F5;
		color: #999999;

		.tab-view {
			width: 100%;
			overflow: hidden;
			box-sizing: border-box;
			top: 0;
			/* #ifdef H5 */
			top: 44px;
			/* #endif */
			left: 0;
			z-index: 99;
			white-space: nowrap;


			.tab-bar-item {
				width: 50%;
				height: 100%;
				display: inline-block;
				text-align: center;

				&.on {
					background: linear-gradient(90deg,rgb(40,183,217),rgb(61,210,186));
					color: #FFFFFF;
				}
			}
		}

	}

	.place {
		height: 120rpx;
	}

	.goods-list {		
		.banner{
			width: 92%;
			height: 210rpx;
			margin: auto;
			display: flex;
		}
		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #FFFFFF;
			font-size: 24upx;
		}

		.title {
			color: #3FD0BA;
			// width:400rpx;
			// padding: 12rpx;
			border-radius: 10rpx;
			font-size: 35rpx;
			font-weight: bold;
			margin: auto;
			display: flex;
			justify-content: center;
			align-items: center;
			letter-spacing: 3rpx;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.product-list {
			width: 92%;
			padding: 0 4% 3vw 4%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-top: 40rpx;

			.product {
				width: 48%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 30rpx 0;
				box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);

				image {
					width: 100%;
					// border-radius: 20upx 20upx 0 0;
				}

				.sign {
					position: absolute;
					padding: 6rpx 12rpx;
					background-color: #F2343A;
					color: #fff;
					font-size: 22rpx;
					left: 0;
					bottom: 15rpx;
					border-radius: 0 20rpx 20rpx 0;
				}

				.name {
					width: 92%;
					padding: 0 4%;
					font-size: 30upx;
				}

				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 20upx 4%;

					.price {
						color: #e65339;
						font-size: 30upx;
					}

					.cart {
						width: 40rpx;
						height: 32rpx;
					}
				}

				.buy {
					width: 45%;
					margin: auto;
					background-color: #F2343A;
					color: #FFFFFF;
					padding: 5rpx 0;
					font-size: 22rpx;
					text-align: center;
					letter-spacing: 2rpx;
					margin-bottom: 20rpx;
				}
			}

		}
	}

	.list {
		margin-top: 0 !important;
	}
</style>
