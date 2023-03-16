import ToastComponent from "./toast.vue"

const Toast = {};

//注册Toast
Toast.install = (Vue) => {
    // 生成vue子类
    const ToastConstructor = Vue.extend(ToastComponent);
    // 生成一个该子类实例
    const instance = new ToastConstructor();

    // 将这个实例挂载在我创建的div上
    // 并将此div加入全局挂载点内部
    instance.$mount(document.createElement("div"));
    document.body.appendChild(instance.$el);

    // 通过Vue的原型注册一个方法
    // 让所有实例共享这个方法 <br>    // 其中的duration是持续时间
    Vue.prototype.$toast = (options, duration = 2000) => {
        instance.message = options.message;
        instance.type = options.type;
        instance.show = true;

        setTimeout(() => {
            instance.show = false;
        }, duration);
    }
}

export default Toast;
