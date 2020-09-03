<template>
    <div :class="['pan-wrapper','num-' + num]">
        {{num === 0 ? "" : num}}
    </div>
</template>

<script>
export default {
    name: 'pan',
    props: {
        num: {
            type: Number,
            required: true
        }
    },
    mounted(){
        
    }
}
</script>

<style lang="stylus" scoped>
    @import '../assets/css/global.styl';
    .pan-wrapper{
        display flex
        align-items center
        justify-content center
        width 100px
        height 100px
        margin 10px 0 0 10px
        border-radius 3px
        background-color $-other-background-color
        color $-other-font-color
        font-size 30px
        float left
    }

    .pan-wrapper.num-0{
        color #ffffff
        background-color $background-color
    }

    .pan-wrapper.num-2{
        color $-2-font-color
        background-color $-2-background-color
    }

    .pan-wrapper.num-4{
        color $-4-font-color
        background-color $-4-background-color
    }

    .pan-wrapper.num-8{
        color $-8-font-color
        background-color $-8-background-color
    }

    .pan-wrapper.num-16{
        color $-16-font-color
        background-color $-16-background-color
    }

    .pan-wrapper.num-32{
        color $-32-font-color
        background-color $-32-background-color
    }

    .pan-wrapper.num-64{
        color $-64-font-color
        background-color $-64-background-color
    }

    .pan-wrapper.num-128{
        color $-128-font-color
        background-color $-128-background-color
    }

    .pan-wrapper.num-256{
        color $-256-font-color
        background-color $-256-background-color
    }

    .pan-wrapper.num-512{
        color $-512-font-color
        background-color $-512-background-color
    }

    .pan-wrapper.num-1024{
        color $-1024-font-color
        background-color $-1024-background-color
    }

    .pan-wrapper.num-2048{
        color $-2048-font-color
        background-color $-2048-background-color
    }

    .pan-wrapper.num-4096{
        color $-4096-font-color
        background-color $-4096-background-color
    }

    .pan-wrapper.num-8192{
        color $-8192-font-color
        background-color $-8192-background-color
    }

    .pan-wrapper.num-16384{
        color $-16384-font-color
        background-color $-16384-background-color
    }
</style>