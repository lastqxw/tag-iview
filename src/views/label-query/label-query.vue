<style lang="less" scoped>
@import "../../styles/common.less";
@import "./label-query.less";
</style>
<template>
	<div > 
		<Row>
			<Col span="6">
				<Card style="height:100%"  dis-hover>
					<p slot="title">
						<Icon type="pricetag"></Icon>
						标签树状图
					</p>
					 <Tree :data="data5" :load-data="loadData"  @on-toggle-expand="expandData"  style="margin-left:30px"></Tree>
				</Card>
			</Col>
			<Col span="18" style="position:fixed;right:0px;top:0px">
				<div>
					<Row  v-if="result.length>0">
						<Col>
							<Card dis-hover>
								<p slot="title">
									<Icon type="pricetag"></Icon>
									标签详情
								</p>
								<p style="margin-bottom:20px">
									<span class="margin-right-5 margin-left-10">标签名称:</span>
									<span style="display:inline-block;font-size:18px;font-weight:bold">{{result[0].title}}</span>
								</p>
								<p style="margin-bottom:20px">
									<span class="margin-right-5 margin-left-10">标签编码:</span>
									<span style="display:inline-block;font-size:18px;font-weight:bold">{{result[0].code}}</span>
								</p>
								<p style="margin-bottom:20px"> 
									<span class="margin-right-5 margin-left-10">标签创建时间:</span>
									<span style="display:inline-block;font-size:18px;font-weight:bold">{{result[0].creatData}}</span>
								</p>
							</Card>
						</Col>
					</Row>
					<Row class="margin-top-10" v-if="result.length>0">
						<Col>
							<Card dis-hover>
								<p slot="title">
									<Icon type="funnel"></Icon>
									标签口径
								</p>
								<span>{{result[0].definition}}</span>
							</Card>
						</Col>
					</Row>
					<Card  v-if="result.length === 0" style="text-align: center;padding: 200px 0;height:100%">
						<img src="../../images/background.png" /> 
					</Card>
					<Spin fix v-if="spinShow">
						<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
						<div>正在执行筛选，请稍后。。。</div>
					</Spin>
				</div>
			</Col>  
    	</Row>
	</div>
</template>
<script>
import lableQuery from "../../service/labelQuery.js";
import { Message } from "iview";
export default {
  mixins: [lableQuery],
  data() {
    return {
      model1: "1",
      phone: "",
      tagList: [],
      result: [],
      value: "",
	  visible: false,
	  bode:false,
      code: "",
      spinShow: false,
      type: false,
      showDropdownmenu: false,
      data5: [
        {
		  title: "内容标签",
		  type:"1",
		  code:"0",
		  loading: false,
          children: []
        },
        {
		  title: "app标签",
		  type:"2",
		  code:"0",
		  loading: false,
          children: []
        },
        {
          title: "兴趣标签",
		  loading: false,
		  type:"3",
		  code:"0",
          children: [
            {
              title: "文艺偏好",
			  code: "P001",
			  type:"3",
			  loading: false,
              children: []
            },
            {
              title: "娱乐片好",
			  code: "P002",
			  type:"3",
			  loading: false,
              children: []
            },
            {
              title: "体育偏好",
			  code: "P003",
			  type:"3",
			  loading: false,
              children: []
            },
            {
              title: "生活偏好",
			  code: "P004",
			  type:"3",
			  loading: false,
              children: []
            },
            {
              title: "时尚偏好",
			  code: "P005",
			  type:"3",
			  loading: false,
              children: []
            },
            {
              title: "理财偏好",
			  code: "P006",
			  type:"3",
			  loading: false,
              children: []
            }
          ]
        }
      ],
      buttonProps: {
        type: "default",
        size: "small"
      }
    };
  },
  methods: {
    loadingData(code) {
		this.result =[]
		console.log(code)
		this.result.push(code)
		console.log(this.result)
	},
	loadData(item,callback){
		console.log(item)
		setTimeout(() => {
			var result =[];
			this.selectAllLable({type:item.type,code:item.code}).then(res => {
				console.log(res)
				if(res){
					res.forEach(element => {
						if(element.IF_CHILD !=1 ){
							result.push({
								title: element.LABEL_NAME,
								type:item.type,
								code:element.LABEL_CODE,
								creatData:element.CREATE_DATE,
								definition:element.DEFINITION,
								loading: false,
								children:[],
								render: (h, { root, node, data }) => {
									return h('span', {
										style: {
											display: 'inline-block',
											width: '100%',
											cursor: "pointer"
										},
										on:{
											click:() => {
												this.loadingData(data)
											}
										},
									},[
										h('span', data.title)
									])
								}
							})
						}else{
							result.push({
								title: element.LABEL_NAME,
								type:item.type,
								code:element.LABEL_CODE,
								creatData:element.CREATE_DATE,
								definition:element.DEFINITION,
								render: (h, { root, node, data }) => {
									return h('span', {
										style: {
											display: 'inline-block',
											width: '100%',
											cursor: "pointer"
										},
										on:{
											click:() => {
												this.loadingData(data)
											}
										},
									},[
										h('span', data.title)
									])
								}
							})
						}
					});
					console.log(result)
					callback(result)
				}
		})
		
		}, 1000);
		
	},
    expandData(value) {
      console.log(value, "expandData");
    }
  }
};
</script>
<style lang="less" scoped>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  position: relative;
}
</style>
