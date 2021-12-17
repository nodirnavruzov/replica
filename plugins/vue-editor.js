import Vue from 'vue'
import Editor from 'vue-editor-js/src/index'
import { FormPlugin } from 'bootstrap-vue'
import { BForm } from 'bootstrap-vue'
import { BFormGroup } from 'bootstrap-vue'
Vue.component('b-form-group', BFormGroup)
Vue.component('b-form', BForm)
Vue.use(FormPlugin)
Vue.use(Editor)
