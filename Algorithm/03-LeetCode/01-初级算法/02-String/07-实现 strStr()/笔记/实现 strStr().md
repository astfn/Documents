## 题目

[原题](https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/xnr003/)

* 实现 strStr() 函数。
* 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回  -1 。

说明：

* 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
* 对于本题而言，当 needle 是空字符串时我们应当返回 0 。



示例 1：

```
输入：haystack = "hello", needle = "ll"
输出：2
```

示例 2：

```
输入：haystack = "aaaaa", needle = "bba"
输出：-1
```

示例 3：

```
输入：haystack = "", needle = ""
输出：0
```


提示：

* 0 <= haystack.length, needle.length <= 5 * 10<sup>4</sup>
* haystack 和 needle 仅由小写英文字符组成

## 代码实现

### 初步实现（错误版）

主要思路（双指针）

1. 指针 i 遍历主字符串，指针 p 指向子字符串
2. 如果 i、p 所指字符相等，并且 p 指向子字符串的开头，则记录结果 matchIndex = i
   * 如果 p 指向了子字符串的末尾，代表匹配完毕，直接返回 matchIndex 
3. 如果  i、p 所指字符不相等，则把 p 指针初始化，重新匹配

```
var strStr = function(haystack, needle) {
    if(haystack.length < needle.length) return -1
    let p = 0
    let matchIndex = -1
    for(let i = 0;i< haystack.length;i++){
        if(haystack[i] == needle[p]){
            if(p == 0){
                matchIndex = i
            }
            p++
            if(p == needle.length) return matchIndex 
        }else{
            p = 0
            matchIndex = -1
        }
    }
    return p == needle.length ? matchIndex : -1
};
```

#### 错误点分析

这种思路只能处理最简单的场景，例如

```
haystack = "sadbutsad"
needle = "sad"
```

<img src="实现 strStr().assets/001.png" alt="001" style="zoom:80%;" />![002](实现 strStr().assets/002.png)

<img src="实现 strStr().assets/002.png" alt="002" style="zoom:80%;" />

<img src="实现 strStr().assets/003.png" alt="003" style="zoom:80%;" />

<img src="实现 strStr().assets/004.png" alt="004" style="zoom:80%;" />

<img src="实现 strStr().assets/005.png" alt="005" style="zoom:80%;" />

但不能处理需要 `回头重新匹配` 的复杂情景，例如

```
haystack = "mississippi"
needle = "issip"
```

当匹配到下图所示的位置时，由于没有匹配成功，需要重新初始化 p 指针，并且 i 指针继续后移，可以看出来按照这个态势执行下去，最后将没有合适的匹配项。

<img src="实现 strStr().assets/006.png" alt="006" style="zoom:80%;" />

但实际上是存在正确的匹配结果的 index = 4，但如果按照上述代码的匹配逻辑，将会错过该结果的收集。原因就是因为没有处理这种 `需要回头重新匹配` 的情况。

<img src="实现 strStr().assets/007.png" alt="007" style="zoom:80%;" />

### 正确实现

添加 `回头匹配操作`：当匹配失败时，把 i 指针置为本次匹配流程的起使位置的下一个位置，而不是无脑的继续向后移动。

这里之所以是 i = i - p ，而不是 i = i - p + 1 的原因为：这里使用 for 循环来模拟指针的移动，本次循环体内容执行完成后，i 会自动 +1。如果你使用的是 while 循环来实现指针的移动，则需要准确赋值。

```
var strStr = function(haystack, needle) {
    if(haystack.length < needle.length) return -1
    let p = 0;
    for(let i = 0;i< haystack.length;i++){
        if(haystack[i] == needle[p]){
            if(p == 0){
                matchIndex = i
            }
            p++
            if(p == needle.length) return matchIndex 
        }else{
            i = i - p
            p = 0
            matchIndex = -1
        }
    }
    return -1
};
```

### 方案二

换一种思路：

* 把主字符串依次分割为多个长度等于子字符串的字符串
* 再与子字符串进行比较

```
var strStr = function(haystack, needle) {
    if(haystack.length < needle.length) return -1
    for (let start = 0; start <= haystack.length - needle.length; start++) {
        let p = 0
        for(let i = start;i< start + needle.length;i++) {
            if(haystack[i] == needle[p]){
                p++
                if(p == needle.length) return start
            }else{
                break
            }
        }
    }
    return -1
};
```

* 若结合原生API，会让代码更加简洁
* 直接截取对应长度的 string 进行比较，减少了第二个 `for` 循环

```
export default function strStr(haystack, needle) {
  if(haystack.length < needle.length) return -1
  for (let start = 0; start <= haystack.length - needle.length; start++) {
    let subStr = haystack.substr(start, needle.length);
    if (subStr === needle) return start;
  }
  return -1;
}
```

### 方案三 KMP