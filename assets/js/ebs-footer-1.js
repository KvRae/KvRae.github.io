$(document).ready(function(){
    $('.datepicker').datepicker({
        inline: true,
        todayHighlight: true
        
    }).datepicker('update', new Date());
});