 <template>
	<view>
		<!-- 订单状态 -->
		<view class="status">
			{{type}}
		</view>
		<!-- 物流 -->
		<view class="tui-flex-box" v-if="logisticShow">
			<image src="https://www.thorui.cn/wx/static/images/mall/order/img_order_logistics3x.png" class="tui-icon-img"></image>
			<view class="tui-logistics">
				<view class="tui-logistics-text">{{traces.AcceptStation}}</view>
				<view class="tui-logistics-time">{{traces.AcceptTime}}</view>
			</view>
			<view class="">
				<tui-icon name="arrowright" color="#b2b2b2" size="20" @tap="toTrack"></tui-icon>
			</view>
		</view>
		<!-- 收货地址 -->
		<view class="addr">
			<view class="icon">
				<image src="../../../../static/img/addricon.png" mode=""></image>
			</view>
			<view class="right">
				<view class="tel-name">
					<view class="name">
						{{recinfo.name}}
					</view>
					<view class="tel">
						{{recinfo.phone}}
					</view>
				</view>
				<view class="addres">
					{{recinfo.province+recinfo.city+recinfo.town}}
					{{recinfo.address}}
				</view>
			</view>
		</view>
		<!-- 购买商品列表 -->
		<view class="buy-list">
			<view class="row" v-for="(row,index) in buylist" :key="index">
				<view class="goods-info" >
					<view class="img" @tap="togoods(row)">
						<image :src="row.pro_sn"></image>
					</view>
					<view class="info">
						<view class="title" @tap="togoods(row)">{{row.pro_name}}</view>
						<view class="spec" @tap="togoods(row)">单价{{row.pro_price}} 数量:{{row.pro_num}}</view>
						<view class="price-number">
							<view class="price" @tap="togoods(row)">￥{{row.subtotal}}</view>
							<view class="default" @tap="toround(row)" v-if="type=='已发货' || type=='已收货'">退换</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 提示-备注 -->
		<view class="order">
			<view class="row">
				<view class="left">
					积分 :
				</view>
				<view class="right">
					已扣除{{int}}积分抵扣0元
				</view>
			</view>
			<view class="row">
				<view class="left">
					备注 :
				</view>
				<view class="right">
					<input placeholder="选填,备注内容" v-model="note" />
				</view>
			</view>
			<view class="row">
				<view class="left">
					订单编号:
				</view>
				<view class="right">
					<text>{{id}}</text>
				</view>
			</view>
			<view class="row">
				<view class="left">
					下单时间:
				</view>
				<view class="right">
					<text>{{time}}</text>
				</view>
			</view>
			<view class="row" v-if="order_ship">
				<view class="left">
					快递方式:
				</view>
				<view class="right">
					<text>{{shipname}}</text>
				</view>
			</view>
			<view class="row" v-if="orderShipSn">
				<view class="left">
					快递编号:
				</view>
				<view class="right">
					<text>{{orderShipSn}}</text>
				</view>
			</view>
		</view>
		<!-- 明细 -->
		<view class="detail">
			<view class="row">
				<view class="nominal">
					商品总金额
				</view>
				<view class="content">
					￥{{totalPrice|toFixed}}
				</view>
			</view>

			<view class="row">
				<view class="nominal">
					运费
				</view>
				<view class="content">
					￥+{{freight|toFixed}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					优惠金额
				</view>
				<view class="content">
					￥-{{deduction|toFixed}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					合计
				</view>
				<view class="content">
					￥{{sumPrice|toFixed}}
				</view>
			</view>
		</view>
		<view class="blck">

		</view>
		<view class="footer">
			<view class="settlement">
				<view class="sum">实付金额:<view class="money">￥{{sumPrice|toFixed}}</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import tuiListCell from "@/components/list-cell/list-cell"
	import tuiIcon from "@/components/icon/icon"
	export default {
		components: {
			tuiListCell,
			tuiIcon,
		},
		data() {
			return {
				id: '',
				ordersn:'',
				type: '',
				time: '',
				shipname: '',
				buylist: [], //订单列表
				goodsPrice: 0.0, //商品合计价格
				sumPrice: 0.0, //用户付款价格
				freight: 0.00, //运费
				orderShipSn: '', //快递编号
				note: '', //备注
				int: 0, //抵扣积分
				deduction: 0, //抵扣价格
				recinfo: {},
				totalPrice: 0.00,
				logisticShow: false,
				oid: '',
				traces: [] //物流信息

			};
		},
		onLoad(option) {
			this.id = option.id;
			this.getdetails()
		},
		onShow() {
		},
		onHide() {

		},
		onBackPress() {
			//页面后退时候，清除订单信息
			// this.clearOrder();
		},
		filters: {
			toFixed: function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		methods: {
			getlogistic() {
				let data = {
					id: this.oid
				};
				this.$xm.post('/Index/getordership', data, (res) => {
					console.log(res);
					if (res.Traces.length>0) {
						this.logisticShow = true;
						this.traces = res.Traces[res.Traces.length - 1];
					} else {
						this.logisticShow = false
					}
					this.shipname=res.order_ship;
				})
			},
			getdetails() {
				let data = {
					order_sn: this.id
				}
				this.$xm.post('/Order/getOrderInfo', data, (res) => {
					switch (res.order_state) {
						case '6':
							res.order_state = '已删除'
							break;
						case '8':
							res.order_state = '已退款'
							break;
						default:
					}
					this.oid = res.id;
					this.getlogistic();
					this.type = res.order_state;
					this.recinfo = res.contact;
					res.pro.map(ele => {
						ele.pro_sn = 'http://img.xmvogue.com/thumb/' + ele.pro_sn + '.jpg?x-oss-process=style/300'
					})
					this.buylist = res.pro;
					this.time = res.order_time;
					this.shipname = res.order_ship;
					this.goodsPrice = res.actually_amt;
					this.freight = res.order_ship_price;
					this.sumPrice = Number(this.goodsPrice) + Number(this.freight);
					this.deduction = res.discount_amt;
					this.totalPrice = res.order_amt;
					this.orderShipSn = res.order_ship_sn;
					this.ordersn=res.order_sn;
				})
			},
			clearOrder() {
				uni.removeStorage({
					key: 'buylist',
					success: (res) => {
						this.buylist = [];
					}
				});
			},
			togoods(e){
				uni.navigateTo({
					url: '../../../goods/goods?gid=' + e.id
				});
			},
			toTrack() {
				uni.navigateTo({
					url: '../../../logisticsTrack/track?id=' + this.oid
				})
			},
			toround(e){
				uni.showToast({
					title:'内容正在开发中',
					icon:'none'
				})
				// uni.navigateTo({
				// 	url: '../refund/refund?id='+e.id+'&ordersn='+this.ordersn
				// })
			}
		}
	}
</script>

<style lang="scss">
	.status {
		// width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		// background-color: #f06c7a;
		background-image: linear-gradient(135deg, #f795a2 10%, #FD6585 100%);
		color: white;
		padding: 0 40rpx;
		font-weight: bold;
		font-size: 45rpx;
	}

	.tui-flex-box {
		align-items: center;
		width: 86%;
		padding: 20upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
		display: flex;

		.tui-icon-img {
			width: 44rpx;
			height: 44rpx;
			flex-shrink: 0;
		}

		.tui-logistics {
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 0 24rpx 0 20rpx;
			box-sizing: border-box;
		}

		.tui-logistics-text {
			font-size: 28rpx;
			line-height: 32rpx;
		}

		.tui-logistics-time {
			font-size: 24rpx;
			line-height: 24rpx;
			padding-top: 16rpx;
			color: #666;
		}

	}

	.addr {
		width: 86%;
		padding: 20upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
		display: flex;

		.icon {
			width: 80upx;
			height: 80upx;
			display: flex;
			align-items: center;

			image {
				width: 60upx;
				height: 60upx;
			}
		}

		.tel-name {
			width: 100%;
			display: flex;
			font-size: 32upx;

			.tel {
				margin-left: 40upx;
			}
		}

		.addres {
			width: 100%;
			font-size: 26upx;
			color: #999;
		}
	}

	.buy-list {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			margin: 30upx 0;

			.goods-info {
				width: 100%;
				display: flex;

				.img {
					width: 22vw;
					height: 22vw;
					border-radius: 10upx;
					overflow: hidden;
					flex-shrink: 0;
					margin-right: 10upx;

					image {
						width: 22vw;
						height: 22vw;
					}
				}

				.info {
					width: 100%;
					height: 22vw;
					overflow: hidden;
					display: flex;
					flex-wrap: wrap;
					position: relative;

					.title {
						width: 100%;
						font-size: 28upx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						// text-align: justify;
						overflow: hidden;
					}

					.spec {
						font-size: 22upx;
						background-color: #f3f3f3;
						color: #a7a7a7;
						height: 40upx;
						display: flex;
						align-items: center;
						padding: 0 10upx;
						border-radius: 20upx;
						margin-bottom: 20vw;
					}

					.price-number {
						position: absolute;
						width: 100%;
						bottom: 0upx;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						font-size: 28upx;
						height: 40upx;

						.price {
							color: #f06c7a;
						}
						
						.default {
							min-width: 70upx;
							height: 50upx;
							padding: 0 20upx;
							border-radius: 50upx;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 28upx;
							margin-left: 20upx;
							border: solid 1upx #ccc;
							color: #666;
							font-size: 26rpx;
						}
						// .number {
						// 	display: flex;
						// 	justify-content: center;
						// 	align-items: center;

						// }
					}
				}
			}
		}
	}

	.order {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			margin: 20upx 0;
			height: 40upx;
			display: flex;

			.left {
				font-size: 28upx;
			}

			.right {
				margin-left: 40upx;
				font-size: 26upx;
				color: #999;

				input {
					font-size: 26upx;
					color: #999;
				}
			}
		}
	}

	.blck {
		width: 100%;
		height: 100upx;
	}

	.footer {
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;

		.settlement {
			width: 80%;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.sum {
				width: 50%;
				font-size: 28upx;
				margin-right: 10upx;
				display: flex;
				justify-content: flex-end;

				.money {
					font-weight: 600;
				}
			}

			.btn {
				padding: 0 30upx;
				height: 60upx;
				background-color: #f06c7a;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				border-radius: 40upx;
			}
		}
	}

	.detail {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			height: 60upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.nominal {
				font-size: 28upx;
			}

			.content {
				font-size: 26upx;
				color: #f06c7a;
			}
		}
	}
</style>