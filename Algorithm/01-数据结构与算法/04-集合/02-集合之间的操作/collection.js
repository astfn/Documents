export default function Set() {
  this.items = {};

  /* 基本操作 */
  Set.prototype.add = function (item) {
    if (this.has(item)) return false;
    this.items[item] = item;
    return item;
  };
  Set.prototype.has = function (item) {
    return this.items.hasOwnProperty(item);
  };
  Set.prototype.remove = function (item) {
    if (!this.has(item)) return false;
    return delete this.items[item];
  };
  Set.prototype.clear = function (item) {
    return (this.items = {});
  };
  Set.prototype.size = function (item) {
    return Object.keys(this.items).length;
  };
  Set.prototype.values = function (item) {
    return Object.values(this.items);
  };

  /* 集合之间的操作 */

  //并集
  Set.prototype.union = function (collection) {
    const result = new Set();
    for (let val of Object.values(this.items)) {
      result.add(val);
    }
    for (let val of Object.values(collection.items)) {
      result.add(val);
    }
    return result;
  };

  //交集
  Set.prototype.intersection = function (collection) {
    const result = new Set();
    const values = this.values();
    for (let i = 0; i < values.length; i++) {
      const item = values[i];
      collection.has(item) && result.add(item);
    }
    return result;
  };

  //差集
  Set.prototype.difference = function (collection) {
    const result = new Set();
    const values = this.values();
    for (let i = 0; i < values.length; i++) {
      const item = values[i];
      !collection.has(item) && result.add(item);
    }
    return result;
  };

  //子集

  //思路一：
  // Set.prototype.subset = function (collection) {
  //   let counter = 0;
  //   const values = collection.values();
  //   for (let i = 0; i < values.length; i++) {
  //     const item = values[i];
  //     this.has(item) && counter++;
  //   }
  //   return counter === this.values().length;
  // };

  //思路二：
  Set.prototype.subset = function (collection) {
    const values = this.values();
    for (let i = 0; i < values.length; i++) {
      const item = values[i];
      if (!collection.has(item)) return false;
    }
    return true;
  };
}
