module.exports = {
	//接口文件
	entry :'./static/app.js',
	//发布位置
	output:{
		filename : 'ickt/demo.js'
	},
	//需要加载css文件
	module :{
		//定义加载器
		loaders:[
			{
				//匹配规则
				test:/\.css$/,
				//定义加载器，插件
				loader:'style-loader!css-loader'
			}
		]
	}
}