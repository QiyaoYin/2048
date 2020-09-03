<template>
    <div id="score-wrapper">
        <h1 id="header-wrapper">
            2048
        </h1>
        <div id="score">
            <h3 id="score-title">得分</h3>
            <p id="score-content">{{scores}}</p>
        </div>
        <button id="re-game" @click="reGameEvt">重新开始</button>
    </div>
</template>

<script>
export default {
    name: 'score',
    props: {
        scores: {
            type: Number,
            required: true
        }
    },
    methods:{
        reGameEvt(){
            let _confirm = confirm('确定重新开始游戏？');
            if(_confirm) this.$emit('reGameEvt');
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import '../assets/css/global.styl';
    #score-wrapper{
        width 100%
        min-width 450px
        padding 20px 0
        overflow hidden

        #header-wrapper{
            font-size 50px
            color $header-color
            display inline-block
            padding 20px 0
            margin 0
        }

        #score{
            display inline-block
            background-color $border-color
            color #ffffff
            padding 5px 40px
            border-radius 10px
            margin 0 20px

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

        #re-game{
            background-color $header-color
            color #ffffff
            padding 5px 30px 
            border none
            outline  none 
            border-radius 3px
            transform translateY(-50%)

            &:hover{
                cursor pointer
            }
        }
    }
</style>