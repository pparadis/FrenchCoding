$(document).ready(function () {

    $('#TwitterListSubmit').bind('click', function () {
        $('#frmTwitterList').submit();
    });
    
    $('a[id*="CopyList"]').click(function () {
        $('#frmCopyList'+$(this).data('listid')).submit();
    });
});

