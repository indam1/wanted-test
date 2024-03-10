import './assets/main.css';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

import { createApp } from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import App from './App.vue';

const app = createApp(App);

app.component('RecycleScroller', RecycleScroller);

app.mount('#app');
