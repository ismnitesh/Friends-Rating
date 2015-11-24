window.onload = function() {
	document.getElementById('Add').onclick = function() {
		var value = document.getElementById('user_id').value;
		if(!value)
		{
			alert('Error: No value');
			return;
		}
		chrome.storage.sync.set({'user_id':value},function() {
			document.getElementById('user_id').value="";
			chrome.storage.local.get({userKeyIds: []}, function (result) {
				var userKeyIds = result.userKeyIds;
				var flag=0;
				for(i=0;i<userKeyIds.length;i++){
					if(userKeyIds[i].keyPairId==value){
						flag=1;
						alert(value+" is already friend!");
					}
				}
				if(flag==0){
					userKeyIds.push({'keyPairId': value});
				}
				chrome.storage.local.set({userKeyIds: userKeyIds}, function () {
					chrome.storage.local.get('userKeyIds', function (result) {
					});
				});
			});
		});
	};
	// document.getElementById('get').onclick = function() {
	// 	chrome.storage.sync.get('user_id',function(data){
	// 		alert(data.user_id);
	// 	});
	// };
}

document.getElementById('b1').onclick = function() {
	chrome.storage.local.get({userKeyIds:[]},function(result) {
		var arr = result.userKeyIds;
		var str = "Friends Rating:<br/>";
		var temp=0;
		var api = "http://codeforces.com/api/user.info?handles=";
		for(i=0;i<arr.length;i++){
			api=api+";"+arr[i].keyPairId;
		}
		if(arr.length==0)
			document.getElementById("demo").innerHTML = "No Data Entered :(";
		else{
			$.get(api,function(data){
				for(i=0;i<arr.length;i++){
					str=str+data.result[i].handle+" "+data.result[i].rating+"<br/>";
					console.log(data.result[i].handle);
				}
				document.getElementById("demo").innerHTML = str;
			});
		}
	});
}

document.getElementById('remove').onclick = function(){
	var arr = new Array();
	chrome.storage.local.set({userKeyIds: arr}, function() {
		alert('removed');
	});
}

document.getElementById("contest").onclick = function() {
	var con_api = "http://codeforces.com/api/contest.list";
	var str_contest= "Future Contest: <br/>";
	$.get(con_api,function(data){
		for(i=0;i<10;i++){
			if(data.result[i].phase!="BEFORE")
				break;
			else{
				str_contest=str_contest+" "+data.result[i].name+"<br/>";
			}
		}
		document.getElementById("contest_list").innerHTML = str_contest;
	});
}