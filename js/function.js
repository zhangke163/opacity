//解决获取类名的兼容问题
//classname是哪个类名
//father是父容器，获取范围

function getClass(classname,father){
	father=father||document;    //设置默认值,当没有传参数时，默认为document;如果传了参数，就按传的参数
     if(father.getElementsByClassName){   
     	return father.getElementsByClassName(classname);
     }else{
        var all=father.getElementsByTagName("*");//取出Html中的所有标签
        var newarr=[];  //定义一个新的数组存放需要的标签
        for(var i=0;i<all.length;i++){  //遍历所有的标签
        	if(checkPre(all[i].className,classname)){  //如果标签的类名等于需要的类名时，取出该标签放到新的数组中
        		  newarr.push(all[i]);    
        	}
        }
        return newarr;
     }	
}
function checkPre(str,classname){  //判断一个class里有多个类名时是否有自己需要筛选出来的类名
   var arr=str.split(" ");       //将字符串转化为数组，分隔符为空格
   for(var i in arr){      
   	if(arr[i]==classname){
        return true;
   	}
   }
   return false;
}
// 1.判断浏览器
// 2.如果是现代，用原生的方式
// 3.如果是IE,先选中所有的标签，再遍历，再判断,判断完保存到新数组中


/***********************************************************************/


//2016-08-05
    //获取样式的兼容函数
    //obj：对象
    //attr属性      //传进来的attr是带双引号的
    function getStyle(obj,attr){
      if(obj.currentStyle){
        return   obj.currentStyle[attr];
      }else{
        return   getComputedStyle(obj,null)[attr];
      }
     }


/*******************************************************************/
//2016-08-08
//3.获取元素的兼容函数
//"#"id "."类名 "a"   
 //selecter表示为选择器,当它是字符串时,获取元素；当它为函数时，实现页面加载完成
function $(selecter,father){
   if(typeof selecter=="string"){
        father=father||document;
        selecter=selecter.replace(/^\s*|\s$/g,"");
        if(selecter.charAt(0)=="."){   //类名
        //slice(1),把.截取
        return  getClass(selecter.slice(1),father); 
        }else if(selecter.charAt(0)=="#"){  //id名
        return document.getElementById(selecter.slice(1));
        }else if(/^[a-z]+\d*$/g.test(selecter)){  //标签名
        return father.getElementsByTagName(selecter);
        }
     }
     else if(typeof selecter=="function"){
      window.onload=function(){
        selecter();
      }
     }

}
// 正则：一个定规则的表达式对象
// /  /



/*********************************************************/
//2016-08-10
//4.获取节点中的子节点
function getChilds(father,type){
  var all=father.childNodes;   //将父容器的子元素保存到all变量中
  var newarr=[];   //定义一个新的数组来保存新的子元素
  for(var i=0;i<all.length;i++){
    type=type||"a";
    if(type=="a"){    //子节点只有元素节点
      if(all[i].nodeType==1){   
        newarr.push(all[i]);
      }
    }
    if(type=="b"){   //子节点有元素节点和非空的文本节点
      if(all[i].nodeType==1||(all[i].nodeType==3 && all[i].nodeValue.replace(/^\s*|\s$/g,"")!="")){
        newarr.push(all[i]);
      }
         
     }  
  }
  return newarr;
}
//5.获取第一个子节点
function getFirst(father){
 return getChilds(father)[0]
}

//6.获取最后一个子节点
function getLast(father){
  var i=getChilds(father).length-1;
  return getChilds(father)[i];
}

//7.获取指定的子节点元素
//num为传进元素的下标
function getNum(father,num){
   return getChilds(father)[num];
}
//8.获取下一个兄弟节点
function getNext(obj){
   var next=obj.nextSibling;
   if(!next){ 
          return false;
        }
   while(next.nodeType==3||next.nodeType==8){
        next=next.nextSibling;
        if(!next){  //next为null,if语句隐式转换为false,所以非一下
          return false;
        }
   }
   return next;
}
//9.获取上一个个兄弟节点
function getPre(obj){
  var pre=obj.previousSibling;
  if(!pre){
        return false;
    }
  while(pre.nodeType==3||pre.nodeType==8){
    pre=pre.previousSibling;
    if(!pre){
        return false;
    }
  }
  return pre;
}


/*************************************************************************/
//2016-08-11
//10.把一个元素插入到某一个元素之后
function insertAfter(father,newobj,oldobj){
   var next=getNext(oldobj);  //获取之前对象的下一个兄弟节点
   if(next){
    father.insertBefore(newobj,next);
   }
   else{
    father.appendChild(newobj);
   }
   return next;
}

/****************************************************/
//11.绑定事件的兼容函数
function addEvent(obj,event,fun){
  if(obj.attachEvent){
    obj.attachEvent("on"+event,function(){
      fun.call(obj);
    });
  }else{
    obj.addEventListener(event,fun,false);
  }
}
/**********************************************************/
//2016.8.15
//12.兼容鼠标滚轮的函数
function mouseWheel(obj,upfun,downfun){   //upfun向上滑   //downfun向下滑
  if(document.attachEvent){  //检测是否古代浏览器 IE
    document.attachEvent("onmousewheel",scrollFn); //IE、opera    //"onmousewheel" 事件  scrollFn事件处理程序
  }else if(document.addEventListener){  //检测是否现代浏览器
    document.addEventListener("mousewheel",scrollFn,false); //chrome,safari -webkit-
    document.addEventListener("DOMMouseScroll",scrollFn,false);  //firefox -moz-
  }
  function scrollFn(e){
    var eve=e||window.event;
     if(eve.preventDefault){eve.preventDefault();}  //阻止浏览器默认行为
       else(eve.returnValue=false)

    var fangxiang=eve.wheelDelta||eve.detail;
    // 火狐FF  向上： -3  向下：3
    //IE 120   
        if(fangxiang==-3||fangxiang==120){   
          //向上
          if(upfun){upfun();}
        }
        if(fangxiang==3||fangxiang==-120){
          //向下
          if(downfun){downfun();}
        }

  }
}
//8.16
//13.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
// 设置cookie
function setCookie(attr,value,time){
   if(time){
     var nowtime=new Date();
     nowtime.setTime(nowtime.getTime()+time*1000);
     document.cookie=attr+"="+value+";expires="+nowtime.toGMTString();
   }else{
    document.cookie=attr+"="+value;
   }
}
// 拿到cookie
// "aa=bb; bb=cc; cc=dd;"
//["aa=bb" "bb=cc" "cc=dd"]  arr
//[[aa,bb] [bb,cc] [cc,dd]]   brr
function getCookie(attr){
   var cookies=document.cookie;
   var arr=cookies.split("; ");//字符串转化为数组
   for(var i=0;i<arr.length;i++){
		var brr=arr[i].split("=");
		if(brr[0]==attr){
		      return brr[1];
		}
   };
   return false;
}
//删除cookie  要删除的元素返回原来的时间
function delCookie(attr){
	var nowtime=new Date();
	nowtime.setTime(nowtime.getTime()-1);
	document.cookie=attr+"=dhfd;expires="+nowtime.toGMTString();
}