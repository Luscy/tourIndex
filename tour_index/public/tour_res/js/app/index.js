$(function() {
	$.getJSON('/public/json/city.json', function(json) {
		for(var i in json) {
			var city = json[i];
			if (i == 0) {
				$('.district-name').append('<li class="city native" value="' + city.id + '">' + city.value + '</li> ');
			} else {
				$('.district-name').append('<li class="city" value="' + city.id + '">' + city.value + '</li> ');
			}
		}
	    $('.city').click(function() {
	        $('.city').removeClass('native');
	        $(this).addClass('native');
	        
	        $.getJSON('/tour/cityViews?cityId=' + $(this).attr('value'), function(json) {
	        	$('.distirct-select .district-centre').remove();
	        	
				var views = json.list;
				appendCityViews(views);
			});
	    });
	});
	
	$.getJSON('/tour/hotViews', function(json) {
		var views = json.list;
		appendHotViews(views);
	});
	
	$.getJSON('/tour/cityViews?cityId=1', function(json) {
		var views = json.list;
		appendCityViews(views);
	});
	
	//banner轮播图片
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 6000,//可选选项，自动滑动
        loop: true,//可选选项，开启循环
        pagination: '.pagination',
        paginationClickable: true
    });
    // mySwiper.addCallback('SlideChangeStart', function(swiper) {
    // });
    
    var appendHotViews = function(views) {
    	for(var i in views) {
    		var view = views[i];
    		var html = '<div class="advice-bar-container"><div class="advice-content">';
    		html += '<a href="/tour/sight-detail/' + view.viewId + '"><img src="' + view.viewImageUrl + '"></a>';
    		html += '<section class="advice-run-msg">';
    		html += '<header class="advice-run-head">' + view.viewName + '</header>';
    		html += '<p class="advice-run-time"><span>门票:</span><date>' + view.ticketPrice + '</date></p>';
    		html += '<p class="advice-run-address"><span>地点:</span><span>' + view.viewAddress + '</span></p>';
    		html += '</section></div></div>';
    		$('.side-bar-container').append(html);
    	} 
    };

    var appendCityViews = function(views) {
    	for(var i in views) {
    		var view = views[i];
    		var html = '<div class="district-centre"><div class="district-img">';
    		html += '<a href="/tour/sight-detail/' + view.viewId + '"><img src="' + view.viewImageUrl + '"></a></div>';
    		html += '<div class="disrict-article"><div class="district-intro-head">' + view.viewName + '</div>';
    		html += '<p class="district-intro">' + view.viewIntro + '</p></div>';
    		html += '<a href="/tour/sight-detail/' + view.viewId + '" class="district-more-btn">查看</a></div>';
    		$('.distirct-select').append(html); 
    	} 
    };
});