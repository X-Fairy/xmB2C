<template>
	<view class="container">
		<!-- #ifdef MP || H5-->
		<view class="status" :style="{position:headerPosition}"></view>
		<view class="header" :style="{position:headerPosition}">
			<view class="tag" v-if="showTag">
				<view :class="tagIndex==1?'active':''" class="headquarters" @tap="chooseStore(1)">总部旗舰店</view>
				<view :class="tagIndex==2?'active':''" class="store" @tap="chooseStore(2)">门店商品</view>
			</view>
			<view class="storeNmae" v-if="showTag">
				<tui-icon name="shop-fill" color="#b2b2b2" size="20" style="padding-right: 10rpx;"></tui-icon>{{storeName}}
			</view>
			<view class="tui-activity">
				<view class="">
					<view class="tui-bold">{{tips}}</view>
					<view class="tui-bold">{{msgs}}</view>					
				</view>				
				<!-- <view class="tui-buy" @tap="topage">去凑单<tui-icon name="arrowright" :size="18" color="#333"></tui-icon>
				</view> -->
			</view>
			<view class="tui-edit-goods">
				<view class="" style="display: flex;justify-content: space-between;align-items: center;">
					<view>购物车共<text class="tui-goods-num">{{count || 0}}</text>件商品</view>
					<view>
						<tui-button type="danger" :shadow="true" :plain="true" shape="circle" width="160rpx" height="60rpx" :size="24"
						 @click="delGoods">删除</tui-button>
					</view>
				</view>

				<view class="msg" style="color: #e41f19;padding-top: 10rpx;">
					{{msg}}
				</view>

			</view>

		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<!-- #endif -->
		<view class="tis" v-if="showCart">
			<image src="../../../static/img/k.png" mode=""></image>
			<view class="">
				购物车竟然是空的
			</view>
			<view class="GoBtn" @tap="goIndex">
				去逛逛
			</view>
			</view>
		<checkbox-group @change="itemchange" style="margin-bottom: 50rpx;">
			<view class="tui-cart-cell  tui-mtop" v-for="(item,index) in dataList" :key="index">
				<tui-swipe-action :actions="actions" @click="handlerButton" :params="item">
					<template v-slot:content>
						<view class="tui-goods-item">
							<label class="tui-checkbox">
								<checkbox color="#fff" :checked="item.checked" :value="item.proid" v-if="userProvider=='weixin'"></checkbox>
								<checkbox :checked="item.checked" :value="item.proid" v-else></checkbox>
							</label>
							<view class="imgBox">
								<image :src="item.pro_img" class="tui-goods-img" @tap="toGood(item)" />
								<view class="sign" v-if="item.isBOGO==1">
									买一送一
								</view>
							</view>
							
							<view class="tui-goods-info">
								<view class="tui-goods-title" @tap="toGood(item)">
									{{item.pro_name}}
								</view>
								<view class="tui-goods-model">
									<!-- <view class="tui-model-text">货号：{{item.pro_sn}}</view> -->
									<!-- <tui-icon name="arrowdown" :size="16" color="#333"></tui-icon> -->
								</view>
								<view class="tui-price-box">
									<view class="tui-goods-price" v-if="item.dis_price" @tap="toGood(item)">¥{{ item.dis_price }}
										<text class="dis_price">{{ item.pro_price }}</text>
									</view>
									<view class="tui-goods-price" v-if="item.sec_price" @tap="toGood(item)" style="display: flex;justify-content: left;flex-wrap: wrap;align-items: baseline;">
										¥{{ item.sec_price }}
										<text class="dis_price">{{ item.pro_price }}</text>
									</view>
									<view class="tui-goods-price" v-if="item.bar_price" @tap="toGood(item)" style="display: flex;justify-content: left;flex-wrap: wrap;align-items: baseline;">
										¥{{ item.bar_price }}
										<text class="dis_price">{{ item.pro_price }}</text>
									</view>
									<view class="tui-goods-price" v-if="!item.dis_price && !item.sec_price && !item.bar_price">¥{{ item.pro_price }}

									</view>
									<view class="tui-scale">
										<tui-numberbox :value="item.pronum" :height="40" :width="74" :min="1" :index="item.proid" @change="changeNum"></tui-numberbox>
									</view>
								</view>
							</view>
						</view>
					</template>
				</tui-swipe-action>
				<!-- <view class="tui-sub-info" v-if="index%2==0">赠品：柔色尽情丝柔口红唇膏1支柔色尽情丝柔口红唇膏1支</view> -->
			</view>
		</checkbox-group>
		<!--猜你喜欢-->

		<tui-divider :size="28" :bold="true" color="#333" width="50%">
			<tui-icon name="like" :size="18" color="#e41f19"></tui-icon>
			<text class="tui-youlike">猜你喜欢</text>
		</tui-divider>
		<view class="tui-product-list" :scroll-top="scrollTop">
			<view class="tui-product-container">
				<block v-for="(item,index) in productList" :key="index" v-if="(index+1)%2!=0">
					<!--商品列表-->
					<view class="tui-pro-item" hover-class="hover" :hover-start-time="150">
						<image :src="item.pro_sn" class="tui-pro-img" mode="widthFix" @tap="detail(item)" />
						<view class="tui-pro-content">
							<view class="tui-pro-tit title-one" @tap="detail(item)">{{item.pro_name}}</view>
							<view class="bottom-info">
								<view class="tui-pro-price" @tap="detail(item)">
									<text class="tui-sale-price">￥{{item.pro_price}}</text>
								</view>
								<image src="../../../static/img/cart.png" mode="" @tap="joinCart(item)" class="cart"></image>
							</view>
						</view>
					</view>

				</block>
			</view>
			<view class="tui-product-container">
				<block v-for="(item,index) in productList" :key="index" v-if="(index+1)%2==0">
					<!--商品列表-->
					<view class="tui-pro-item" hover-class="hover" :hover-start-time="150">
						<image :src="item.pro_sn" class="tui-pro-img" mode="widthFix" @tap="detail(item)" />
						<view class="tui-pro-content">
							<view class="tui-pro-tit title-one" @tap="detail(item)">{{item.pro_name}}</view>
							<view class="bottom-info">
								<view class="tui-pro-price" @tap="detail(item)">
									<text class="tui-sale-price">￥{{item.pro_price}}</text>
								</view>
								<image src="../../../static/img/cart.png" mode="" class="cart" @tap="joinCart(item)"></image>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<!--tabbar-->
		<view class="tui-tabbar">
			<view class="tui-checkAll">
				<checkbox-group @change="checkboxChange">
					<label class="tui-checkbox">
						<checkbox color="#fff" :checked="allchecked" v-if="userProvider=='weixin'"></checkbox>
						<checkbox :checked="allchecked" v-else></checkbox>
						<text class="tui-checkbox-pl">全选</text>
					</label>
				</checkbox-group>
				<view class="tui-total-price">合计:<text class="tui-bold">￥{{allprice || 0}}</text><text style="font-size: 24upx;color: #000000; text-decoration: line-through;padding-left: 10rpx
				;">{{totalMoney || 0}}</text>
				</view>
			</view>
			<view>
				<tui-button v-if="userInfo" width="200rpx" height="70rpx" :size="30" type="danger" shape="circle" @click="btnPay"
				 :class="userProvider=='weixin' ? '': 'tt_login_btn'">去结算</tui-button>
				<button v-if="!userInfo" type="warn" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true" :class="userProvider=='weixin' ? 'wx_login_btn': 'tt_login_btn'">去结算</button>
			</view>
		</view>
		<!--加载loadding-->
		<tui-loadmore :visible="loadding" :index="3" type="red"></tui-loadmore>
		<tui-scroll-top :scrollTop="newscrollTop"></tui-scroll-top>
	</view>
</template>

<script>
	import tuiSwipeAction from "@/components/swipe-action/swipe-action"
	import tuiButton from "@/components/extend/button/button"
	import tuiNumberbox from "@/components/numberbox/numberbox"
	import tuiIcon from "@/components/icon/icon"
	import tuiDivider from "@/components/divider/divider"
	import tuiLoadmore from "@/components/loadmore/loadmore"	
	export default {
		components: {
			tuiSwipeAction,
			tuiButton,
			tuiNumberbox,
			tuiIcon,
			tuiDivider,
			tuiLoadmore
		},
		data() {
			return {
				userProvider: '微信',
				store: '',
				storeName: '总部旗舰店',
				tagIndex: 1,
				showTag: false,
				userInfo: null,
				headerPosition: "fixed",
				showCart:false,
				// 是否有满减
				disShow:false,
				dataList: [],
				actions: [{
					name: '删除',
					color: '#fff',
					fontsize: 28,
					width: 64,
					background: '#F82400'
				}],
				// 占位符高度
				headerheight:0,
				isEdit: false,
				productList: [],
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				// 购物车总数量
				count: 0,
				// 总金额
				totalMoney: 0,
				totalPrice: 0,
				// 全选
				allchecked: true,
				// 单项：
				itemchecked: false,
				// 选择的商品
				chooseList: [],
				// 删除商品ID
				delId: '',
				act: '',
				tips: '',
				msgs:[],
				msg: '',
				// 支付金额
				allprice: 0,
				scrollTop: 0,
				newscrollTop: 0,
				productIdList: [], //选择的商品Id
				goodsList: [],
				couponid: '',
				pronum: 1
			}
		},
		onPageScroll(e) {
			this.newscrollTop = e.scrollTop;
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},
		onLoad() {
			this.userProvider = this.$xm.userProvider();	
		},
		onShow() {
			this.allchecked = true;
			this.tagIndex = 1
			this.store = 10001;
			this.changeData();
			this.getproList();
			let code = uni.getStorageSync('store').store_code;
			if (code == 10001) {
				this.showTag = false;
			} else if (typeof(code) == 'undefined') {
				this.showTag = false;
			} else {
				this.showTag = true;
			}
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					console.log(res);
					this.userInfo = res.data;					
				}
			});
			uni.createSelectorQuery().select(".header").boundingClientRect((data) => {
				this.headerheight = data.height*2 + 'px';
			}).exec()
		},
		methods: {
			goIndex(){				
				uni.switchTab({
					url:'../category/category'
				})
			},
			toGood(e) {
				uni.navigateTo({
					url: '../../goods/goods?gid=' + e.proid
				})
			},
			chooseStore(e) {
				this.tagIndex = e;
				if (e == 1) {
					this.store = 10001;
					this.storeName = '总部旗舰店'
					this.changeData();
					this.productList = [];
					this.getproList()
				} else {
					this.store = uni.getStorageSync('store').store_code;
					this.storeName = uni.getStorageSync('store').store_name;
					this.changeData();
					this.productList = [];
					this.getproList()
				}

			},
			changeData() {
				let data = {
					store: this.store
				}
				this.$xm.post('/Cart', data, res => {
					if(res.count==0){
						this.showCart=true
					}else{
						this.showCart=false
					}
					this.dataList = res.prolist;
					this.$xm.requestImg(this.dataList);
					let totalAll = []
					this.dataList.forEach(ele => {
						ele.checked = true;
						totalAll.push(ele.proid + '/' + ele.pronum)
					})
					this.goodsList = totalAll
					this.totalPrice = res.allprice;
					this.totalMoney = res.allprice;
					this.allchecked = true;
					this.count = res.count;
					this.tips = res.tips;
					this.getmatchOptimals();
					if (this.count !== null && this.count>0) {
						this.count = this.count.toString()
						uni.setTabBarBadge({
							index: 2,
							text: this.count
						})
					} else {
						uni.removeTabBarBadge({
							index: 2,
						})
					}
					uni.setStorage({
						key: 'cart',
						data: this.count,
						success: (res) => {
							console.log(res);
						}
					})

				})
			},
			getuserinfo() {
				// 登录
				uni.login({
					provider: this.userProvider,
					success: (res) => {
						console.log(res)
						if (res.code) {
							var code = res.code
							uni.getUserInfo({
								success: (res) => {
									this.userInfo = res.userInfo;
									let params = {
										encryptedData: res.encryptedData,
										iv: res.iv,
									}
									this.$xm.post('/Index/getUnionid', params, (res) => {
										const user = uni.getStorageSync('user');
										user.unionid = res.unionid;
										uni.setStorage({
											key: 'user',
											data: user,
											success: (res) => {
												console.log(res);
											}
										});
									})
									uni.setStorage({
										key: 'userInfo',
										data: res.userInfo,
										success: (res) => {
											console.log(res);
										}
									});
									uni.navigateTo({
										url: '../../order/confirmation?store=' + this.store
									})
								},
								fail: res => {
									// 获取失败的去引导用户授权 
								}
							})

						} else {}
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},

			// 获取优惠活动
			getmatchOptimals() {
				let data = {
					goods_list: this.goodsList
				}
				this.$xm.post('/Coupon/match_optimalss', data, res => {					
					if (res) {
						this.msg = res.data.msg;
						this.msgs = res.msgs;
						this.allprice = res.data.money;
						if (res.data.type == 2) {
							this.couponid = res.id
						}
						if(res.code==2000){
							this.disShow=true;
						}else{
							this.disShow=false
						}
					} else {
						this.allprice = 0;
						this.disShow=false
					}

				})

			},
			getcalcmoney() {
				let data = {
					goods_list: this.goodsList,
					store: this.store
				}
				this.$xm.post('/Cart/calcmoney', data, (res) => {
					this.totalMoney = res.money
				})
			},
			// 获取猜你喜欢
			getproList() {
				let data = {
					store: this.store
				}
				this.$xm.post('/Cart/guess', data, (res) => {
					res.data.map(ele => {
						ele.pro_sn = 'http://img.xmvogue.com/thumb/' + ele.pro_sn + '.jpg?x-oss-process=style/300';
					});
					this.productList = this.productList.concat(res.data);
				})
			},
			itemchange(e) {
				this.productIdList = e.detail.value;
				if (this.productIdList.length == this.dataList.length) {
					this.allchecked = true;
					let arr1 = []
					this.dataList.forEach(ele => {
						arr1.push(ele.proid + '/' + ele.pronum)
					})
					this.goodsList = arr1;
					this.getcalcmoney();
					this.getmatchOptimals()
				} else {
					this.allchecked = false;
					let idList = this.productIdList.toString();
					let arr2 = [];
					this.dataList.forEach(ele => {
						if (idList.indexOf(ele.proid) !== -1) {
							arr2.push(ele.proid + '/' + ele.pronum)
							ele.checked = true;
						} else {
							ele.checked = false;
						}
					})
					this.goodsList = arr2;
					this.getcalcmoney();
					this.getmatchOptimals()
				}
			},
			checkboxChange(e) {
				this.allchecked = !this.allchecked;
				if (this.allchecked) {
					this.totalMoney = this.totalPrice;
					let allarr = [];
					this.dataList.forEach(ele => {
						ele.checked = true;
						allarr.push(ele.proid + '/' + ele.pronum)
					})
					this.goodsList = allarr;
					this.productIdList = this.dataList.map(ele => {
						return ele.proid
					})
				} else {
					this.dataList.forEach(ele => {
						ele.checked = false
					})
					this.goodsList = [];
					this.productIdList = [];
					this.totalMoney = 0;
				}
				this.getmatchOptimals()
			},
			changeNum(e) {
				this.delId = e.index;
				if (e.value == 0) {
					uni.showModal({
						title: '确定删除商品吗？',
						content: '',
						confirmText: '取  消',
						cancelColor: '#b2b2b2',
						confirmText: '确  定',
						confirmColor: '#2c2c2c',
						success: (res) => {
							if (res.confirm) {
								this.act = 'del';
								this.del();
							}
						},
					})
				} else {
					if (e.type == 'plus') {
						this.act = 'add';
						this.del()
					} else if (e.type == 'reduce') {
						this.act = 'reduce';
						this.del();
					}
				}


			},
			handlerButton(e) {
				this.delId = e.item.proid;
				this.act = 'del';
				this.del();
			},
			// 删除购物车
			del() {
				let params = {
					act: this.act,
					id: this.delId,
				}
				this.$xm.post('/Cart/ajax', params, res => {
					if (res.s == 1) {
						this.changeData();
					} else if (res.s == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			// 加入购物车
			joinCart(e) {
				let params = {
					proid: e.id,
					pronum: this.pronum,
					store: this.store
				};
				this.$xm.post('/Cart/add', params, (res) => {
					let result = res.msg;
					if (res.s == 1) {
						uni.showToast({
							title: result
						});
						this.changeData()
					} else if (res.s == 0) {
						uni.showToast({
							title: result,
							icon: 'none'
						});
					}
				})

			},
			delGoods() {
				if (this.allchecked) {
					this.productIdList = this.dataList.map(ele => {
						return ele.proid
					})
				}
				this.delId = this.productIdList;
				if (this.delId.length > 0) {
					uni.showModal({
						title: '确定删除商品吗？',
						content: '',
						confirmText: '取  消',
						cancelColor: '#b2b2b2',
						confirmText: '确  定',
						confirmColor: '#2c2c2c',
						success: (res) => {
							if (res.confirm) {
								this.act = 'del';
								this.del();
							}
						},
					})
				} else {
					uni.showToast({
						title: '没有选择要删除的商品！',
						icon: 'none'
					})
				}


			},
			detail(e) {
				uni.navigateTo({
					url: '../../goods/goods?gid=' + e.id
				});
			},
			topage(){
				uni.switchTab({
					url:'../../index/index'
				})
			},
			btnPay() {
				if (this.allchecked) {
					this.productIdList = this.dataList.map(ele => {
						return ele.proid
					})
				}
				let data = {
					goods_list: this.productIdList,
					store: this.store
				}
				console.log(this.productIdList);
				if (this.productIdList.length > 0) {
					this.$xm.post('/Cart/xiangou', data, (res) => {
						if (res.s == 0) {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						} else {
							uni.navigateTo({
								url: '../../order/confirmation?store=' + this.store + '&goods_list=' + this.productIdList
							})
						}
					})

				} else {
					uni.showToast({
						title: '没有选择要结算的商品！',
						icon: 'none'
					})
				}


			}
		},

		onPullDownRefresh() {
			this.changeData()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 200)
		},
		onReachBottom() {
			this.getproList();
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 200)

		},

	}
</script>

<style lang="scss">
	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 1000;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */

	}

	.header {
		width: 100%;
		// height: 100upx;
		position: fixed;
		top: 0;
		z-index: 100000;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);

		/*  #endif  */
		.tui-edit-goods {
			width: 100%;
			overflow: hidden;
			padding: 20rpx;
			box-sizing: border-box;
			align-items: center;
			color: #333;
			font-size: 26rpx;

			.tui-goods-num {
				font-weight: bold;
				color: #e41f19;
			}
		}

		.tui-activity {
			font-size: 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10rpx 20rpx;
			box-sizing: border-box;
			background-color: #FFDBB7;
			// margin-top: 20rpx;

			.tui-buy {
				display: flex;
				align-items: center
			}			
		}
	}

	.tag {
		width: 70%;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60rpx;
		line-height: 60rpx;
		padding-top: 5rpx;

		.store,
		.headquarters {
			width: 50%;
			text-align: center;
			height: 100%;
			font-size: 28rpx;
			border: 1px solid #e84341;
		}

		.headquarters {
			border-radius: 30rpx 0 0 30rpx;
			border-right: 0;
		}

		.store {
			border-radius: 0 30rpx 30rpx 0;
			border-left: 0;
		}

		.active {
			background-color: #e84341;
			color: #FFFFFF;
		}
	}
	
	.place {
		background-color: #ffffff;
		height: 250upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}

	

	.tis {
		width: 100%;		
		font-size: 24rpx;
		margin-bottom: 60rpx;
		text-align: center;
		image{
			width: 180rpx;
			height: 180rpx;
		}
		.GoBtn{
			padding: 6rpx;
			width: 120rpx;
			border: 1px solid #e41f19;
			border-radius: 20rpx;
			color: #e41f19;
			margin: 20rpx auto;
			font-size: 24rpx;
		}
	}

	.container {
		padding-bottom: 120rpx;
	}

	.tui-mtop {
		// margin-top: 24rpx;
	}





	.tui-cart-cell {
		width: 100%;
		border-radius: 12rpx;
		background: #FFFFFF;
		overflow: hidden;
		box-shadow: 0rpx 1rpx 20rpx 0rpx rgba(173, 173, 173, 0.4);
		margin-bottom: 20rpx;
		
	}

	.storeNmae {
		padding: 20rpx 30rpx;
		font-size: 30rpx;
	}

	.tui-goods-item {
		display: flex;
		padding: 30rpx;
		box-sizing: border-box;
	}

	.tui-checkbox {
		/* width: 40rpx; */
		padding-right: 30rpx;
		display: flex;
		align-items: center;
	}

	/* #ifdef APP-PLUS || MP */
	.tui-checkbox .wx-checkbox-input {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		margin: 0;
	}

	.tui-checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #F82400;
		width: 40rpx;
		height: 40rpx;
		border: none;
	}

	/* #endif */
	/* #ifdef H5 */
	>>>.tui-checkbox .uni-checkbox-input {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50% !important;
		margin: 0;
	}

	>>>.tui-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		background: #F82400;
		width: 40rpx;
		height: 40rpx;
		border: none;
	}

	/* #endif */
	.imgBox{
		position: relative;
		.tui-goods-img {
			width: 180rpx;
			height: 180rpx !important;
			border-radius: 12rpx;
			flex-shrink: 0;
			display: block;
		}
		.sign{
			position: absolute;
			left: 0;
			bottom: 0;
			padding:4rpx 6rpx;
			border-radius: 0 20rpx 20rpx 0;
			font-size: 20rpx;
			color: #FFFFFF;
			background-color: #F2343A;
		}
	}
	

	.tui-goods-info {
		width: 100%;
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		box-sizing: border-box;
		overflow: hidden;
	}

	.tui-goods-title {
		white-space: normal;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 28rpx;
		color: #333;
	}

	.tui-goods-model {
		max-width: 100%;
		color: #333;
		background: #F5F5F5;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 16rpx;
		box-sizing: border-box;
	}

	.tui-model-text {
		max-width: 100%;
		transform: scale(0.9);
		transform-origin: 0 center;
		font-size: 24rpx;
		line-height: 32rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-price-box {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.tui-goods-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;

		.dis_price {
			color: #b2b2b2;
			font-size: 30rpx;
			margin-left: 10rpx;
			text-decoration: line-through;
			font-weight: normal;
		}
	}

	.tui-scale {
		transform: scale(0.8);
		transform-origin: 100% 100%;
		border: 1px solid #EEEEEE;
		height: 70rpx;

		.tui-numbox-icon {
			font-size: 35rpx !important;
		}

		.tui-num-input {
			font-size: 35rpx !important;
			height: 70rpx !important;
			display: flex;
			align-items: center;

		}
	}





	.tui-sub-info {
		max-width: 532rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		padding: 20rpx 30rpx 10rpx 30rpx;
		box-sizing: border-box;
		color: #333;
		transform: scale(0.8);
		transform-origin: 100% center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-left: auto
	}

	.tui-invalid-text {
		width: 66rpx;
		margin-right: 4rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;
		background: rgba(0, 0, 0, .3);
		transform: scale(0.8);
		transform-origin: center center;
		border-radius: 4rpx;
		flex-shrink: 0;
	}

	.tui-invalid-pr {
		padding-right: 0 !important;
	}

	.tui-gray {
		color: #B2B2B2 !important;
	}

	.tui-goods-invalid {
		color: #555;
		font-size: 24rpx;
	}

	.tui-flex-center {
		align-items: center !important;
	}

	.tui-invalid-ptop {
		padding-top: 40rpx;
	}

	.tui-tabbar {
		width: 100%;
		height: 100rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		z-index: 99999;
	}

	.tui-tabbar::before {
		content: '';
		width: 100%;
		border-top: 1rpx solid #d9d9d9;
		position: absolute;
		top: 0;
		left: 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-checkAll {
		display: flex;
		align-items: center;
	}

	.tui-checkbox-pl {
		padding-left: 12rpx;
	}

	.tui-total-price {
		font-size: 35rpx !important;
		color: #e41f19;
		font-weight: 550;
	}

	/*猜你喜欢*/
	.tui-youlike {
		padding-left: 12rpx;

	}

	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		width: 92%;
		margin: auto;
	}

	.tui-product-container {
		flex: 1;
		margin-right: 2%;
	}

	.tui-product-container:last-child {
		margin-right: 0;
	}

	.tui-pro-item {
		width: 100%;
		margin-bottom: 4%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
	}

	.tui-pro-img {
		width: 100%;
		display: block;
	}

	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;

	}

	.bottom-info {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding-top: 25rpx;
		
		.cart {
			width: 40rpx;
			height: 32rpx;
		}

	}


	.tui-sale-price {
		font-size: 32rpx;
		color: #e41f19;
	}

	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.tui-pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}

	// 字节跳动
	.tt_login_btn {
		height: 70rpx;
		line-height: 70rpx;
		font-size: 30rpx;
		border-radius: 50rpx;
		background: #e41f19;
		color: #fff;
		width: 200rpx;
	}

	// 微信
	.wx_login_btn {
		height: 70rpx;
		line-height: 70rpx;
		font-size: 30rpx;
		border-radius: 50rpx;
	}
</style>
