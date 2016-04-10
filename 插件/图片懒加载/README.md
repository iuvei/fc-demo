# jQuery延迟加载(懒加载)插件 – jquery.lazyload.js

Lazy Load 是一个用 JavaScript 编写的 jQuery 插件. 它可以延迟加载长页面中的图片. 在浏览器可视区域外的图片不会被载入, 直到用户将页面滚动到它们所在的位置. 这与图片预加载的处理方式正好是相反的.
在包含很多大图片长页面中延迟加载图片可以加快页面加载速度. 浏览器将会在加载可见图片之后即进入就绪状态. 在某些情况下还可以帮助降低服务器负担.

##如何使用

Lazy Load 依赖于 jQuery. 请将下列代码加入HTML的结尾，也就是`</body>`前:

	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="jquery.lazyload.js"></script>

你必须改变图片的标签。图像的地址必须放在`data-original`属性上。给懒加载图像一个特定的class（例如:lazy）。这样你可以很容易地进行图像插件捆绑。代码如下：
	
	<img class="lazy" alt="" width="640" height="480" data-original="img/example.jpg" />

	$(function() {
	    $("img.lazy").lazyload();
	});

这将使所有 class 为 `lazy` 的图片将被延迟加载.

TIPS:这里必须设置图片的`width`和`height`,否则插件可能无法正常工作。

##设置临界点
默认情况下图片会出现在屏幕时加载. 如果你想提前加载图片, 可以设置`threshold` 选项, 设置 `threshold` 为 200 令图片在距离屏幕 200 像素时提前加载.

	$("img.lazy").lazyload({
	    threshold : 200
	});

##设置事件来触发加载

你可以使用jQuery事件，例如`click`和`mouseover`。也可以使用自定义事件，如`sporty`、`foobar`默认情况下是要等到用户向下滚动并且图像出现在视口中时。只有当用户点击它们才加载图片：

	$("img.lazy").lazyload({
	    event : "click"
	});

##使用特效

默认情况下，插件等待图像完全加载并调用`show()`。你可以使用任何你想要的效果。下面的代码使用`fadeIn` （淡入效果）。

	$("img.lazy").lazyload({
	    effect : "fadeIn"
	});

##针对不启用JavaScript的情况

几乎所有浏览器的 JavaScript 都是激活的. 然而可能你仍希望能在不支持 JavaScript 的客户端展示真实图片. 当浏览器不支持 JavaScript 时优雅降级, 你可以将真实的图片片段在写 `<noscript>` 标签内.

	<img class="lazy" data-original="img/example.jpg"  width="640" heigh="480">
	<noscript><img src="img/example.jpg" width="640" heigh="480"></noscript>

可以通过 CSS 隐藏占位符.

	.lazy {
	    display: none;
	}

在支持 JavaScript 的浏览器中, 你必须在 DOM ready 时将占位符显示出来, 这可以在插件初始化的同时完成.

	$("img.lazy").show().lazyload();

##图片在容器里面

你可以将插件用在可滚动容器的图片上, 例如带滚动条的 DIV 元素. 你要做的只是将容器定义为 jQuery 对象并作为参数传到初始化方法里面.

##当图像不连续时

滚动页面的时候, Lazy Load 会循环为加载的图片. 在循环中检测图片是否在可视区域内. 默认情况下在找到第一张不在可见区域的图片时停止循环. 图片被认为是流式分布的, 图片在页面中的次序和 HTML 代码中次序相同. 但是在一些布局中, 这样的假设是不成立的. 不过你可以通过 `failurelimit` 选项来控制加载行为.

	$("img.lazy").lazyload({
	    failure_limit : 10
	});

将 `failurelimit` 设为 10 ，令插件找到 10 个不在可见区域的图片时才停止搜索. 如果你有一个猥琐的布局, 请把这个参数设高一点.

##加载隐藏的图片

可能在你的页面上埋藏可很多隐藏的图片. 比如插件用在对列表的筛选, 你可以不断地修改列表中各条目的显示状态. 为了提升性能, Lazy Load 默认忽略了隐藏图片. 如果你想要加载隐藏图片, 请将 `skip_invisible` 设为 `false`

	$("img.lazy").lazyload({ 
	    skip_invisible : false
	});

