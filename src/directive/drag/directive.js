import { ref, reactive } from "vue";
export default {
  install(app) {
    const full = ref(false);
    const pos = reactive({ x: 0, y: 0 });
    app.directive("drag", {
      mounted(el, data) {
        el.onmousedown = (ev) => {
          if (ev.target.className&&ev.target.className.indexOf('cursor-move') < 0) {
            return;
          }
          if (full.value === true) {
            return;
          }

          const mouseXStart = ev.clientX;
          const mouseYStart = ev.clientY;
          const rectLeft = el.offsetLeft;
          const rectTop = el.offsetTop;

          if (pos.x == pos.y) {
            pos.x = rectLeft;
            pos.y = rectTop;
          }
          document.onmousemove = (e) => {
            if(ev.target.className,ev.target.className.indexOf('cursor-move')>0){
              const mouseXEnd = e.clientX;
              const mouseYEnd = e.clientY;
              const moveX = mouseXEnd - mouseXStart + rectLeft;
              const moveY = mouseYEnd - mouseYStart + rectTop;
              el.style["top"] = moveY + "px";
              el.style["left"] = moveX + "px";
            }

          };
          document.onmouseup = () => {
            document.onmousemove = null;
          };
        };
      },
      beforeUpdate(el, data) {
        full.value = data.value;
        if (data.value === true) {
          el.style["top"] = 0;
          el.style["left"] = 0;
        } else {
          if (pos.x != pos.y) {
            el.style["top"] = "";
            el.style["left"] = "";
          }
        }
      },
      beforeUnmount(el,data) {

      },
      unmounted(el,data) {

      },
    });
  },
};
