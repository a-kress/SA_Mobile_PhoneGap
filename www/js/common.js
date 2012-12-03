$("div[data-role*='page']").live('pageshow', function(event, ui) { 
    $.mobile.allowCrossDomainPages = true;    
    $(".search_btn").bind('tap',function(){     
        $("#device_result").html("<h1>Please hold..</h1><h2>"+$("#serial_search").val()+"</h2>");
        $.post("http://akress.com/test.php",{ actn: "serial_search", lukeup: $("#serial_search").val() }, 
            function(data){
                var html_str = "<label>Serial#: <span>"+data.serial+"</span></label>";
                html_str += "<label>Asset: <span>"+data.serial+"</span></label>";
                html_str += "<label>Device type: <span>"+data.devtype+"</span></label>";
                $("#device_result").html(html_str);    
        },'json');
    });
});


