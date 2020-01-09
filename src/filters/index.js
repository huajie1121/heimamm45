//导入vue
import Vue from "vue"
//导入时间
import moment from "moment"
//全局过滤器
Vue.filter('formatTime', function (value) {
    return moment(value).format('YYYY🐹MM🐹DD🐹')
})
