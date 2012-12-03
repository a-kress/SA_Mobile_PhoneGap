$("div[data-role*='page']").live('pageshow', function(event, ui) { 
    // if this browser doesn't support local storage then we need to stop here.
    if(!test_storage()) return false;
    // other wise continue.
    $("#batch_list").listview();
    if(localStorage.getItem('batch')){
        $("#batch_list").append('<li>'+localStorage.getItem('batch')+"</a></li>").listview("refresh");
    }     
    $("#new_batch").bind('tap',function(){
        var ts = (new Date()).getTime();
        localStorage.setItem('batch', 'batch_'+ts);
        $("#batch_list").append('<li>'+localStorage.getItem('batch')+"</a></lid>").listview("refresh");
    });
});


function test_storage() {
     try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}