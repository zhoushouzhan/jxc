import { reactive, onMounted } from "vue";
const YPmove = () => {
  let mpos = reactive({ w: window.pageXOffset, h: window.pageYOffset });
  onMounted(() => {
    window.addEventListener("mousemove", (e) => {
      mpos.w = e.pageX;
      mpos.h = e.pageY;
    });
  });
  return mpos;
};
export { YPmove };
