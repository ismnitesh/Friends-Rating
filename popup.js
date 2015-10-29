window.onload= function() {
	document.getElementById('Add').onclick = function() {
		var value = document.getElementById('user_id').value;
		//alert(value);
		if(!value)
		{
			alert('Error: No value');
			return;
		}
		chrome.storage.sync.set({'user_id':value},function(){
			alert("saved!");


		chrome.storage.local.get({userKeyIds: []}, function (result) {
		var userKeyIds = result.userKeyIds;
		userKeyIds.push({'keyPairId': value});
		chrome.storage.local.set({userKeyIds: userKeyIds}, function () {
			chrome.storage.local.get('userKeyIds', function (result) {
		//		console.log(result.userKeyIds);
				});
			});
		});


		});
	};
	document.getElementById('get').onclick = function() {
		chrome.storage.sync.get('user_id',function(data){
			alert(data.user_id);
		});
	};
}

function hello(api,callback){
	//console.log(api);
	$.get(api,function(data){
		//console.log(data.result[0]);
		callback(null,data.result[0].handle +" "+ data.result[0].rating+" ");
	}).fail(function(err){
		callback(true,err.statusText);
	});
}


document.getElementById('b1').onclick = function(){
	chrome.storage.local.get({userKeyIds: []}, function (result) {
		var arr = result.userKeyIds;
		var str=" ";
		var temp = 0;
		for(i=0;i<arr.length;i++){
			var api="http://codeforces.com/api/user.info?handles=";
			api=api+arr[i].keyPairId;
			//console.log("here "+i);
			hello(api,function(err,res){
				if(err){
					alert(res);
					return;
				}
				str +=res+"<br/>";
				temp++;
				if(i == temp){
					//console.log(str);
					document.getElementById("demo").innerHTML = str;
				}
			});
		}
		document.getElementById("demo").innerHTML = str;
		//console.log(str);
		
	});
	
}



document.getElementById('remove').onclick = function(){
	var arr = new Array();
	chrome.storage.local.set({userKeyIds: arr}, function() {
		alert('removed');
		});
}