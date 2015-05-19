// clusteringController.js

function startClustering()
{
	$.ajax({
	    type: 'GET',
	    data: '',
	    contentType: 'application/json',
	    url: '/clustering_start',
	    success: function (data) {
	        console.log(JSON.stringify(data));
	    }
	});
}

function stopClustering()
{
	$.ajax({
	    type: 'GET',
	    data: '',
	    contentType: 'application/json',
	    url: '/clustering_stop',
	    success: function (data) {
	        console.log(JSON.stringify(data));
	    }
	});
}

window.setInterval(function()
{
	$.ajax({
	    type: 'GET',
	    data: '',
	    contentType: 'application/json',
	    url: '/clustering_isRunning',
	    success: function (data) {
	        //console.log(JSON.stringify(data));
	        if(data.clustering == false)
	        {
	        	$('#option1').prop('checked', 'checked');
	        	$('#option1label').prop('class','btn btn-success active');
	        	$('#option2label').prop('class','btn btn-success');
	        	console.log('stop that shit');
	        }
	        else
	        {
	        	$('#option2').prop('checked', 'checked');
	        	$('#option1label').prop('class','btn btn-success');
	        	$('#option2label').prop('class','btn btn-success active');
	        	console.log('start that shit');
	        }
	    }
	});
}, 1000);

window.setInterval(function()
{
	$.ajax({
	    type: 'GET',
	    data: '',
	    contentType: 'application/json',
	    url: '/clustering_logs',
	    success: function (data) {
	        //console.log(JSON.stringify(data));
	        $('#logcontent').html(data);
	    }
	});
}, 5000);
