<template>
    <div id="score-wrapper">
        <div id="header-wrapper">
            
        </div>
        <div id="score">
            <h3 class="score-title">得分</h3>
            <p>{{score}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'score',
    props: {
        score: {
            type: Number,
            required: true
        }
    },
    data(){
        
    }
}
</script>

<style lang="stylus" scoped>
    
</style>