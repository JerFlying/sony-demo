// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import websocket from 'vue-native-websocket'

Vue.config.productionTip = false
Vue.prototype.$websocket = websocket

Vue.use(websocket, 'ws://localhost:3000', {

  reconnection: true, // (Boolean) whether to reconnect automatically (false)

  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),

  reconnectionDelay: 3000 // (Number) how long to initially wait before attempting a new (1000)

})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
