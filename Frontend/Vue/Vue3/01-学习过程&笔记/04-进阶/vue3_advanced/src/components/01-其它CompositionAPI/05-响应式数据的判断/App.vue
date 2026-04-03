<template> </template>
<script>
  import {
    defineComponent,
    isProxy,
    isReactive,
    isReadonly,
    isRef,
    reactive,
    readonly,
    ref,
    shallowReadonly,
  } from "vue";

  export default defineComponent({
    setup() {
      const admin = reactive({
        name: "Ashun",
        type: "Admin",
      });
      const title = ref("Ashuntefannao");
      const objRef = ref({ name: "Shun" });
      const readOnlyAdmin = readonly(admin);
      const shallowReadonlyAdmin = shallowReadonly(admin);
      //isReactive
      console.log(`isReactive(admin):${isReactive(admin)}`);
      console.log(`isReactive(objRef.value):${isReactive(objRef.value)}`);
      //isRef
      console.log(`isRef(title):${isRef(title)}`);
      console.log(`isRef(objRef):${isRef(objRef)}`);
      //isReadonly
      console.log(`isReadonly(readOnlyAdmin):${isReadonly(readOnlyAdmin)}`);
      console.log(
        `isReadonly(shallowReadonlyAdmin):${isReadonly(shallowReadonlyAdmin)}`
      );
      //isProxy
      console.log(`isProxy(admin):${isProxy(admin)}`);
      console.log(`isProxy(objRef.value):${isProxy(objRef.value)}`);
      let obj = { name: "Ashun" };
      let proxy = new Proxy(obj, {
        get(target, prop) {
          return Reflect.get(target, prop);
        },
        set(target, prop, newVal) {
          let result = Reflect.set(target, prop, newVal);
          return result;
        },
      });
      console.log(`isProxy(new Proxy()):${isProxy(proxy)}`);
    },
  });
</script>
