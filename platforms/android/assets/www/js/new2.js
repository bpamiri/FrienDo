Parse.initialize("FVpie19EZBySUXoKGLZn8wHD3powe0b6LiHSJRNE", "ze72Ly718Zhw39qLU0RJy2qq04Jhyw0zsACCCWAw"); 
function send_broadcast()
{
	var promisesPhase1 = [];

	var mes = document.forms["broadcast-form"]["broadcast-form"].value;
	var des = document.forms["broadcast-form"]["text-area"].value;
	var usnm = localStorage.getItem('username');
	//alert(mes +","+ des);
	var Employee = Parse.Object.extend({
className: "Broadcast"
});

var EmployeeCollection = Parse.Collection.extend({
model: Employee
});

var employees = new EmployeeCollection(
		[
		{"Message": mes, "Description": des , "User" : usnm}
		]
		);

employees.each(function(employee) {
		promisesPhase1.push(employee.save());
		});

}

function all_broad()
{
	Parse.initialize("FVpie19EZBySUXoKGLZn8wHD3powe0b6LiHSJRNE", "ze72Ly718Zhw39qLU0RJy2qq04Jhyw0zsACCCWAw");
	var query = new Parse.Query("Broadcast");
	var user=localStorage.getItem('username');
	//query.equalTo("User",user);
	var dlist = [];
	var ulist = [];
	var mlist = [];
	query.find({success: function(results)
			{
			for(var i = 0; i < results.length; i++)
			{
			mlist = (results[i]['_serverData']['Message']);
			ulist = (results[i]['_serverData']['User']);
			dlist = (results[i]['_serverData']['Description']);
			newdiv.innerHTML += "<li><b>" + mlist + "</b></li>" + dlist + "<br /> - '" + ulist + "'";
			} 
			}
			});

	var newdiv = document.getElementById('blist');
	for(var i=0; i < mlist.length; i++) 
	{
		newdiv.innerHTML += "<li>" + mlist[i] + "</li>";
	}
}

function all_todo()
{
	Parse.initialize("FVpie19EZBySUXoKGLZn8wHD3powe0b6LiHSJRNE", "ze72Ly718Zhw39qLU0RJy2qq04Jhyw0zsACCCWAw");
	var query = new Parse.Query("Todo");
	var user=localStorage.getItem('username');
	query.equalTo("User",user);
	var dlist = [];
	var ulist = [];
	var mlist = [];
	var list = [];
	var newdiv = document.getElementById('blist-todo');
	query.find({success: function(results)
			{
			//console.log(results);
			for(var i = 0; i < results.length; i++)
			{
			ulist = (results[i]['_serverData']['User']);
			dlist = (results[i]['_serverData']['todo']);
			if(results[i]['_serverData']['numval'] == 0)
			{
			uid = (results[i]['id']);
			newdiv.innerHTML += "<input type='checkbox' id = 'li-todo' value = " + uid + " name = " + uid +"> '" + dlist + "'" + ulist + "</input><br />";
			}
			else
			{
			newdiv.innerHTML += "<strike> '" + dlist + "'" + ulist + "</strike><br />";
			}
			}
			}
			});
	//console.log(list);

	//var list = [];
	for(var i=0; i < ulist.length; i++) 
	{
		//  list.push(ulist[i]);
	}
	//console.log(list);
}

function todo_validate()
{
	$(':checkbox').each(function() {
			if(this.checked)
			{
			var uid = this.value;
			Parse.initialize("FVpie19EZBySUXoKGLZn8wHD3powe0b6LiHSJRNE", "ze72Ly718Zhw39qLU0RJy2qq04Jhyw0zsACCCWAw");
			var query = new Parse.Query("Todo");
			query.equalTo("objectId", uid);
			console.log(query);
			query.first({success: function(results) 
				{
				results.set("numval", 1);
				results.save();
				}
				});
			}
			});
//	window.location.assign('view_todo.html');
}

$( document ).ready(function() {
		$("#broadcast-form").submit(function(e){
			e.preventDefault();
			send_broadcast();
			});
		});

$( document ).ready(function() {
		$("#todo-list").submit(function(e){
			e.preventDefault();
			todo_validate();
			});
		});
