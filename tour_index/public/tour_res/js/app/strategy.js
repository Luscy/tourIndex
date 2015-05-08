$(function() {
	$.getJSON('/public/json/city.json', function(json) {
		for(var i in json) {
			var city = json[i];
			if (i == 0) {
				$('.cities').append('<span class="city native" value="' + city.id + '">' + city.value + '</span> ');
			} else {
				$('.cities').append('<span class="city" value="' + city.id + '">' + city.value + '</span> ');
			}
		}
		$('.city').click(function() {
			$('.city').removeClass('native');
            $(this).addClass('native');
            queryViews();
        });
	});
	
	$.getJSON('/public/json/viewCate.json', function(json) {
		for(var i in json) {
			var viewCate = json[i];
			$('.types').append('<span class="type" value="' + viewCate.id + '">' + viewCate.value + '</span> ');
		}
		$('.type').click(function() {
			$('.type').removeClass('native');
            $(this).addClass('native');
            queryViews();
        });
	});
	
	$.getJSON('/tour/strategy/queryViews?cityId=1', function(json) {
		var views = json.list;
		appendViews(views);
	});
	
    //保存行程列表信息
    var getTraveList = function() {
        var travelSpots = $('.travel-info').find('.address');
        var travelCitys = $('.travel-info').find('.city');
        var travelDays = $('.travel-info').find('.days');
        var continents = new Array();
        for(var k = 0; k < travelSpots.length; k++) {
        	var ids = $('.travel-info').eq(k).attr('value');
            var adresses = travelSpots.eq(k).text();
            var citys = travelCitys.eq(k).text();
            var cityIds = travelCitys.eq(k).attr('value');
            var days = travelDays.eq(k).text();
            continents[k] = { id: ids, address: adresses, cityId: cityIds, city: citys, day: days };
        }
        localStorage.setItem('data', JSON.stringify(continents));
    };
    
    //加载行程列表信息
    var setTraveList = function() {
        var data = localStorage.getItem('data');
        if (data) {
        	data = JSON.parse(data);   
            data.forEach(function(p) {
                $('.travel-list').append('<div class="travel-info" value=' + p.id + '>'
                		+ '<div class="travel-address">'
                		+ '<div class="city" value="' + p.cityId + '">' + p.city + '</div>'
                		+ '<div class="address">' + p.address + '</div></div>'
                		+ '<div class="days-menu"><div class="day plus">+</div>'
                		+ '<div class="days-container"><span class="days">' + p.day + '</span>天</div>'
                		+ '<div class="day minus">-</div></div>'
                		+ '<span class="cancel">x</span></div>');
            });
        }
    };
    
    //添加到行情
    var appendTravelInfo = function(sightId, sightName) {
    	var cityId = $('.city.native').attr('value');
        var cityName = $('.city.native').text();
        $('.travel-list').append('<div class="travel-info" value=' + sightId + '>'
        		+ '<div class="travel-address">'
				+ '<div class="city" value="' + cityId + '">' + cityName + '</div>'
				+ '<div class="address">' + sightName + '</div></div>'
				+ '<div class="days-menu"><div class="day plus">+</div>'
				+ '<div class="days-container"><span class="days">2</span>天</div>'
				+ '<div class="day minus">-</div></div>'
				+ '<span class="cancel">x</span></div>');
    };
    
    var clickImageBtn = function(sightSpot, isPlus) {
        var sightId = sightSpot.parent().attr('value');
        var sightName = sightSpot.children('div.location').text();

        if(isPlus) {
            var plusNode = sightSpot.children('div.plus');
            sightSpot.addClass('selected');
            plusNode.replaceWith('<div class="minus">移除</div>');
            appendTravelInfo(sightId, sightName);
            
            sightSpot.children('div.minus').on('click', function() {
        		clickImageBtn($(this).parent(), false);
            });
        } else {
            var minusNode = sightSpot.children('div.minus');
            sightSpot.removeClass('selected');
            minusNode.replaceWith('<div class="plus">添加</div>');
            $('.travel-info[value="' + sightId + '"]').remove();
            
            sightSpot.children('div.plus').on('click', function() {
        		clickImageBtn($(this).parent(), true);
            });
        }
        
        getTraveList();
    };
    
    //景点列表添加和移除景点
    var bindViewEvent = function() {
    	$('.location-container').find('div.plus').on('click', function() {
    		clickImageBtn($(this).parent(), true);
        });
    	$('.location-container').find('div.minus').on('click', function() {
    		clickImageBtn($(this).parent(), false);
        });
    };
    
    //行程列表移除景点信息
    $(document.body).on('click', '.cancel', function() {
        var viewId = $(this).parent().attr('value');
        $(this).parent().remove();
        
        var sightSpot = $('.location-container[value="' + viewId + '"]').children();
        sightSpot.removeClass('selected');
    	sightSpot.children('div.minus').replaceWith('<div class="plus">添加</div>');
    	sightSpot.children('div.plus').on('click', function() {
    		clickImageBtn($(this).parent(), true);
        });
    	
        getTraveList();
    });

    //日期增加减少
    $(document.body).on('click', '.day.plus', function() {
        var days = $('.days-menu').find('.days');
        var i = $(this).parent().parent().index();
        var listDay = parseInt(days.eq(i).text());
        if (listDay > 0) {
            listDay++;
            listDay = listDay.toString();
            days.eq(i).html(listDay);
            getTraveList();
        }
    });
    $(document.body).on('click', '.day.minus', function() {
        var days = $('.days-menu').find('.days');
        var i = $(this).parent().parent().index();
        var listDay = parseInt(days.eq(i).text());
        if (listDay > 1) {
            listDay--;
            listDay = listDay.toString();
            days.eq(i).html(listDay);
            getTraveList();
        }
    });
    
    //页面刷新加载行程列表函数
    function addOnload(newFunction) {
        var oldOnload = window.onload;
        if (typeof oldOnload == "function") {
            window.onload = function() {
                if (oldOnload) {
                	oldOnload();
                }
                newFunction();
            }  
        } else {
        	window.onload = newFunction;
        }  
    };
    addOnload(setTraveList());

	$('.search-icon').click(function() {
		queryViews();
	});
	
	var appendViews = function(views) {
		for(var i in views) {
			var view = views[i];
			var html = '<div class="location-container" value="' + view.viewId + '">';
			html += '<div class="img-container">';
			html += '<a href="/tour/sight-detail/' + view.viewId + '"><img class="location-img" src="' + view.viewImageUrl + '"></a>';
			html += '<div class="location">'+ view.viewName +'</div><span class="add-plan"></span>';
			html += '<div class="plus">添加</div></div></div>';
			$('.location-list').append(html); 
		} 
		
		$('.img-container').each(function() {
			var listSpot = $('.travel-info');
	        for(var i = 0; i < listSpot.length; i++) {
	            var spotId = listSpot.eq(i).attr('value');
	            if($(this).parent().attr('value') == spotId) {
	                $(this).addClass('selected');
	                $(this).children('div.plus').replaceWith('<div class="minus">移除</div>');
	            }
	        }
	    });
		
		bindViewEvent();
	};

	var queryViews = function() {
		var cityId = $('.city.native').attr('value');
		var viewCateId = $('.type.native').attr('value');
		var viewName = $('.search-input').val();
		$.getJSON('/tour/strategy/queryViews?cityId=' + cityId 
				+ '&viewCateId=' + viewCateId
				+ '&viewName=' + viewName, function(json) {
	    	$('.location-list .location-container').remove();
	    	
			var views = json.list;
			appendViews(views);
		});
	}
	
	$('.create').click(function() {
		window.location.href = '/tour/strategy-detail';
	});
});

//locatStorage方法
    // localData = {
    //         hname:location.hostname?location.hostname:'localStatus',
    //         isLocalStorage:window.localStorage?true:false,
    //         dataDom:null,

    //         initDom:function(){ //初始化userData
    //             if(!this.dataDom){
    //                 try{
    //                     this.dataDom = document.createElement('input');//这里使用hidden的input元素
    //                     this.dataDom.type = 'hidden';
    //                     this.dataDom.style.display = "none";
    //                     this.dataDom.addBehavior('#default#userData');//这是userData的语法
    //                     document.body.appendChild(this.dataDom);
    //                     var exDate = new Date();
    //                     exDate = exDate.getDate()+30;
    //                     this.dataDom.expires = exDate.toUTCString();//设定过期时间
    //                 }catch(ex){
    //                     return false;
    //                 }
    //             }
    //             return true;
    //         },
    //         set:function(key,value){
    //             if(this.isLocalStorage){
    //                 window.localStorage.setItem(key,value);
    //             }else{
    //                 if(this.initDom()){
    //                     this.dataDom.load(this.hname);
    //                     this.dataDom.setAttribute(key,value);
    //                     this.dataDom.save(this.hname)
    //                 }
    //             }
    //         },
    //         get:function(key){
    //             if(this.isLocalStorage){
    //                 return window.localStorage.getItem(key);
    //             }else{
    //                 if(this.initDom()){
    //                     this.dataDom.load(this.hname);
    //                     return this.dataDom.getAttribute(key);
    //                 }
    //             }
    //         },
    //         remove:function(key){
    //             if(this.isLocalStorage){
    //                 localStorage.removeItem(key);
    //             }else{
    //                 if(this.initDom()){
    //                     this.dataDom.load(this.hname);
    //                     this.dataDom.removeAttribute(key);
    //                     this.dataDom.save(this.hname)
    //                 }
    //             }
    //         }
    //     };


