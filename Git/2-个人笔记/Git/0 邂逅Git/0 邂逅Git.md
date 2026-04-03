# 邂逅Git

---

[廖雪峰网站（学习Git）](https://www.liaoxuefeng.com/wiki/896043488029600 )

## Git

​	Git是目前世界上最先进的<font color="#2980b9">分布式版本控制系统</font>



### 版本控制系统

---

​	所谓版本控制系统，就是能够记录项目各个版本的迭代信息，使用版本控制系统管理项目，能够记录个人或团队对项目每次的更改，并且能够记录更改者、更改说明、日期等信息。



### 分布式

---

​	<img src="https://www.liaoxuefeng.com/files/attachments/918921562236160/l" alt="distributed-repo" style="zoom:67%;" />

​	

#### 安全

* 每个人的电脑上都是一个完整的版本库，不需要依赖网络，因为版本库就在你自己的电脑上。
* 某一个人的电脑坏了不要紧，随便从其他管理者那里copy一个就可以了。

#### 高效

* 那多个人如何协作呢？比方说你在自己电脑上改了文件A，你的同事也在他的电脑上改了文件A，这时，你们俩之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。



>​	在实际使用分布式版本控制系统的时候，其实很少在两人之间的电脑上推送版本库的修改，因为可能你们俩不在一个局域网内，两台电脑互相访问不了，也可能今天你的同事病了，他的电脑压根没有开机。因此，分布式版本控制系统通常也有一台充当“中央服务器”的电脑，但这个服务器的作用<font color="#2980b9">仅仅是用来方便“交换”</font>大家的修改，<font color="#2980b9">没有它大家也一样干活</font>，只是交换修改不方便而已。



#### 集中式

​	与分布式相反的是集中式版本控制系统（以CVS、SVN为例），所谓集中式，就是所有的版本控制系统都存放在一个<font color="#2980b9">中央服务器</font>中,如果中央服务器瘫痪，那么所有的版本信息也就不复存在，这是很<font color="#f39c12">不安全</font>的。并且集中式的版本控制系统需要依赖网络，<font color="#2980b9">每个人电脑上没有完整的版本库，只是把修改的部分提交到中央服务器</font>。

<img src="https://www.liaoxuefeng.com/files/attachments/918921540355872/l" alt="central-repo" style="zoom:50%;" />







### 管理的文件类型

---

* 所有的版本控制系统，其实<font color="#f39c12">只能跟踪文本文件的改动</font>，比如<font color="#f39c12">txt</font>文件，<font color="#f39c12">html</font>，所有的<font color="#f39c12">程序代码</font>等等，Git也不例外。
* 版本控制系统可以告诉你每次的改动，比如在第5行加了一个单词“Linux”，在第8行删了一个单词“Windows”。
* 而图片、视频这些<font color="#f39c12">二进制文件</font>，只能够追踪改变后的大小，<font color="#f39c12">不能够追踪具体操作</font>。
* Microsoft的Word格式是二进制格式，因此，版本控制系统是没法跟踪Word文件的改动
* 如果要真正使用版本控制系统，就要以纯文本方式编写文件。
* 因为文本是有编码的，比如中文有常用的GBK编码，日文有Shift_JIS编码，如果没有历史遗留问题，强烈建议使用标准的UTF-8编码，所有语言使用同一种编码，既没有冲突，又被所有平台所支持。

* <font color="red">使用Windows的童鞋要特别注意</font>：

  千万<font color="#f39c12">不要使用</font>Windows自带的**<font color="#f39c12">记事本</font>**编辑任何文本文件。原因是Microsoft开发记事本的团队使用了一个非常弱智的行为来保存UTF-8编码的文件，他们自作聪明地在每个文件开头添加了0xefbbbf（十六进制）的字符，你会遇到很多不可思议的问题，比如，网页第一行可能会显示一个“?”，明明正确的程序一编译就报语法错误，等等，都是由记事本的弱智行为带来的。建议你下载[Notepad++](http://notepad-plus-plus.org/)代替记事本，不但功能强大，而且免费！记得把Notepad++的默认编码设置为UTF-8 without BOM即可：



## Git安装

​	Git可以在Linux、Unix、Mac和Windows这几大平台上正常运行，只要[下载](https://git-scm.com/downloads)对应的Git即可

#### 注意点

* 安装在非中文，无空格的目录下

  <img src="0 邂逅Git.assets/image-20201225155940068.png" alt="image-20201225155940068" style="zoom:50%;" />

* <img src="0 邂逅Git.assets/image-20201225160351022.png" alt="image-20201225160351022" style="zoom:50%;" />

* <img src="0 邂逅Git.assets/image-20201225160456821.png" alt="image-20201225160456821" style="zoom:50%;" />

* <img src="0 邂逅Git.assets/image-20201225160718837.png" alt="image-20201225160718837" style="zoom:50%;" />

* <img src="0 邂逅Git.assets/image-20201225161520932.png" alt="image-20201225161520932" style="zoom:50%;" />

* 配置环境变量

  不修改环境变量，但只能在Git Bash中使用。

  <img src="0 邂逅Git.assets/image-20201225162125325.png" alt="image-20201225162125325" style="zoom:67%;" />

* 本地、远程库的连接方式

  选择更通融的连接方式（第一选项）

  <img src="0 邂逅Git.assets/image-20201225162421158.png" alt="image-20201225162421158" style="zoom:50%;" />

* <img src="0 邂逅Git.assets/image-20201225162555593.png" alt="image-20201225162555593" style="zoom:50%;" />

* <img src="0 邂逅Git.assets/image-20201225162909345.png" alt="image-20201225162909345" style="zoom:50%;" />

  

* <img src="0 邂逅Git.assets/image-20201225163305010.png" alt="image-20201225163305010" style="zoom:50%;" />

* <img src="0 邂逅Git.assets/image-20201225163810884.png" alt="image-20201225163810884" style="zoom:50%;" />

* <img src="0 邂逅Git.assets/image-20201225164206798.png" alt="image-20201225164206798" style="zoom:50%;" />

* <img src="0 邂逅Git.assets/image-20201225164347367.png" alt="image-20201225164347367" style="zoom:50%;" />



