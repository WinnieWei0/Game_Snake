/**
 * Created by Administrator on 2017/9/23.
 */
;(function(window){
    //获取元素
    var document=window.document;
    var snake=document.getElementById("shenti");
    var food=document.getElementById("shiwu");
    var mainContent=document.getElementById("mainContent");

    //对象封装获取随机函数
    var obj={
        getRandom:function(n,m){
            return Math.floor(Math.random()*(m-n)+n);
        }
    };

    //食物的构造函数
    function Food(obj){
        obj=obj||{};
        this.x=obj.x||0;
        this.y=obj.y||0;
        this.width=obj.width||20;
        this.height=obj.height||20;
        this.color=obj.color||"red";
        this.init(food,mainContent);
    }
    //初始化食物对象
    Food.prototype.init=function(food,mainContent){
        this.x=obj.getRandom(0,mainContent.clientWidth/this.width)*this.width;
        this.y=obj.getRandom(0,mainContent.clientHeight/this.height)*this.height;

        var li=document.createElement("li");
        li.style.left=this.x+"px";
        li.style.top=this.y+"px";
        li.style.width=this.width+"px";
        li.style.height=this.height+"px";
        li.style.position="absolute";
        li.style.borderRadius="50%";
        li.style.backgroundColor=this.color;
        food.appendChild(li);
        //当前元素与li相关联
        this.element=li;
    };
//    window.Food=Food;
    Food.prototype.remove=function(){
      this.element.parentNode.removeChild(this.element);
    };
    //保存方向
    var Direction=Object.create(Object.prototype,{
        LEFT:{
            value:0
        },
        TOP:{
            value:1
        },
        RIGHT:{
            value:2
        },
        BOTTOM:{
            value:3
        }
    });
    //蛇的构造函数
    function Snake(obj){
        obj=obj||{};
        this.width=obj.width||20;
        this.height=obj.height||20;
        this.direction=obj.direction||Direction.RIGHT;
        this.body=[];
        this.body[0]={
            x:60,
            y:20,
            color:"limegreen"
        };
        this.body[1]={
            x:  40,
            y:20,
            color:"greenyellow"
        };
        this.body[2]={
            x:20,
            y:20,
            color:"greenyellow"
        };
        this.elements=[];
        this.init(snake);
    }
    //初始化蛇对象
    Snake.prototype.init=function(snake){
        for(var i=0;i<this.body.length;i++){
            var li=document.createElement("li");
            li.style.left=this.body[i].x+"px";
            li.style.top=this.body[i].y+"px";
            li.style.width=this.width+"px";
            li.style.height=this.height+"px";
            li.style.position="absolute";
            li.style.backgroundColor=this.body[i].color;
            snake.appendChild(li);
            //当前元素与li相关联
            this.elements.push(li);
        }
    };
//    window.Snake=Snake;
    //让蛇移动
    Snake.prototype.move=function(){
        for(var i=this.body.length-1;i>0;i--){
            var current=this.body[i];
            var prev=this.body[i-1];
            current.x=prev.x;
            console.log(current.x);
            current.y=prev.y;
            this.elements[i].style.left=current.x+"px";
            this.elements[i].style.top=current.y+"px";
        }
        switch(this.direction){
            case Direction.LEFT:
                this.body[0].x -=this.width;
                break;
            case Direction.RIGHT:
                this.body[0].x +=this.width;
                break;
            case Direction.TOP:
                this.body[0].y -=this.height;
                break;
            case Direction.BOTTOM:
                this.body[0].y +=this.height;
                break;
        }
        this.elements[0].style.left=this.body[0].x+"px";
        this.elements[0].style.top=this.body[0].y+"px";
    };
    //蛇身加长
    Snake.prototype.grow=function(snake){
        var last=this.body[this.body.length-1];
        var obj={
            x:last.x,
            y:last.y,
            color:last.color
        };
        this.body.push(obj);
        var li=document.createElement("li");
        li.style.left=obj.x+"px";
        li.style.top=obj.y+"px";
        li.style.width=this.width+"px";
        li.style.height=this.height+"px";
        li.style.position="absolute";
        li.style.backgroundColor=obj.color;
        snake.appendChild(li);
        //当前元素与li相关联
        this.elements.push(li);
    };

    //游戏构造函数
    function Game(){
        this.food=new Food();
        this.snake=new Snake();
        this.mainContent=mainContent;
        this.start();
    }
    Game.prototype.start=function(){
        var timer=setInterval(function(){
            this.snake.move();
            var head=this.snake.body[0];
            if(head.x<0||head.x>this.mainContent.offsetWidth-this.food.width){
                clearInterval(timer);
//                alert("GAME OVER");
            }
            if(head.y<0||head.y>this.mainContent.offsetHeight-this.food.height){
                clearInterval(timer);
//                alert("GAME OVER");
            }
            this.bindKey();  //键盘操作
            if(head.x==this.food.x&&head.y==this.food.y){
                this.food.remove();   //先清除食物
                this.snake.grow(snake);
                this.food=new Food();
            }
            for(var i=1;i<this.snake.body.length-1;i++){
                if(head.x==this.snake.body[i].x&&head.y==this.snake.body[i].y){
                    clearInterval(timer);
                    alert("GAME OVER");
                }
            }
        }.bind(this),250);
    };

    //键盘操作蛇蛇
    Game.prototype.bindKey=function (){
        eventTool.addListener(document,"keydown",function(e){
            e=eventTool.getEvent(e);
            switch(e.keyCode){
                case 37:
                    this.snake.direction=Direction.LEFT;
                    break;
                case 38:
                    this.snake.direction=Direction.TOP;
                    break;
                case 39:
                    this.   snake.direction=Direction.RIGHT;
                    break;
                case 40:
                    this.snake.direction=Direction.BOTTOM;
                    break;
            }
        }.bind(this));
    };
    window.Game=Game;
})(window);