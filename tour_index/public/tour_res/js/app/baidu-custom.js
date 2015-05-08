// 复杂的自定义覆盖物
function ComplexCustomOverlay(point, text, address, imageUrl) {
	this._point = point;
	this._text = text;
	this._address = address;
	this._imageUrl = imageUrl;
}
ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function(map) {
	this._map = map;
	var div = this._div = document.createElement("div");
	div.style.position = "absolute";
	div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
	div.style.backgroundColor = "#7fc1c5";
	div.style.border = "1px solid #7fc1c5";
	div.style.color = "white";
	div.style.height = "18px";
	div.style.padding = "2px";
	div.style.lineHeight = "18px";
	div.style.whiteSpace = "nowrap";
	div.style.MozUserSelect = "none";
	div.style.fontSize = "12px";
	div.style.cursor = "pointer";
	var span = this._span = document.createElement("span");
	div.appendChild(span);
	span.appendChild(document.createTextNode(this._text));
	span.style.padding = "0px 5px";
	span.style.fontFamily = "微软雅黑";
	var that = this;

	var arrow = this._arrow = document.createElement("div");
	arrow.style.background = "url(/public/tour_res/img/icon/label.png) no-repeat";
	arrow.style.backgroundPosition = "0px -10px";
	arrow.style.position = "absolute";
	arrow.style.width = "11px";
	arrow.style.height = "10px";
	arrow.style.top = "22px";
	arrow.style.left = "10px";
	arrow.style.overflow = "hidden";
	div.appendChild(arrow);
	
	div.onmouseover = function(){
    	this.style.backgroundColor = "#1badb6";
        this.style.borderColor = "#1badb6";
        arrow.style.backgroundPosition = "0px -20px";
    }

    div.onmouseout = function(){
        this.style.backgroundColor = "#7fc1c5";
        this.style.borderColor = "#7fc1c5";
        arrow.style.backgroundPosition = "0px -10px";
    }

    var content = '<div style="width:290px;height:81px;margin:2px 0;background:url(' + this._imageUrl + ') no-repeat center center;"></div>';
	content += '<p style="padding:2px 0;font-size:12px;color:rgb(77,77,77);">地址：' + this._address + '</p>';
	content += '<p style="padding:2px 0;font-size:12px;color:rgb(127,127,127);">标签：旅游景点</p>';
	
	//创建检索信息窗口对象
    var searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
		title: that._text, //标题
		width: 290, //宽度
		heigh: 105, //高度
		panel: "panel", //检索结果面板
		enableAutoPan: true, //自动平移
		searchTypes: [
			BMAPLIB_TAB_SEARCH, //周边检索
			BMAPLIB_TAB_TO_HERE, //到这里去
			BMAPLIB_TAB_FROM_HERE //从这里出发
		]
	});
    
    div.onclick = function(e) {
    	searchInfoWindow.open(that._point);
    	e.stopPropagation();
    };

	map.getPanes().labelPane.appendChild(div);

	return div;
}
ComplexCustomOverlay.prototype.draw = function() {
	var map = this._map;
	var pixel = map.pointToOverlayPixel(this._point);
	this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
	this._div.style.top = pixel.y - 30 + "px";
}

/**
 * 添加导航控件
 * @param map
 */
function addControl(map) {
	// 添加导航控件
	var navigationControl = new BMap.NavigationControl({
		// 靠左上角位置
		anchor: BMAP_ANCHOR_TOP_LEFT,
		// SMALL类型
		type: BMAP_NAVIGATION_CONTROL_SMALL
	});
	map.addControl(navigationControl);
}