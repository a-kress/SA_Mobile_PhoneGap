$("div[data-role*='page']").live('pageshow', function(event, ui) { 
    // if this browser doesn't support local storage then we need to stop here.
    if(!test_storage()) return false;
    // other wise continue.
    $("#batch_list").listview();
    
    list = localStorage.getItem('batch');
        
    if(list){
        list_obj = $.parseJSON(list);
        $.each(list_obj, function(i, v){
            $("#batch_list").append('<li id="'+ v.idx +'" class="batch_list_item"><a href="#">Batch: '+v.timestamp+"</a></li>").listview("refresh");
            console.log(i);console.log(v);
        });
    }
    
    $("#clear_batch").click(function(){
        localStorage.clear();  
        location.reload();  
    });
    
    var dump = [];
                                 
    $("#new_batch").delegate('click',function(){
                             alert("do something");
    });
                                 
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
        console.log(localStorage);
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