//存取localStorage中的数据
var store = {
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}
// var list = [
	
// 		{
// 			title:"吃饭打豆豆",
// 			isChecked:false   //是否选中
// 		},
// 		{
// 			title:"吃饭打豆豆",
// 			isChecked:true
// 		}
	
// 	];
//取出所有的值
var list = store.fetch("todos-class");
var filter = {
				all:function(list){
					return list;
				},
				finlished:function(list){
					return list.filter(function(item){
						return item.isChecked;
					});

				},
				unfinlished:function(list){
					return list.filter(function(item){
						return !item.isChecked;
					});
				}
			};
var vm=new Vue({
	el:".main",
	data:{
		list:list,
		todo:"",
		edtorTodos:"",//记录正在编辑的数据
		beforeTitle:'',
		visibility:"all"//通过这个属性值的变化对数据进行筛选
	},
	watch:{
		// list:function(){//监控list这个属性，当这个属性对应的值发生变化就会执行函数
		// 	store.save("todos-class",this.list);
		// }
		list:{//深度监控
			handler:function(){
				store.save("todos-class",this.list);
			},
			deep:true
		}
	},
	//事件方法
	methods:{
		addTodo:function(ev){//添加任务
			//向list中添加一项任务
			if(ev.keyCode===13&&ev.target.value!=""){
				this.list.push({
					//尽量不使用DOM操作
					// title:ev.target.value
					title:this.todo,
					isChecked:false
				});
				this.todo="";	
			};
		},
		deleteTodo(obj){//删除任务
			// this.list.splice(obj,1);
			var index = this.list.indexOf(obj);
			this.list.splice(index,1);
		},
		edtorTodo(obj){//编辑任务
			this.edtorTodos=obj;

			this.beforeTitle=obj.title;
		},
		edtorTodoed(obj){//编辑任务成功
			this.edtorTodos="";
		},
		cancelTodo(obj){//取消编辑
			obj.title=this.beforeTitle;
			this.edtorTodos="";
			this.beforeTitle="";
		},	
	},
	//计算属性
	computed:{
		//计算有多少任务未完成
		noCheckeLength:function(){
			return this.list.filter(function(item){
                        return !item.isChecked
           }).length
		},
		//过滤list， all unfinlished finlished
		filteredList:function(){
			return filter[this.visibility]?filter[this.visibility](list):list;
		},
	},
	//自定义指令
	directives:{
		"foucs":{
			update(el,binging){
				if(binging.value){
					el.focus();
				}
			},
		}
	},
});



//监听hash值的改变
window.addEventListener("hashchange",watchHashChange);
watchHashChange();
function watchHashChange(){
	var hash=window.location.hash.slice(1);
	vm.visibility=hash;
}