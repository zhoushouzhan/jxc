/*
 * @Author: 一品网络技术有限公司
 * @Date: 2022-10-02 18:11:04
 * @LastEditTime: 2022-10-04 10:32:07
 * @FilePath: \ypcmsvue3\src\pages\permissions\roles\authtree.js
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
 */

let t = {
  //后台数据
  dataList: {},
  //统计ID关联项目
  checkedIds: [],
  //分解数据
  oneList: {},
  //选中ID
  id: 0,
  //处理选中
  update: (id) => {
    t.id = id;
    t.eachTree(t.dataList);
    if (t.checkedIds.indexOf(id) >= 0) {
      t.del(id);
    } else {
      t.add(id);
    }
    return t.checkedIds;
  },
  add: (id) => {
    //加入当前值
    t.checkedIds.push(id);
    //获取父项
    let pids = t.getParent(id);

    //检查是否有子项
    if (t.oneList[id].children && t.oneList[id].children.length) {
      let sonids = t.getSon(t.oneList[id].children);
      sonids.forEach((v) => {
        t.checkedIds.push(v);
      });
    }

    //父项选中
    if (pids.length) {
      pids.forEach((v) => {
        if (t.checkedIds.indexOf(v) < 0) {
          t.checkedIds.push(v);
        }
      });
    }
  },
  del: (id) => {
    //删除当前值
    t.checkedIds.splice(t.checkedIds.indexOf(id), 1);
    //获取同级项目
    let pid = t.oneList[id].pid;
    let havepeer = false;
    if (pid) {
      let peerids = t.getSon(t.oneList[pid].children);
      t.checkedIds.forEach((v) => {
        if (peerids.indexOf(v) >= 0) {
          havepeer = true;
        }
      });
    }
    //同级元素存在保持父级选中
    if (!havepeer) {
      //获取父项
      let pids = t.getParent(id);

      //父项移除
      if (pids.length) {
        pids.forEach((v) => {
          if (t.checkedIds.indexOf(v) >= 0) {
            t.checkedIds.splice(t.checkedIds.indexOf(v), 1);
          }
        });
      }
    }
    //检查是否有子项
    if (t.oneList[id].children && t.oneList[id].children.length) {
      let sonids = t.getSon(t.oneList[id].children);
      sonids.forEach((v) => {
        if (t.checkedIds.indexOf(v) >= 0) {
          t.checkedIds.splice(t.checkedIds.indexOf(v), 1);
        }
      });
    }
  },
  //遍历数组
  eachTree: (obj) => {
    obj.forEach((item) => {
      if (item.id) {
        t.oneList[item.id] = item;
      }
      if (item.children && item.children.length) {
        t.eachTree(item.children);
      }
    });
  },
  getSon: (obj) => {
    let sonids = [];
    obj.forEach((item) => {
      sonids.push(item.id);
      if (item.children && item.children.length) {
        t.getSon(item.children);
      }
    });
    return sonids;
  },
  //检查父项
  getParent: (id) => {
    let pid = t.oneList[id].pid;
    let pids = [];
    if (pid) {
      pids.push(pid);
      t.getParent(pid);
    }
    return pids;
  },
};
export default t;
