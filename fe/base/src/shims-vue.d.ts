declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module "libs/*" {
  const libs: any
  export default libs
}

declare module "vue/types/vue" {
  interface Vue {
  }
}

interface Window {
  __POWERED_BY_QIANKUN__: any
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: any
}
