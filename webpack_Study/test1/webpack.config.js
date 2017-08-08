//在webpack的配置文件中，我们通常将配置暴露在接口中
module.exports ={
	//配置定义在这里
	//定义入口文件
	entry: './js/app.js',
	//定义文件发布的位置
	output:{
		filename:'demo/dest.js'
	}
}