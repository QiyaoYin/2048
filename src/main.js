import Vue from 'vue';
import App from './App';
import router from './router/index'

new Vue({
    router,
    render: (h) => h(App), // == render: function (createElement) { return createElement(App); },
}).$mount('#app');