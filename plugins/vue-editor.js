import Vue from 'vue'
import Editor from 'vue-editor-js/src/index'
import { BFormGroup, TabsPlugin, BForm, FormPlugin } from 'bootstrap-vue'
Vue.use(TabsPlugin)
Vue.component('b-form-group', BFormGroup)
Vue.component('b-form', BForm)
Vue.use(FormPlugin)
Vue.use(Editor)
