class List {
  //列表的构造函数
  constructor() {
    //列表元素的个数
    this.listSize = 0;
    //列表当前的位置
    this.pos = 0;
    //返回列表中的所有元素
    this.dataStore = [];
  }
  //向列表中追加元素
  append(element) {
    this.dataStore[this.listSize++] = element;
  }
  //查找列表中是否存在某个元素，如果存在返回位置
  find(element) {
    for (let i = 0; i < this.dataStore.length; ++i) {
      if (this.dataStore[i] == element) {
        return i;
      }
    }
    return -1;
  }
  //移除列表中的指定元素
  remove(element) {
    let foundAt = this.find(element);
    if (foundAt > -1) {
      this.dataStore.splice(foundAt, 1);
      --this.listSize;
      return true;
    }
    return false;
  }
  //返回列表中有多少个元素
  length() {
    return this.listSize;
  }
  //显示列表中的元素
  toString() {
    return this.dataStore;
  }
  //向列表中插入一个元素
  insert() {
    var insertPos = this.find(after);
    if (insertPos > -1) {
      this.dataStore.splice(insertPos + 1, 0, element);
      ++this.listSize;
      return true;
    }
    return false;
  }
  //清空列表中的所有元素
  clear() {
    delete this.dataStore;
    this.dataStore.length = 0;
    this.listSize = this.pos = 0;
  }
  //判断给定值是否在列表中
  contains(element) {
    for (var i = 0; i < this.dataStore.length; ++i) {
      if (this.dataStore[i] == element) {
        return true;
      }
    }
    return false;
  }

  //遍历列表的方法
  front() {
    this.pos = 0;
  }

  end() {
    this.pos = this.listSize - 1;
  }

  prev() {
    --this.pos;
  }

  next() {
    if (this.pos < this.listSize) {
      ++this.pos;
    }
  }

  currPos() {
    return this.pos;
  }

  moveTo(position) {
    this.pos = position;
  }

  getElement() {
    return this.dataStore[this.pos];
  }

  hasNext() {
    return this.pos < this.listSize;
  }

  hasPrev() {
    return this.pos >= 0;
  }
  //迭代器
  forEach(fn) {
    this.dataStore.forEach(fn);
  }
}
const bulletlist = new List();


export default bulletlist;