$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(function() {
    $('#myForm').submit(function (event) {
        event.preventDefault();
        var data = $('#myForm').serializeObject();
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://home-anyproject.rhcloud.com//search',
            success: function (data) {
                console.log('success');
                document.getElementById('results').innerHTML = data;
                console.log(JSON.stringify(data));
            }
        });
    }
)});
