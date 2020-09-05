<template>
    <div id="main-wrapper">
        <score :scores='scores' @reGameEvt="initPanMap" :xNum='xNum' :yNum='yNum' :isFull='isFull'/>

        <div id="game-wrapper" :class="[isMobile ? 'mobile' : '']">
            <template v-for="(pan,index) in panMap">
                <pan v-for="(p,index2) in pan" :key="`${index},${index2}`" :x="index" :y="index2" :num="p" :panWidth='panWidth' :panHeight='panHeight'/>
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
            panMap:[[]],
            xNum: 4,
            yNum: 4,
            panWidth: 0,
            panHeight: 0,
            isFull: false,
        }
    },
    mounted(){
        this.initPanMap();
        this.initkeyUp();
    },
    computed:{
        isMobile(){
            return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        }
    },
    methods:{
        initGameWrapper(){
            return new Promise((resolve,reject)=>{
                let _gameWrapper = document.querySelector('#game-wrapper');
                let _panWrapper = document.querySelectorAll('.pan-wrapper');

                _gameWrapper.style.width = this.yNum * 100 + 'px';
                _gameWrapper.style.height = this.xNum * 100 + 'px';

                let _gameWrapperWidth = _gameWrapper.clientWidth;
                let _gameWrapperHeight = _gameWrapper.clientHeight;
                this.panWidth = (_gameWrapperWidth / this.yNum) * ((this.yNum - 0.5) / this.yNum);
                this.panHeight = (_gameWrapperHeight / this.xNum) * ((this.xNum - 0.5) / this.xNum);
                resolve();
            });
        },
        initPanMap(x,y){ //初始化 数组
            this.scores = 0;
            this.panMap.length = 0;
            this.isFull = false;
            if(x && y){this.xNum = x;this.yNum = y;}
            this.initGameWrapper().then(()=>{
                for(let i = 0;i < this.xNum;i++){
                    this.$set(this.panMap,i,new Array());
                    for(let j = 0;j < this.yNum;j++){
                        this.panMap[i][j] = 0;
                    }
                }
                for(let i = 0;i < 2;i++){
                    this.addNum();
                }
            });
        },
        initkeyUp(){
            let _this = this;
            if(this.isMobile){
                let startX, startY, moveEndX, moveEndY, X, Y; 
                document.addEventListener('touchstart',e=>{
                    e.preventDefault();
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                },false);

                document.addEventListener('touchend',e=>{
                    e.preventDefault();
                    moveEndX = e.changedTouches[0].pageX;
                    moveEndY = e.changedTouches[0].pageY;
                    X = moveEndX - startX;
                    Y = moveEndY - startY;
                    if( Math.abs(X) > Math.abs(Y) && X > 50) {// right 
                        _this.addRight();
                    }else if( Math.abs(X) > Math.abs(Y) && X < -50) {// left
                        _this.addLeft();
                    }else if( Math.abs(Y) > Math.abs(X) && Y > 50) {// down
                        _this.addDown();
                    }else if( Math.abs(Y) > Math.abs(X) && Y < -50) {// up
                        _this.addUp();
                    }else{//没有发生滑动
                    }
                },false);
            }else{
                document.addEventListener('keyup',e=>{
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
                });
            }
        },
        addUp(){
            let step,flag = false;
            for(let i = 0;i < this.yNum;i++){                
                step = 1;
                for(let j = 0;j < this.xNum - 1;){
                    while(this.panMap[j + step] && this.panMap[j + step][i] === 0){step++;}
                    if(this.panMap[j + step] && this.panMap[j][i] === this.panMap[j + step][i]){
                        this.scores += this.panMap[j][i] * 2;
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
            for(let i = 0;i < this.yNum;i++){         
                step = 1;
                for(let j = 0;j < this.xNum - 1;j++){
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
            for(let i = this.yNum - 1;i >= 0;i--){                
                step = 1;
                for(let j = this.xNum - 1;j > 0;){
                    while(this.panMap[j - step] && this.panMap[j - step][i] === 0){step++;}
                    if(this.panMap[j - step] && this.panMap[j][i] === this.panMap[j - step][i]){
                        this.scores += this.panMap[j][i] * 2;
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
            for(let i = this.yNum - 1;i >= 0;i--){         
                step = 1;
                for(let j = this.xNum - 1;j > 0;j--){
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
            for(let i = 0;i < this.xNum;i++){                
                step = 1;
                for(let j = 0;j < this.yNum - 1;){
                    while(this.panMap[i][j + step] === 0){step++;}
                    if(this.panMap[i][j] === this.panMap[i][j + step]){
                        this.scores += this.panMap[i][j] * 2;
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
            for(let i = 0;i < this.xNum;i++){         
                step = 1;
                for(let j = 0;j < this.yNum - 1;j++){
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
            for(let i = 0;i < this.xNum;i++){                
                step = 1;
                for(let j = this.yNum - 1;j > 0;){
                    while(this.panMap[i][j - step] === 0){step++;}
                    if(this.panMap[i][j] === this.panMap[i][j - step]){
                        this.scores += this.panMap[i][j] * 2;
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
            for(let i = 0;i < this.xNum;i++){         
                step = 1;
                for(let j = this.yNum - 1;j > 0;j--){
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
            let x = Math.floor(Math.random() * this.xNum);
            let y = Math.floor(Math.random() * this.yNum);
            if(this.panMap[x][y] === 0){
                this.$set(this.panMap[x],y,Math.random() > 0.7 ? 4 : 2);
                if(!this.hasEmpty()){
                    this.isFull = true;
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
            display: inline-flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
            background-color: #b9ada1;
            max-width: 450px;
            max-height 450px;
            border-radius: 5px;
        }

        #game-wrapper.mobile{
            max-width: 100vmin;
            max-height 100vmin;
        }
    }
</style>