new Vue({
    el:"#cart",
    data:{             
        tabs:[],
        tabprice:[],
        uname:'',
        isCheckedAll:false
    },
    created(){
        $.ajax({
            type:'get',
            url:'http://127.0.0.1:8888/user/islogin',
            dataType:'json',
            success:res=>{
                var {code,uname} = res;
                this.uname = uname;
                if(code==1){
                    $.ajax({
                        type:'get',
                        url:'http://127.0.0.1:8888/cart/list',
                        data:{uname},
                        dataType:'json',
                        success:res=>{
                            this.tabs = res;
                            for(var k of res){
                                if(k.selection==1)
                                    this.tabprice.push(k);
                            }
                            if(this.tabs.length==this.tabprice.length){
                                this.isCheckedAll = true;
                            }
                        }
                    });
                }else if(code==-1){
                    alert('请先登录');
                    location.href="http://127.0.0.1:8888/login.html?back="+location.href;
                }
            }
        });
    },
    methods:{
        checkedOne(i){
            this.tabs[i].selection = this.tabs[i].selection==1?0:1;
            var tabid = this.tabs[i];
            axios.get('http://127.0.0.1:8888/cart/cart/upselect?cid='+tabid.cid+'&select='+tabid.selection);
            let idindex=this.tabprice.indexOf(tabid)
            if(idindex>=0){
                // this.tabids.splice(idindex,1)
                this.tabprice.splice(idindex,1);
                this.isCheckedAll = false;
            }else{
                // this.tabids.push(tabid.cid)
                this.tabprice.push(tabid);
                if(this.tabs.length==this.tabprice.length){
                    this.isCheckedAll = true;
                }
            }
        },
        checkedAll(event){
            var cks = 0;
            var uname = this.uname;
            if(event.currentTarget.checked){
                this.tabprice = [];
                this.tabprice = this.tabprice.concat(this.tabs);
                cks = 1;
            }else{
                this.tabprice=[];
                cks = 0;
            }
            $.ajax({
                type:'get',
                url:'http://127.0.0.1:8888/cart/checkAll',
                data:{cks,uname}
            });
        },
        plus(cid,i){            
            axios.get('http://127.0.0.1:8888/cart/cart/up?cid='+cid+'&coun='+ ++this.tabs[i].coun)
                .then(res=>console.log(res)
                )
                .catch(err=>console.log(err))
            },
        minus(cid,i){
            if(this.tabs[i].coun>1){
                axios.get('http://127.0.0.1:8888/cart/cart/up?cid='+cid+'&coun='+ --this.tabs[i].coun)
                .then(res=>console.log(res)
                )
                .catch(err=>console.log(err))
            }
           this.tabs[i].coun==1
        },
        del(cid,i){
            let bool=confirm("确定要将商品移出购物车吗？")
            if(bool){ 
                console.log(this.tabs[i]);
                if(this.tabs[i].selection==1){
                    this.tabprice.map((val,index)=>{
                        if(val.cid==this.tabs[i].cid){
                            this.tabprice.splice(index,1);
                        }
                    });
                }
                this.tabs.splice(i,1);
                if(this.tabs.length==this.tabprice.length){
                    this.isCheckedAll = true;
                }
                if(this.tabs.length==0){
                    this.isCheckedAll = false;
                }
                axios.get('http://127.0.0.1:8888/cart/cart/del?cid='+cid);
            }
        },
        pay(){
            let bool=confirm("本次需支付"+this.total+"元")
            
            }        
        },
    computed:{
        total(){
            return this.tabprice.reduce((total,num)=>total+num.price*num.coun,0)
        },
    }
    // watch:{
    //     tabprice(index){
    //         return this.total()
    //     }
    // }
})