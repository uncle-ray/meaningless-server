import './public-path'
import { createApp } from 'vue'
import { 
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start,
  initGlobalState
} from 'qiankun'
import { Button } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import App from './App.vue'
import store from './store'
import render from './render'

render({loading: true})

const loader = (loading: boolean) => render({ loading })

registerMicroApps([
  {
    name: 'userManage',
    entry: '//localhost:7003',
    container: '',
    loader,
    activeRule: '/user'
  }
])

const app = createApp(App as any)

app
  .use(store)
  .use(Button)
  .mount('#app')
  