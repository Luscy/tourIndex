$(function() {
	var data = localStorage.getItem('data');
    if (data) {
    	data = JSON.parse(data); 
    	if (data.length < 1) {
    		return;
    	}
    	
    	var ids = '';
    	var cityMap = new Map();
    	data.forEach(function(p) {
    		ids += p.id + '-';
    		cityMap.put(p.id, p.city);
    	});
    	ids = ids.substring(0, ids.length - 1);
    	
    	$.getJSON('/tour/strategy-map/queryViews?ids=' + ids, function(json) {
    		// 百度地图API功能
			var map = new BMap.Map("allmap");
			addControl(map); // 添加定位相关控件

    		var viewMap = new Map();
			
			var mapPoints = [];
    		var views = json.list;
    		var pointXs = new Array();
    		var pointYs = new Array();
    		for (var i in views) {
    			var view = views[i];
    			var pointStr = view.mapPoint;
    			var pointXY = pointStr.split(',');
    			var pointX = parseFloat(pointXY[0]); 
    			var pointY = parseFloat(pointXY[1]);
    			pointXs.push(pointX);
    			pointYs.push(pointY);
    			
				var myPoint = new BMap.Point(pointX, pointY); 
				map.addOverlay(new ComplexCustomOverlay(myPoint, view.viewName, 
						view.viewAddress, view.viewImageUrl));
				mapPoints.push(myPoint);
				
				var cityId = view.cityId;
            	var viewArr = viewMap.get(cityId);
            	if (!viewArr) {
            		viewArr = new Array();
            	}
            	viewArr.push(view);
            	viewMap.put(cityId, viewArr);
    		}
    		
    		buildSideList(viewMap, cityMap, map);
    		
    		var px = sort(pointXs), py = sort(pointYs)
        	var point = getCenterPoint(px, py);
        	
        	var polyline = new BMap.Polyline(mapPoints, 
					{strokeColor: "#fd517b", strokeWeight: 3, strokeOpacity: 0.9}); //创建折线
			map.addOverlay(polyline); //增加折线
        	
			var center = new BMap.Point(point.x, point.y);
			
			var distance = map.getDistance(new BMap.Point(px.min, py.min), 
					new BMap.Point(px.max, py.max)).toFixed(0);
			var level = chooseLevel(distance);
			
        	map.centerAndZoom(center, level); 
			map.enableScrollWheelZoom();
    	});
    }
});
		
/**
 * 找出数组中的最大、最小值
 */
function sort(arr) {
	var min = arr[0], max = arr[0];
	for (var i = 1; i < arr.length; i++) {
		var value = arr[i];
		if (min > value) {
			min = value;
		}
		if (max < value) {
			max = value;
		}
	}
	return { min: min, max: max };
}

/**
 * 算出两组数的中心点
 * @param xs:[min, max]
 * @param ys:[min, max]
 */
function getCenterPoint(xs, ys) {
	var x = xs.max - xs.min;
	var y = ys.max - ys.min;
	return {x: xs.min + x / 2, y: ys.min + y / 2};
}

/**
 * 选择地图级别
 * @param distance
 */
function chooseLevel(distance) {
	// 比例尺(单位:m)
	var plottingScales = [50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 25000, 50000, 100000, 200000, 500000, 1000000, 2000000];
	for (var i in plottingScales) {
		var scale = plottingScales[i];
		if (distance < scale * 7) {
			return 18 - i;
		}
	}
}

/**
 * 根据景点获取地图坐标
 * @param view
 */
function getPoint(view) {
	var pointStr = view.mapPoint;
	var pointXY = pointStr.split(',');
	var pointX = parseFloat(pointXY[0]); 
	var pointY = parseFloat(pointXY[1]);
	var myPoint = new BMap.Point(pointX, pointY); 
	return myPoint;
}

function direction(viewId1, viewId2, city, liId) {
	$.getJSON('/tour/baidu-api/direction?viewId1=' + viewId1 
			+ '&viewId2=' + viewId2 + '&city=' + city, function(json) {
		var distance = (json.distance / 1000).toFixed(1);
		var duration = (json.duration / 60).toFixed(0);
		var hour = Math.floor(duration / 60);
		var minute = duration % 60;
		var time = '';
		if (hour > 0) {
			time += '<span>' + hour + '</span><span>小时</span>';
		}
		time += '<span>' + minute + '</span><span>分钟</span>';
		var sightSopt = '<span>相距</span><span>' + distance + '</span><span>公里</span>， ';
		sightSopt += '<span>公交</span>' + time;
		$('.location-info[value="' + liId + '"]').append(sightSopt);
	});
}

/**
 * 建立行程地图左边栏
 * @param viewMap
 * @param cityMap
 * @param map
 */
function buildSideList(viewMap, cityMap, map) {
	viewMap.each(function(key, value, index) {
    	var cityName = cityMap.get(value[0].viewId);
    	
    	var sightCity = '<div class="sight-city">' + cityName + '</div>';
    	$('.side-list').append(sightCity);

    	var sightSopts = '<div class="sight-spots">';
    	var len = value.length;
    	for (var i = 0; i < len; i++) {
    		var view = value[i];
    		
    		if (i > 0) {
    			var preView = value[i - 1];
    			var pointA = getPoint(preView);
    			var pointB = getPoint(view);
    			var dis = (map.getDistance(pointA, pointB) / 1000).toFixed(1);
    			
    			var liId = preView.viewId + '-' + view.viewId;
    			sightSopts += '<div class="location-info" value="' + liId + '">';
    			//sightSopts += '<span>相距</span><span>' + dis + '</span><span>公里</span>';
    			//sightSopts += '， <span>公交</span><span>30</span><span>分钟</span>';
    			direction(value[i - 1].viewId, view.viewId, cityName, liId);
    			sightSopts += '</div>';
    		}
     		
    		sightSopts += '<div class="sight-list-spot">';
    		sightSopts += '<span class="sight-number">' + (i + 1) + '</span>.<span>' + view.viewName + '</span>';
            sightSopts += '</div>';
    	}
    	sightSopts += '</div>';
    	$('.side-list').append(sightSopts);
    });
}