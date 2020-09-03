<template>
    <div id="main-wrapper">
        <score :scores='scores' @reGameEvt="initPanMap"/>

        <div id="game-wrapper">
            <template v-for="(pan,index) in panMap">
                <pan v-for="(p,index2) in pan" :key="`${index},${index2}`" :class="`pan-${index}${index2}`" :num="p"/>
            </template>
        </div>
    </div>
</template>

<script>
import score from '@/components/Score';
import pan from '@/components/Pan';

export default {
    name: 'index',
    data(){
        return {
            scores: 0,
            panMap:[[]]
        }
    },
    mounted(){
        this.initPanMap();
        this.initkeyUp();
    },
    methods:{
        initPanMap(){ //初始化 数组
            for(let i = 0;i < 4;i++){
                this.$set(this.panMap,i,new Array());
                for(let j = 0;j < 4;j++){
                    this.panMap[i][j] = 0;
                }
            }
            for(let i = 0;i < 2;i++){
                this.addNum();
            }
        },
        initkeyUp(){
            let _this = this;
            document.onkeyup = function(e){
                let _code = e.keyCode;
                switch(_code){
                    case 38: //up
                        _this.addUp();
                        break ;
                    case 39: //right
                        _this.addRight();
                        break ;
                    case 40: //down
                        _this.addDown();
                        break ;
                    case 37: //left
                        _this.addLeft();
                        break ;
                }
            }
        },
        addUp(){
            let step,flag = false;
            for(let i = 0;i < 4;i++){                
                step = 1;
                for(let j = 0;j < 3;){
                    while(this.panMap[j + step] && this.panMap[j + step][i] === 0){step++;}
                    if(this.panMap[j + step] && this.panMap[j][i] === this.panMap[j + step][i]){
                        this.scores += Number(this.panMap[j][i]) * 2;
                        flag = true;
                        this.$set(this.panMap[j],i,this.panMap[j][i] + this.panMap[j + step][i]);
                        this.panMap[j + step][i] = 0;
                    }
                    j += step;
                    step = 1;
                }
            }
            this.clearUp(flag);
        },
        clearUp(flag){
            let step;
            for(let i = 0;i < 4;i++){         
                step = 1;
                for(let j = 0;j < 3;j++){
                    if(this.panMap[j][i]){continue ;}
                    while(this.panMap[j + step] && this.panMap[j + step][i] === 0){step++;}
                    if(this.panMap[j + step]){
                        flag = true;
                        this.$set(this.panMap[j],i,this.panMap[j + step][i]);
                        this.panMap[j + step][i] = 0;
                    }
                }
            }
            if(flag){
                this.addNum();
            }
        },
        addDown(){
            let step,flag = false;
            for(let i = 3;i >= 0;i--){                
                step = 1;
                for(let j = 3;j > 0;){
                    while(this.panMap[j - step] && this.panMap[j - step][i] === 0){step++;}
                    if(this.panMap[j - step] && this.panMap[j][i] === this.panMap[j - step][i]){
                        this.scores += Number(this.panMap[j][i]) * 2;
                        flag = true;
                        this.$set(this.panMap[j],i,this.panMap[j][i] + this.panMap[j - step][i]);
                        this.panMap[j - step][i] = 0;
                    }
                    j -= step;
                    step = 1;
                }
            }
            this.clearDown(flag);
        },
        clearDown(flag){
            let step;
            for(let i = 3;i >= 0;i--){         
                step = 1;
                for(let j = 3;j > 0;j--){
                    if(this.panMap[j][i]){continue ;}
                    while(this.panMap[j - step] && this.panMap[j - step][i] === 0){step++;}
                    if(this.panMap[j - step]){
                        flag = true;
                        this.$set(this.panMap[j],i,this.panMap[j - step][i]);
                        this.panMap[j - step][i] = 0;
                    }
                }
            }
            if(flag){
                this.addNum();
            }
        },
        addLeft(){
            let step,flag = false;
            for(let i = 0;i < 4;i++){                
                step = 1;
                for(let j = 0;j < 3;){
                    while(this.panMap[i][j + step] === 0){step++;}
                    if(this.panMap[i][j] === this.panMap[i][j + step]){
                        this.scores += Number(this.panMap[i][j]) * 2;
                        flag = true;
                        this.$set(this.panMap[i],j,this.panMap[i][j] + this.panMap[i][j + step]);
                        this.panMap[i][j + step] = 0;
                    }
                    j += step;
                    step = 1;
                }
            }
            this.clearLeft(flag);
        },
        clearLeft(flag){
            let step;
            for(let i = 0;i < 4;i++){         
                step = 1;
                for(let j = 0;j < 3;j++){
                    if(this.panMap[i][j]){continue ;}
                    while(this.panMap[i][j + step] === 0){step++;}
                    if(this.panMap[i][j + step]){
                        flag = true;
                        this.$set(this.panMap[i],j,this.panMap[i][j + step]);
                        this.panMap[i][j + step] = 0;
                    }
                }
            }
            if(flag){
                this.addNum();
            }
        },
        addRight(){
            let step,flag = false;
            for(let i = 0;i < 4;i++){                
                step = 1;
                for(let j = 3;j > 0;){
                    while(this.panMap[i][j - step] === 0){step++;}
                    if(this.panMap[i][j] === this.panMap[i][j - step]){
                        this.scores += Number(this.panMap[i][j]) * 2;
                        flag = true;
                        this.$set(this.panMap[i],j,this.panMap[i][j] + this.panMap[i][j - step]);
                        this.panMap[i][j - step] = 0;
                    }
                    j -= step;
                    step = 1;
                }
            }
            this.clearRight(flag);
        },
        clearRight(flag){
            let step;
            for(let i = 0;i < 4;i++){         
                step = 1;
                for(let j = 3;j > 0;j--){
                    if(this.panMap[i][j]){continue ;}
                    while(this.panMap[i][j - step] === 0){step++;}
                    if(this.panMap[i][j - step]){
                        flag = true;
                        this.$set(this.panMap[i],j,this.panMap[i][j - step]);
                        this.panMap[i][j - step] = 0;
                    }
                }
            }
            if(flag){
                this.addNum();
            }
        },
        addNum(){
            let x = Math.floor(Math.random() * 4);
            let y = Math.floor(Math.random() * 4);
            if(this.panMap[x][y] === 0){
                this.$set(this.panMap[x],y,Math.random() > 0.7 ? 4 : 2);
                if(!this.hasEmpty()){
                    alert('结束');
                }
            }else{
                this.addNum();
            }
        },
        hasEmpty(){//是否满了
            return this.panMap.some((item,col,arr)=>{
                return item.some((ele,row)=>{
                    if(ele === 0 || (arr[col - 1] && arr[col - 1][row] === ele) || (arr[col + 1] && arr[col + 1][row] === ele) || (arr[row - 1] && arr[col][row - 1] === ele) || (arr[row + 1] && arr[col][row + 1] === ele)){
                        return true;
                    }
                    return false;
                })
            })
        }
    },
    components: {
        score,
        pan
    }
}
</script>

<style lang="stylus" scoped>
    @import '../assets/css/global.styl';
    
    #main-wrapper{
        width 100%
        text-align center
        
        #game-wrapper{
            display inline-block
            background-color $border-color
            width 450px
            height 450px
            border-radius 5px
        }
    }
</style>