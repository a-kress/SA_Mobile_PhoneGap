$("div[data-role*='page']").live('pageshow', function(event, ui) { 
    $.mobile.allowCrossDomainPages = true;    
    $(".search_btn").bind('tap',function(){     
        $("#device_result").html("<h1>Please hold..</h1><h2>"+$("#serial_search").val()+"</h2>");
        $.post("http://akress.com/test.php",{ actn: "serial_search", lukeup: $("#serial_search").val() }, 
            function(data){
                $("#device_result").html("<h1>"+data.serial+"</h1><h2>"+data.asset+"</h2>");    
        },'json');
    });
    
    
});