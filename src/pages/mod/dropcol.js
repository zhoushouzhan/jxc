import { ref, reactive } from "vue";
import axios from "@/axios";
const dataList = reactive([]);
const editCol = ref(0);
const modcolumn = reactive([]);
axios.post("/cols",{limit:300}).then((res) => {
  Object.keys(res.data.data).map((key) => {
    dataList.push(res.data.data[key]);
  });
});
//拖拽
const colalias = reactive([]);
const dragColumn = reactive({
  el: null,
  posindex: 0, //新增字段序号
  getparent: (el, cname) => {
    if (el.className.indexOf(cname) >= 0) {
      return el;
    }
    while (el && (el = el.parentNode)) {
      if (el.className && el.className.indexOf(cname) >= 0) {
        return el;
      }
    }
    return;
  },
  elindex: (el) => {
    var index = 0;
    if (!el || !el.parentNode) {
      return -1;
    }
    while (el && (el = el.previousElementSibling)) {
      index++;
    }
    return index;
  },
  animate: (prevRect, target) => {
    var ms = 300;
    if (ms) {
      var currentRect = target.getBoundingClientRect();
      dragColumn.css(target, "transition", "none");
      dragColumn.css(
        target,
        "transform",
        "translate3d(" +
          (prevRect.left - currentRect.left) +
          "px," +
          (prevRect.top - currentRect.top) +
          "px,0)"
      );
      target.offsetWidth;
      dragColumn.css(target, "transition", "all " + ms + "ms");
      dragColumn.css(target, "transform", "translate3d(0,0,0)");

      clearTimeout(target.animated);
      target.animated = setTimeout(function () {
        dragColumn.css(target, "transition", "");
        dragColumn.css(target, "transform", "");
        target.animated = false;
      }, ms);
    }
  },
  css: (el, prop, val) => {
    var style = el && el.style;
    if (style) {
      if (val === void 0) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
          val = document.defaultView.getComputedStyle(el, "");
        } else if (el.currentStyle) {
          val = el.currentStyle;
        }

        return prop === void 0 ? val : val[prop];
      } else {
        if (!(prop in style)) {
          prop = "-webkit-" + prop;
        }
        style[prop] = val + (typeof val === "string" ? "" : "px");
      }
    }
  },
  resort: () => {
    var cols = document.querySelector("#col").children;
    var arr = [];
    for (let i = 0; i < cols.length; i++) {
      var index = cols[i].getAttribute("index");
      arr[index] = cols[i];
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        arr[i].innerText = arr[i].getAttribute("col");
        document.getElementById("col").appendChild(arr[i]);
      }
    }
  },
});
const dragstart = (e) => {
  if (e.target.parentNode.className.indexOf("list") >= 0) {
    dragColumn.el = e.target.cloneNode(true);
    dragColumn.el.setAttribute("isAdd", "1");
  } else {
    dragColumn.el = e.target;
    console.log("moveCol");
  }
};
const dragover = (e) => {
  if (dragColumn.el === null) return;

  let target = e.target;
  if (target.className.indexOf("column") >= 0 && target.children.length == 0) {
    target.appendChild(dragColumn.el);
    return;
  }

  if (
    target.getAttribute("col") &&
    target != dragColumn.el &&
    dragColumn.getparent(target, "column")
  ) {
    let targetRect = target.getBoundingClientRect();
    let dragingRect = dragColumn.el.getBoundingClientRect();
    if (target && target.animated) {
      return;
    }
    //记录新增字段序号
    dragColumn.posindex = dragColumn.elindex(target);
    if (dragColumn.elindex(dragColumn.el) < dragColumn.posindex) {
      target.parentNode.insertBefore(dragColumn.el, target.nextSibling);
    } else {
      target.parentNode.insertBefore(dragColumn.el, target);
    }
    dragColumn.animate(dragingRect, dragColumn.el);
    dragColumn.animate(targetRect, target);
  }
};
//移入字段
const drop = (e) => {
  if (dragColumn.el === null) return;
  let el = dragColumn.getparent(e.target, "column");
  let groupIndex = el.getAttribute("index");
  groupIndex = parseInt(groupIndex);

  //不存在时增加存在修改
  if (dragColumn.el.getAttribute("isAdd")) {
    dataList.map((vo) => {
      if (vo.id == dragColumn.el.id) {
        let addItem = JSON.parse(JSON.stringify(vo));
        addItem.groupindex = groupIndex;
        addItem.id = new Date().getTime();
        addItem.sort = dragColumn.posindex; //写入新增序号
        modcolumn.push(addItem);
      }
    });
  }
  //重新排序;
  for (let i in el.children) {
    if (el.children[i].nodeType === 1) {
      if (el.children[i].getAttribute("isAdd")) {
        el.children[i].remove();
      }
      let sort = groupIndex + parseInt(i);
      modcolumn.map((vo) => {
        if (el.children[i]&&el.children[i].getAttribute("id") == vo.id) {
          vo.sort = sort;
          vo.groupindex = groupIndex;
        }
      });
    }
  }
};
//移出字段
const coldrop = (e) => {
  let el = dragColumn.getparent(e.target, "list");
  let id = dragColumn.el.getAttribute("id");
  modcolumn.forEach((vo, index) => {
    if (vo.id == id) {
      modcolumn.splice(index, 1);
    }
  });
};
const coldropend = (e) => {};
const dragenter = (e) => {};
const modcolclick = (e) => {
  var childnodes = e.target.children;
  if (childnodes) {
    for (var k = 0; k < childnodes.length; k++) {
      childnodes[k].ondblclick = (el) => {
        editCol.value = el.target.getAttribute("id")
          ? el.target.getAttribute("id")
          : el.target.parentNode.getAttribute("id");
      };
    }
  }
};

export {
  dataList,
  dragColumn,
  colalias,
  dragstart,
  dragover,
  drop,
  coldrop,
  coldropend,
  dragenter,
  modcolclick,
  editCol,
  modcolumn,
};
