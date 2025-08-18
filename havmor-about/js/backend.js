jq(document).ready(function () {
    jq(".boardDirectorListWrap ul li").click(function () {
        var img = jq(this).find("img").attr("src");
        var title = jq(this).find("h4").text();
        var post = jq(this).find(".leaderShipContent").find("p").text();
        var body = jq(this).find(".leaderShipContentColWrap").data("attr");

        console.log("img = " + img);
        //jq(".leaderShipBoxDtlsWrap").fadeIn();
        jq(this).parents(".boardDirectorListWrap").find(".leaderShipBoxDtlsWrap").find("img").attr("src", img);
        jq(this).parents(".boardDirectorListWrap").find(".leaderShipBoxDtlsWrap").find("h4").text(title);
        jq(this).parents(".boardDirectorListWrap").find(".leaderShipBoxDtlsWrap").find(".leaderShipContent").find("p").text(post);
        jq(this).parents(".boardDirectorListWrap").find(".leaderShipBoxDtlsWrap").find(".leaderShipBoxDetailCol2").find("p").text(body);
        // jq(this).siblings.addClass("nonActive");

    });

    var newClass = window.location.href;
    var url = 'https://www.havmor.com/contact-us';
    if (url == window.location.href) {
        jq('body').addClass('contact-us');
        jq('body').addClass('contacts');
    }

    var newurl = 'https://www.havmor.com/thank-you';
    if (newurl == window.location.href) {
        jq('body').addClass('contact-us');
        jq('body').addClass('thanku');
    }

    var newurl = 'https://www.havmor.com/privacy-policy';
    if (newurl == window.location.href) {
        jq('body').addClass('faq-page');
    }

    var newurl = 'https://www.havmor.com/';
    if (newurl == window.location.href) {
        jq('body').addClass('homePagebody');
    }

    var newurl = 'https://www.havmor.com/csr';
    if (newurl == window.location.href) {
        jq('body').addClass('csr');
    }

});

jq(window).load(function () {
    jq(".js-form-wrapper").each(function () {
        jq(this).removeClass("form-wrapper");
    });
    jq(".webform-ajax-form-wrapper .description").hide();

    //checked flavours from url
    var link = window.location.href;
    num = 0;
    if (link.indexOf('Paper-packs') > -1) {
        num = 1;
    } else if (link.indexOf('Tub') > -1) {
        num = 2;
    } else if (link.indexOf('Ice-Cream-Cake') > -1) {
        num = 3;
    } else if (link.indexOf('Cups') > -1) {
        num = 4;
    } else if (link.indexOf('Candy') > -1) {
        num = 5;
    } else if (link.indexOf('Cone') > -1) {
        num = 6;
    } else if (link.indexOf('Novelty') > -1) {
        num = 7;
    } else if (link.indexOf('Havfunn-parlour') > -1) {
        num = 8;
    } else if (link.indexOf('lotte') > -1) {
        num = 9;
    }

    jq(".flavourDetail li").eq(num).find("input").prop("checked", true);

    jq(".pSlide img").removeAttr("width");
    jq(".pSlide img").removeAttr("height");
    jq(".ProductPageRightContent a").addClass("iceCreamBuy");
    jq(".ProductPageRightContent a").css("text-transform", "uppercase");

});
jq(document).on("click", ".managed-file-placeholder", function () {
    //jq("#edit-file-upload").trigger("click");
    jq("#edit-file-upload").click();
});

jq(document).on("click", ".iceCreamBuy", function (e) {
    e.preventDefault();
    if(jQuery(this).parent().find('#checkHide').hasClass('HiddenCity'))
    {
        jQuery(".buyNowPopUp .buyToApp ul li:nth-child(1)").hide();
        jQuery(".buyNowPopUp .buyToApp ul li:nth-child(2)").hide();
        jQuery(".buyNowPopUp .buyToApp ul li:nth-child(3)").show();
        jQuery(".buyNowPopUp .buyToApp ul li:nth-child(4)").show();
        jQuery(".buyNowPopUp .PopUpwrapp h2").hide();
        jQuery(".buyNowPopUp .PopUpwrapp #city").hide();
    }
    else{
        jQuery(".buyNowPopUp .PopUpwrapp h2").show();
        jQuery(".buyNowPopUp .PopUpwrapp #city").show();
        jQuery(".buyNowPopUp .buyToApp ul li:nth-child(1)").show();
        jQuery(".buyNowPopUp .buyToApp ul li:nth-child(2)").show();
        jQuery(".buyNowPopUp .buyToApp ul li:nth-child(3)").hide();
        jQuery(".buyNowPopUp .buyToApp ul li:nth-child(4)").hide();
    }
    //jq("#edit-file-upload").trigger("click");
    jq(".buyNowPopUp").css("display", "block");
    jq('body').addClass('buynowpopup');
});

jq(document).on("click", ".closePopup", function (e) {
    e.preventDefault();
    //jq("#edit-file-upload").trigger("click");
    jq(".buyNowPopUp").css("display", "none");
    jq('body').removeClass('buynowpopup');
});



/*jq(document).on("click",".searchBoxInputField .searchIcon",function(){
	var val = jq.trim(jq("#searchInput").val());
	if(val=='')
	{
		alert("Enter your favorite ice cream flavor !!");
		jq("#searchInput").focus();
		jq("#searchInput").val("");
	}
	else{
		window.location = "/products?key="+val;
	}
});*/


jq(document).on('keyup', '#searchInput', function () {
    if (jq(this).val() == '') {
        jq(".searchResultBox").hide();
    } else {
        console.log("/search/products/" + jq(this).val());
        jq(".searchResultBox").load("/search/products/" + encodeURIComponent(jq(this).val()));
        jq(".searchResultBox").show();
    }
});

jq(".searchResultBox, .views-exposed-form").hide();


jq("form").validate();

jq("input,textarea").blur(function () {
    var val = jq.trim(jq(this).val());
    if (val == '') {
        jq(this).val('');
    }

});

jq(document).on("click", ".flavourDetail li,.occasion li", function () {
    var val = jq.trim(jq(this).find("label").text());
    console.log(val);
    redirect = '';
    if (val == 'All') {
        redirect = '/all-products';
    } else if (val == 'Paper packs') {
        redirect = '/Paper-packs';
    } else if (val == 'Tub range') {
        redirect = '/Tub';
    } else if (val == 'Ice Cream Cake') {
        redirect = '/Ice-Cream-Cake';
    } else if (val == 'Cups') {
        redirect = '/Cups';
    } else if (val == 'Candy') {
        redirect = '/Candy';
    } else if (val == 'Cone') {
        redirect = '/Cone';
    } else if (val == 'Novelty') {
        redirect = '/Novelty';
    } else if (val == 'Havfunn parlour') {
        redirect = '/Havfunn-parlour';
    } else if (val == 'Savebig') {
        redirect = '/save-big';
    } else if (val == 'Lotte') {
        redirect = '/lotte';
    
    }

    if (redirect != '') {
        window.location = redirect;
    }

});


/* store locator search - start */

jq.expr[':'].icontains = function (a, i, m) {
    return jq(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
};

jq(".store-main input").keyup(function () {
    var keyword = jq.trim(jq(this).val());
    if (keyword == '') {
        jq(".connect-with-us-types .havmorelocation").show();
    } else {
        jq(".connect-with-us-types .havmorelocation").hide();
        jq(".connect-with-us-types .havmorelocation:icontains(" + keyword + ")").show();

    }
});


/* store locator search - end */


//set google map markers

jq(document).ready(function () {
    if (document.getElementById('map')) {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        //script_tag.setAttribute("src","https://maps.google.com/maps/api/js?key=AIzaSyBP8O8W3_QnMwoe_ISnlIcurrMYSt_cdvs&region=IN&callback=loadgooglemap");
        script_tag.setAttribute("src", "https://maps.google.com/maps/api/js?key=AIzaSyBJtxhd-oEpJ-3ePJ8bOTiFdObW3QDUANw&region=IN&callback=loadgooglemap");
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);

    }

    jq(document).on("click", ".locatoBtn .enterPin", function (e) {
        e.preventDefault();
        loadgooglemap();
    });
});


function loadgooglemap() {
    /*
		var locations = [
	      ['Bondi Beach', -33.890542, 151.274856, 4],
	      ['Coogee Beach', -33.923036, 151.259052, 5],
	      ['Cronulla Beach', -34.028249, 151.157507, 3],
	      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
	      ['Maroubra Beach', -33.950198, 151.259302, 1]
	    ];
	    */

    var locations = [];
    jq(".connect-with-us-types .havmorelocation a").each(function (index) {

        var display = jq(this).parents(".havmorelocation").is(":visible");

        //var latlong = jq(this).data("attr");
        /*var latlongVal = jq(this).data("attr");
	    	var latlong = latlongVal.toString();
	        var latArr = latlong.split(",");
	        */
        var lat = jq(this).data("lat");
        var long = jq(this).data("long");

        var body = jq(this).data("body");
        var mobile = jq(this).data("phone");
        var franchisee = jq(this).data("franchisee");
        if (typeof mobile === "undefined") {
            mobile = '';
        }

        item = {}
        item[0] = "<strong>" + franchisee + "</strong><br/>" + body + "<br/>" + mobile;
        item[1] = lat;
        item[2] = long;
        item[3] = index;
        item[4] = jq(this).data("type");

        if (display) {
            locations.push(item);
        }
    });
    //console.log(locations);

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: new google.maps.LatLng(20.7479195, 73.723312),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        var image = '';
        var type = locations[i][4];
        if (type == 'RESTAURANTS') {
            image = '/themes/havmornew/images/Restaurant_Location_Icon-1.png';
        } else if (type == 'ICECREAM PARLOR') {
            image = '/themes/havmornew/images/Icecream_Location_Icon-1.png';
        } else {
            image = '/themes/havmornew/images/Eatery_Location_Icon-1.png';
        }

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            icon: image
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}

jq(document).ready(function (jq) {
    jq("#city").change(function () {
        //alert('change');
        var city = jq('#city').find(":selected").text();
        console.log(city);
        jq(".buyToApp ul").html("");
        if (city == 'Ahmedabad') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/ahmedabad/restaurants/havmor-ice-cream?subzone=11302&category=1"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/search?q=Havmor+Restaurant"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Bangalore') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/bangalore/restaurants/havmor-ice-cream?subzone=5103"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/search?q=Havmor+Restaurant"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Chennai') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/bangalore/restaurants/havmor-ice-cream?subzone=5103"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/search?q=Havmor+Havfunn"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Delhi') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/ncr/restaurants/havmor-ice-cream"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/search?q=Havmor+Havfunn"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Hyderabad') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/hyderabad/delivery?chain=18665510"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/search?q=Havmor+Havfunn"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Mumbai') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/mumbai/restaurants/havmor-ice-cream-1"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/search?q=Havmor+Havfunn"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Pune') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/pune/restaurants/havmor-ice-cream"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/search?q=Havmor+Havfunn"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Chandigarh') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/chandigarh/restaurants/havmor?category=2"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Faridabad') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/ncr/restaurants/havmor-ice-cream?zone=501"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/search?q=Havmor"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Ghaziabad') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/ncr/dine-out-in-ghaziabad?chain=18359259"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Gurgaon') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/ncr/dine-out-in-gurgaon?chain=18359259"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/search?q=Havmor"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Indore') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/indore/delivery?chain=18359259"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Jaipur') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/jaipur/delivery?chain=18359259"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/search?q=Havmor"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Jodhpur') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/jodhpur/restaurants/havmor-ice-cream"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Kanpur') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/kanpur/restaurants/havmor-ice-cream"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/search?q=Havmor"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Lucknow') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants/havmor-opposite-jawahar-bhawan-sector-b-ansal-api-lucknow-75013"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Ludhiana') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/ludhiana/havmor-ice-cream-dugri"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants/havmor-dugri-urban-estate-dugri-ludhiana-186670"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Meerut') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/meerut/havmor-ice-cream-shastri-nagar/order"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants/havmor-ice-cream-shastri-nagar-meerut-436796"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Nagpur') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/nagpur/restaurants/havmor-ice-cream"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants/havmor-havfunn-ice-cream-pratap-nagar-nagpur-182947"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Nashik') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/nashik/havmor-ice-cream-parlour-jail-road-nasik"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants/havmor-prasad-circle-gangapur-road-nashik-68991"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Raipur') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/raipur/havmor-ice-cream-purena"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Rajkot') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/search"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Rangareddy') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/hyderabad/restaurants/havmor-hotch-potch-cold-stone-ice-cream-1?subzone=174235"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Solapur') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/hyderabad/restaurants/havmor-hotch-potch-cold-stone-ice-cream-1?category=1"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Surat') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/surat/restaurants/havmor-havfunn"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants/havmor-ice-cream-gotri-tandalja-surat-251036"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Vadodara') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/vadodara/restaurants/havmor-ice-cream-2"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/search?q=Havmor+Restaurant"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Vijayawada') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/vijayawada/havmor-ice-cream-christurajupuram"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Thane') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/mumbai/restaurants/havmor-ice-cream-1?zone=90321"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/search?q=Havmor"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Pimpri-Chinwad') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/pune/restaurants/havmor-ice-cream?subzone=3204"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Jalandar') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/jalandhar/havmor-ice-cream-shastri-nagar"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Thiruvananthapuram') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/tadepalligudem/sri-havmor-ice-cream-parlour-tadepalligudem-locality/order"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Noida') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/ncr/restaurants/havmor-ice-cream?zone=1"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Ajmer') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/ajmer/havmor-ice-cream-pal-bhichala"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/search?q=Havmor"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else if (city == 'Jamnagar') {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/jamnagar/havmor-ice-cream-kadiawad/order"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        } else {
            jq(".buyToApp ul").append('<li><a target="_blank" class="gtag_event_tracking_support" href="https://www.zomato.com/"><img src="/themes/havmornew/images/zomato.webp"></a></li><li><a target="_blank" href="https://www.swiggy.com/restaurants"><img src="/themes/havmornew/images/swiggy.webp"></a></li>');
        }
    });
});

jq(document).ready(function (jq) {
    //jq('.custom-file-input').css('display','none');
});


jq(document).on("click", "input[name = 'upload_file_remove_button']", function () {
    jq('.custom-file-input').css('display', 'none');
    jq('.custom-file-input').css('background', 'transparent');
});

jq('.custom-filenew').change(function (e) {
    setTimeout(function () {
        jq('.form-managed-file').insertAfter('.js-form-item-upload-file');
    }, 1000);
    jq('.custom-file-input').css('display', 'block');
});



window.zomato_gtag_report_conversion = function (url) {
    gtag('event', 'conversion', {
        'send_to': 'AW-11132960213/8w8OCOOz7JQYENX7zbwp',
        'event_callback': function () {}
    });
    console.log(url + ' tracked for zomato_gtag_report_conversion');
    return false;
}


window.swiggy_gtag_report_conversion = function (url) {
    gtag('event', 'conversion', {
        'send_to': 'AW-11132960213/A8caCPvw45QYENX7zbwp',
        'event_callback': function () {}
    });
    console.log(url + ' tracked for swiggy_gtag_report_conversion');
    return false;
}



window.buynow_gtag_report_conversion = function (url) {
    gtag('event', 'conversion', {
        'send_to': 'AW-11132960213/AaYICNvt6JUYENX7zbwp',
        'event_callback': function () {}
    });
    console.log(url + ' tracked for buynow_gtag_report_conversion');
    return false;
}


jq(document).ready(function (jq) {
    jq(document).on("click", '.buyToApp ul li a[href*="zomato.com"], .buyToApp ul li a[href*="swiggy.com"]', function () {
        let get_tracking_link = jq(this).attr('href');
        let get_tracking_element = jq('.gtag_event_tracking_support');

        if (get_tracking_link.indexOf('zomato.com') !== -1) {
            window.zomato_gtag_report_conversion(get_tracking_link);
            fbq('track', 'Zomato', {
                content_name: get_tracking_link,
                currency: "INR",
                value: "00.00"
            });
        } else if (get_tracking_link.indexOf('swiggy.com') !== -1) {
            window.swiggy_gtag_report_conversion(get_tracking_link);
            fbq('track', 'Swiggy', {
                content_name: get_tracking_link,
                currency: "INR",
                value: "00.00"
            });
        }
    });
    jq(document).on("click", '.buyNowBtn', function (e) {


        let get_tracking_link_bnow = jQuery(this).parent().find('a').attr('href')
        let get_tracking_link = jq(this).prev().text();

        window.buynow_gtag_report_conversion(get_tracking_link_bnow)

        fbq('track', 'BuyNow', {
            content_name: get_tracking_link,
            currency: "INR",
            value: "00.00"
        });



    });
}),


(function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-TX7G2HM');
