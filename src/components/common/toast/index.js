import Toast from './Toast'
const obj = {}

//封装install函数
obj.install=function(Vue){
  //1创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  //2new的方式 根据组件构造器 可以创建出一个组件象
  const toast = new toastConstructor()

  //3将组件对象手动挂载到某个元素上 挂载完成才能使用组件的模板内容(toast.$el) 也就是Toast组件里面的template 
  toast.$mount(document.createElement("div"))

  //4toast.$el 对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast=toast
}

export default obj
  