$(function() {
	var data = localStorage.getItem('data');
    if (data) {
    	data = JSON.parse(data);
    	var cityMap = new Map();
        data.forEach(function(p) {
        	var cityId = p.cityId;
        	var viewArr = cityMap.get(cityId);
        	if (!viewArr) {
        		viewArr = new Array();
        	}
        	viewArr.push(p);
        	cityMap.put(cityId, viewArr);
        });
        
        var citys = '';
        var days = 0;
        var count = 0;
        cityMap.each(function(key, value, index) {
        	var cityName = value[0].city;
        	citys += cityName + '、';
        	
    		var surveyItem = '<div class="survey-item"><span class="survey-number">D' + (++count) + '</span> ';
    		surveyItem += '<div class="survey-info"><p class="survey-city">' + cityName + '</p>';
    		
    		var travelItem = '<div class="travel-item"><div class="travel-header">';
    		travelItem += '<span class="travel-number">D' + count + '</span> ';
    		travelItem += '<span>' + cityName + '</span><span class="city-syn">>></span></div>';
    		
    		var len = value.length;
        	for (var i = 0; i < len; i++) {
        		var p = value[i];
        		days += parseInt(p.day);

        		surveyItem += '<div class="survey-sight"><span>' + p.address + '</span> ';
        		surveyItem += '<span>' + p.day + '</span><span>日游</span></div>';
        		if (i !== len - 1) {
        			surveyItem += '<span>、</span>';
        		}
        		
        		travelItem += '<div class="sight-detail" value="' + p.id + '"></div>';
        		
        		(function(index) {
        			$.getJSON('/tour/view?viewId=' + p.id, function(json) {
            			var view = json.view;
            			var sightItem = '<div class="sight-item">';
            			sightItem += '<div class="sight-header"><span>' + index + '</span><span>.</span>';
            			sightItem += '<span>' + view.viewName + '</span></div>';
            			sightItem += '<div class="sight-info">';
            			sightItem += '<div class="sight-img"><a href="/tour/sight-detail/' + view.viewId + '"><img src="' + view.viewImageUrl + '"></a></div>';
            			sightItem += '<div class="sight-intro">';
            			sightItem += '<div class="tikect"><span>普通门票：</span>';
            			sightItem += '<span>' + view.ticketPrice + '</span><span>元</span></div>';
            			sightItem += '<div class="tickect-link"><span>购票链接：</span>';
            			sightItem += '<a href="' + view.ticketUrl + '" target="_blank">' + view.ticketUrl; 
            			sightItem += '</a></div>';
            			sightItem += '<div class="adress">';
            			sightItem += '<span>地址：</span><span>' + view.viewAddress + '</span></div>';
            			sightItem += '</div></div></div>';
            			
            			$('.sight-detail[value="' + view.viewId + '"]').append(sightItem);
            		});
        		})(i + 1);
        	}
        	
        	surveyItem += '</div></div>';
        	$('.survey-list').append(surveyItem);
        	
    		travelItem += '</div>';
        	$('.travel-detail').append(travelItem);
        });
        
        citys = citys.substring(0, citys.length - 1);
        $('.header-text > span').eq(0).html(citys);
        $('.header-text > span').eq(1).html(days);
        $('.header-text > span').eq(2).html('日游');
    }
});
