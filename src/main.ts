import './assets/main.css';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

import { createApp } from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import VueScrollTo from 'vue-scrollto';
import App from './App.vue';

const app = createApp(App);

app.component('RecycleScroller', RecycleScroller);
app.use(VueScrollTo, {
    container: "#main",
    duration: 500,
    easing: "ease",
    offset: 0,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
});
// app.directive('scroll-to', VueScrollTo);
app.mount('#app');
