<template>
	<view>
		<!-- 顶部导航 -->
		<view class="topTabBar" :style="{position:headerPosition}" v-show="fid!=1000">
			<scroll-view scroll-x scroll-with-animation class="tab-view" :scroll-left="scrollLeft">
				<view class="tab-bar-item" @tap="tocategoods(0)">
					<text class="text" :class="[tabbarIndex==0?'on':'']">全部</text>
				</view>
				<view class="tab-bar-item" v-for="(item,index) in cateList" :key="index" @tap="tocategoods(item.id)">
					<text class="text" :class="[item.id==tabbarIndex?'on':'']">{{item.cate_name}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="place" v-show="fid!=1000"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="product-list">
				<view class="product" v-for="(goods,index) in productList" :key="index">
					<view class="imgBox">
						<image mode="widthFix" :src="goods.pro_sn" @tap="toGoods(goods)"></image>
						<view class="sign" v-if="goods.isBOGO==1">
							买一送一
						</view>
					</view>					
					<view class="name title-one">{{goods.pro_name}}</view>
					<view class="info">
						<view class="price">{{goods.pro_price}}</view>
						<image src="../../static/img/cart.png" mode="" class="cart" @tap="joinCart(goods)"></image>
					</view>
				</view>
			</view>
			<view class="loading-text">{{loadingText}}</view>
		</view>
		<tui-scroll-top :scrollTop="scrollTop"></tui-scroll-top>
	</view>
</template>

<script>
	export default {
		onShareAppMessage(res) {
			return {
				title: this.key,
				path: 'pages/categoods/categoods?name=' + this.key+'&fid='+this.fid+'&mid='+this.mid,
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
				key:'',
				headerPosition: "fixed",
				tabbarIndex: 0,
				scrollLeft: 0, //tab标题的滚动条位置
				cateList: [],
				fid: '',
				mid: '',
				small: '',
				pagecount: 0,
				page: 1,
				productList: [],
				loadingText: '正在加载中...',
				scrollTop: 0

			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			this.productList = []
			setTimeout(() => {
				if (this.fid == 1000) {
					this.getnewGoods();
				} else {
					this.getgoodList();
				}				
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			this.page++;
			if (this.page <= this.pagecount || !this.pagecount) {
				this.loadingText = '正在加载中...';
				if (this.fid == 1000) {
					this.getnewGoods();
				} else {
					this.getgoodList();
				}
			} else {
				let index;
				for (let j = 0; j < this.cateList.length; j++) {
					if (this.cateList[j].id == this.mid) {
						index = j + 1;
					}
				}
				console.log(index,this.cateList.length)
				this.tabbarIndex = this.cateList[index].id;
				this.mid = this.tabbarIndex;
				setTimeout(() => {
					this.page = 1;
					this.getgoodList();
				}, 1000)
				if (this.cateList.length == index || this.fid == 1000) {
					this.loadingText = '没有更多商品了';
				}
			}
		},
		onLoad(option) {
			this.fid = option.fid;
			this.key=option.name;
			console.log(option);
			if (option.mid) {
				this.mid = option.mid;
			} else {
				this.mid = 0;
			}
			this.tabbarIndex = this.mid;
			uni.setNavigationBarTitle({
				title: this.key
			});
			if (this.fid == 1000) {
				this.getnewGoods()
			} else {
				this.getcate();
			}

		},
		onShow() {

		},
		methods: {
			// 获取分类商品
			getcate() {
				let data = {
					fid: this.fid
				}
				this.$xm.post('/Procate/getMid', data, (res) => {
					this.cateList = res;
					this.getgoodList();
				})

			},
			// 切换分类
			tocategoods(e) {
				this.loadingText = '正在加载中...';
				this.productList = [];
				this.mid = e;
				this.tabbarIndex = this.mid;
				this.getgoodList();
			},
			// 新品推荐
			getnewGoods() {
				let data = {
					p: this.page
				}
				this.$xm.post('/Index/newpro', data, (res) => {
					let result = res.data
					result.map((ele) => {
						ele.pro_sn = 'http://img.xmvogue.com/thumb/' + ele.pro_sn + '.jpg?x-oss-process=style/300'
					})
					this.pagecount = res.p;
					this.productList = this.productList.concat(result);

				})
			},
			// 获取商品
			getgoodList() {
				let data = {
					big: this.fid,
					mid: this.mid,
					small: this.small,
					pageid: this.page
				}
				this.$xm.post('/Product/proList', data, (res) => {
					let result = res.prolist;
					result.map((ele) => {
						ele.pro_sn = 'http://img.xmvogue.com/thumb/' + ele.pro_sn + '.jpg?x-oss-process=style/300'
						ele.itemcount = 0;
					});
					if(res.count==1 || !res.count){
						this.loadingText = '没有更多商品了';
					}
					this.pagecount = res.count;
					this.productList = this.productList.concat(result);
				})

			},
			//商品跳转
			toGoods(e) {
				uni.navigateTo({
					url: '../goods/goods?gid=' + e.id
				});
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


		}
	}
</script>

<style lang="scss">
	.topTabBar {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #F5F5F5;
		height: 80upx;
		display: flex;
		justify-content: space-between;

		.tab-view::before {
			content: '';
			position: absolute;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			bottom: 0;
			right: 20rpx;
			left: 0;
		}

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
			padding: 0 20rpx;


			.tab-bar-item {
				margin: 0 20upx;
				display: inline-block;
				text-align: center;
				box-sizing: border-box;

				.text {
					height: 76upx;
					display: flex;
					align-items: center;

					&.on {
						color: #f06c7a;
						border-bottom: solid 4upx #f06c7a;
					}
				}

				.tab-bar-title {
					font-size: 24upx;
					font-weight: 400;
				}
			}

			.active {
				border: 1px solid #e84341;

				.tab-bar-title {
					color: #e84341 !important;
					font-size: 28upx;
				}
			}
		}

	}

	.place {

		background-color: #ffffff;
		height: 100upx;

	}

	.goods-list {
		padding-top: 20rpx;

		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.product-list {
			width: 92%;
			padding: 0 4% 3vw 4%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.product {
				width: 48%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 30rpx 0;
				box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
				.imgBox{
					position: relative;
					image {
						width: 100%;
					}					
					.sign{
						position: absolute;
						left: 0;
						bottom: 10rpx;
						padding:4rpx 6rpx;
						border-radius: 0 20rpx 20rpx 0;
						font-size: 20rpx;
						color: #FFFFFF;
						background-color: #F2343A;
					}
				}
				.name {
					width: 92%;
					margin: auto;
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
			}

		}
	}
</style>
