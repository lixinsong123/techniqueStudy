/*
* class的继承等相关知识
  子类继承父类 使用extends关键字
  为父类指定静态方法，使用static方法名字
  super:
  	- 在构造函数中可以当一个函数来使用，相当于调用父类的构造函数
  	- 在原型方法中，可以当一个对象来使用，相当与父类的原型对象，
并且会自动绑定this 到子类上


*/
//extends static super
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const w = canvas.width=600;
const h = canvas.height=400;

class Ball{
	constructor(x,y,r){
		this.x = x;
		this.y = y;
		this.r = r;
		//~~去除小数
		this.color = `rgb(${~~Ball.fn_rp([55,255])},
			${~~Ball.fn_rp([55,255])},
			${~~Ball.fn_rp([55,255])}
		)`;
		return this;
	}
	render(ctx){
	 	ctx.save();
	 	ctx.translate(this.x,this.y);
	 	ctx.fillStyle = this.color;
	 	ctx.beginPath();
	 	ctx.arc(0,0,this.r,0,2*Math.PI);
	 	ctx.fill();
	 	ctx.restore();
	 	return this;
	}

	static fn_rp(arr){  //Ball.rpFn([1,10])
		let max = Math.max(...arr),
			min = Math.min(...arr);
		return Math.random()*(max-min)+min;
	}
}

//const ball1 = new Ball(100,100,30).render(ctx);

class SuperBall extends Ball{
	constructor(x,y,z){
	   super(x,y,z);//使用super关键字获取父类的属性赋值。
	   this.vy =SuperBall.fn_rp([2,4]);
	   this.g  =SuperBall.fn_rp([0.2,0.4]);
	   this.a = 0;
	   return this;
	}
	move(ctx){
		//super();//报错,不能当成一个函数使用
			this.y+= this.vy;
			this.vy+= this.g;
			let current =this.vy*-0.75;
			if(this.y+this.r>=ctx.canvas.height){
				this.y =ctx.canvas.height - this.r;
				if(Math.abs(current-this.a)<0.01){
				return false;
				}
				this.vy*=-0.75;
			}
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
		super.render(ctx);
		return true;
	}
};
 //const ball1 = new SuperBall(100,100,30).render(ctx); 

 let ball,timer;
 canvas.onclick = function(e){
 	let x =e.offsetX,y = e.offsetY;

 	let r =~~Ball.fn_rp([25,25]);
 	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
 	ball = new SuperBall(x,y,r).render(ctx);

 	ballMove();
}
function ballMove(){
	timer = window.requestAnimationFrame(ballMove);
	if(!ball.move(ctx)){
		window.cancelAnimationFrame(timer);
	}
}