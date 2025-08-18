import {shallowRef ,ref ,h} from 'vue'
export function defineAsyncComponent(options) {
  if (typeof options === 'function') {
    options = {
      loader: options
    }
  }

  // 占位符组件
  const defaultComponent = () => h('span','占位组件')

  const {	
    loader,
    loadingComponent = defaultComponent,
    errorComponent = defaultComponent,
    timeout
  } = options

  return {
    setup(_, { attrs, slots }) {

      const component = shallowRef(loadingComponent)

      /**
       * loader 函数返回一个 Promise
       * 但是这个 Promise 我们不能控制它的成功和拒绝
       */
      loadComponent()
        .then(res => {
          if (res && res[Symbol.toStringTag] === 'Module') {
            component.value = res.default
          }
          /**
           * 1000 ms 会进来
           */
        })
        .catch((err) => {
          console.log('error',err)
          // 组件加载失败了，改为 defaultComponent
          component.value = errorComponent
        })

      function loadComponent() {
        return new Promise((resolve, reject) => {

          /**
           * 到点了，还没完成，我就调用 reject
           */

          // reject(1)
          if (timeout && timeout > 0) {
            setTimeout(() => {
              reject('超时了')
            }, timeout)
          }

          loader().then(resolve, reject)
        })
      }

      return () => {
        return h('div', [h(component.value, attrs, slots)])
      }
    }
  }
}


