
// 方向
const allDirection = ["left", "bottom", "right", "top"];
const calculationLocation=(el, target, placements)=> {
  if (!el || !target) return;
  let el_dom = el.getBoundingClientRect();
  let target_dom = target.getBoundingClientRect();
  let x=0,y=0;
  if (placements === "left") {
    x = target_dom.x - el_dom.width - 10;
    y = target_dom.y - el_dom.height / 2 + target_dom.height / 2;
  } else if (placements === "bottom") {
    x =target_dom.x + target_dom.width / 2 - el_dom.width / 2;
    y = target_dom.y + el_dom.height + 10;
  } else if (placements === "right") {
    x = target_dom.x + target_dom.width + 10;
    y = target_dom.y - el_dom.height / 2 + target_dom.height / 2;
  } else if (placements === "top") {
    x = target_dom.x + target_dom.width / 2 - el_dom.width / 2;
    y = target_dom.y - el_dom.height - 10;
  }
  return [x,y]
}


export default {
  install(app) {
    app.directive("tooltip", {
      mounted(el, binding) {
        let tooldiv=document.createElement("div");
        tooldiv.className="tooltips"
        let txtspan=document.createElement("span")
        txtspan.innerText=binding.value
        txtspan.className="tooltip-text"
        let arrow=document.createElement("div")
        tooldiv.appendChild(txtspan)
        tooldiv.appendChild(arrow)
        document.body.appendChild(tooldiv);
        tooldiv.style.display='none'
        const showTips=()=>{
          const direction = allDirection.filter(
            (item) => binding.modifiers[item]
          );
          let obj=el.getBoundingClientRect()
          let x=obj.x/2
          let y=obj.y/2
          let id=x+''+Math.round(y)
          tooldiv.id=id
          arrow.className=`tooltip-arrow ${direction[0]}`
          tooldiv.style.display='block'
          const pos=calculationLocation(tooldiv,el,direction[0])
          tooldiv.style.transform=`translate3d(${pos[0]}px,${pos[1]}px,0)`
        }
        const hideTips=()=>{
          tooldiv.style.display='none'
        }
        el.addEventListener("mouseenter", showTips);
        el.addEventListener("mouseleave", hideTips);
      },
      updated(el, binding) {

      },
      unmounted(el) {

      },
    });
  },
};
