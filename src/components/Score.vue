<template>
    <div id="score-wrapper">
        <div class="inner-wrapper">
            <h1 id="header-wrapper">
                2048
            </h1>
            <div id="score" :class="[isFull ? 'full' : '']">
                <h3 id="score-title">得分</h3>
                <p id="score-content">{{scores}}</p>
            </div>
            <div id="re-game-wrapper">
                <div><label>纵向个数:</label><input class="x-num num" type="number" :value="yNum"></div>
                <div><label>横向个数:</label><input class="y-num num" type="number" :value="xNum"></div>
                <button id="re-game" @click="reGameEvt">重新开始</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'score',
    props: {
        scores: {
            type: Number,
            required: true
        },
        xNum: {
            type: Number,
            required: true
        },
        yNum: {
            type: Number,
            required: true
        },
        isFull: {
            type: Boolean,
            required: true
        }
    },
    methods:{
        reGameEvt(){
            let _confirm = confirm('确定重新开始游戏？');
            if(_confirm){
                let _x = Number(document.querySelector('.y-num').value);
                let _y = Number(document.querySelector('.x-num').value);
                if(_x > 10 || _y > 10){alert('不能大于10！');return ;}
                this.$emit('reGameEvt',_x,_y);
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import '../assets/css/global.styl';
    #score-wrapper{
        width 100%
        padding 20px 0
        overflow hidden
        text-align center

        .inner-wrapper{
            display inline-block
        }

        #header-wrapper{
            font-size 50px
            color $header-color
            display inline-block
            padding 20px 0
            margin 0
            vertical-align middle
        }

        #score{
            display inline-block
            background-color $border-color
            color #ffffff
            padding 5px 40px
            border-radius 10px
            margin 0 20px
            vertical-align middle

            #score-title{
                margin 0
            }

            #score-content{
                width 100%
                margin 0
                padding 5px 0
                text-align center
            }
        }

        #score.full{
            color $-other-background-color
        }


        #re-game-wrapper{
            display inline-block
            vertical-align middle
            
            label{
                font-size 12px
                color #999999
                padding 10px
            }

            .num{
                padding 5px 10px
                outline none 
                margin 10px 0 
            }
            
            #re-game{
                background-color $header-color
                color #ffffff
                padding 5px 30px 
                border none
                outline  none 
                border-radius 3px
                //transform translateY(-50%)

                &:hover{
                    cursor pointer
                }
            }
        }

        @media screen and (max-width: 540px){
            &{
                padding 5px
            }

            #header-wrapper{
                font-size 20px
                padding 10px 0
            }

            #score{
                padding 5px 30px
            }

            #re-game-wrapper{
                .num{
                    width 50px
                }
            }            
        }
    }
</style>