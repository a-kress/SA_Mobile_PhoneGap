$("div[data-role*='page']").live('pageshow', function(event, ui) { 
    $.mobile.allowCrossDomainPages = true;    
    $(".search_btn").bind('tap',function(){     
        $("#device_result").html("<h1>Please hold..</h1><h2>"+$("#serial_search").val()+"</h2>");
        $.post("http://akress.com/test.php",{ actn: "serial_search", lukeup: $("#serial_search").val() }, 
            function(data){
                var html_str = "<label>Search: <span>"+$("#serial_search").val()+"</span></label>";
                html_str += "<label>Serial#: <span>"+data.serial+"</span></label>";
				html_str += "<label>Asset: <span>"+data.serial+"</span></label>";
                html_str += "<label>Device type: <span>"+data.devtype+"</span></label>";
                html_str += "<label>Time stamp: <span>"+data.now+"</span></label>";
				$("#device_result").html(html_str);    
        },'json');
    });
	
	 // the code below should only work on the batch page.                          
    $("#batch_list").listview();
    var list = localStorage.getItem('batch');
    if(!!list){
        var list_obj = $.parseJSON(list);
        if(!!list_obj){
            $.each(list_obj, function(i, v){
                $("#batch_list").append('<li id="'+ v.idx +'" class="batch_list_item"><a href="#">Batch: '+v.timestamp+"</a></li>").listview("refresh");
                //console.log(i);console.log(v);
            });
        }
    }
    
    $("#clear_batch").click(function(){
        localStorage.clear();
        location.reload();
    });
    
    var dump = [];
    
    $("#new_batch").click(function(){
        var ts = (new Date()).getTime();
        
        $("#batch_list").append('<li id="batch_'+ts+'" class="batch_list_item"><a href="#">Batch: '+ts+"</a></lid>").listview("refresh");
        var list_to_storage;
        
        $(".batch_list_item").each(function(i, v){
        
            list_to_storage = {
                idx: this.id,
                timestamp: this.id.replace(/batch_/,'')
            };
            
            dump[i] = list_to_storage;
        });
        
        var strJSON = JSON.stringify(dump, null, 2);
        
        localStorage.setItem('batch', strJSON);
        //console.log(localStorage);
    }); 
	
	$("#send_batch").click(function(){
		$.post("http://akress.com/test.php", {actn:'send_batch', batch_data:localStorage.getItem('batch')}, function(data){
			if(data) alert(data.success);
			localStorage.clear();
			$("#batch_list").html("");
		},'json');
	});
	
                                 
});


function test_storage() {
     try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        alert("no local storage");
        return false;
    }
}

