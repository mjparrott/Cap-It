$(document).ready(function()
{
  // Load the SDK asynchronously
  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "http://connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '1401062393477841',
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
  // for any authentication related change, such as login, logout or session refresh. This means that
  // whenever someone who was previously logged out tries to log in again, the correct case below 
  // will be handled. 
  FB.Event.subscribe('auth.authResponseChange', function(response) {
    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {
      // The response object is returned with a status field that lets the app know the current
      // login status of the person. In this case, we're handling the situation where they 
      // have logged in to the app.
	  window.alert("sometext");
	  $("p").html("<p><b>User Logged in</b></p>");
      testAPI();
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but not into the app, so we call
      // FB.login() to prompt them to do so. 
      // In real-life usage, you wouldn't want to immediately prompt someone to login 
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by most browsers unless they 
      // result from direct interaction from people using the app (such as a mouse click)
      // (2) it is a bad experience to be continually prompted to login upon page load.
      FB.login(function() {}, {scope: 'email, publish_actions'});
      $("p").html("<p><b>User Prompted Login</b></p>");
      
    } else {
      // In this case, the person is not logged into Facebook, so we call the login() 
      // function to prompt them to do so. Note that at this stage there is no indication
      // of whether they are logged into the app. If they aren't then they'll see the Login
      // dialog right after they log in to Facebook. 
      // The same caveats as above apply to the FB.login() call here.
      FB.login(function() {}, {scope: 'email, publish_actions'});
      
    }
  });
  
  // Here we run a very simple test of the Graph API after login is successful. 
  // This testAPI() function is only called in those cases. 
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Good to see you, ' + response.name + '.');
    });
  }

	}




$("#postButton").click(function(){

	var body = 'Trying Facebook JS SDK documentation';
FB.api('/me/feed', 'post', { message: body }, function(response) {
  if (!response || response.error) {
    alert('Error occured' + response.error.message);
  } else {
    alert('Post ID: ' + response.id);
  }
});
});


function currentUserName()
{
	var name = "Unknown";

	FB.api('/me', {fields: 'name'}, function(response){
		if(!response || response.error)
		{
			alert('cannot find user name');
		}else{
			name = response.name;
			console.log("UserNameResp: " + response.name);
		}
	});

	return name;
}	

function currentUserId()
{
	var userId = "0";

	FB.api('/me', {fields: 'id'}, function(response){
		if(!response || response.error)
		{
			alert('cannot find user id');
		}else{
			userId = response.id;
			console.log("UserIdResp: " + response.id);
		}
	});

	return userId;
}

function currentUserPicture()
{
	var picture;

	FB.api('/me/picture', function(response){
		if(!response || response.error)
		{
			alert('cannot find user picture');
		}else{
			picture = response.data.url;
			console.log("UserIdResp: " + response.data.url);
		}
	});

	return picture;
}

function addUserInfo()
{
	var userName = currentUserName();
	var userId = currentUserId();
	var userPicture = currentUserPicture();

	if(name && name != "Unknown")
	{
		$.post("services.php",
		{
			user : "add",
			fb_id : userId,
			fb_name : userName,
			fb_pp : userPicture
		},function(response)
		{
			$("p").text(response);
			console.log("AddUser Response: " + response);
		});
	}
}


$("#storeName").click(function(){
	addUserInfo();
});


function retrieveUsers(playerNumber)
{
	var playerObj;

	$.post("services.php",
		{
			user : "all",
		},function(info){
			var obj = jQuery.parseJSON( info );
			playerObj = obj[playerNumber-1];
		}

	return playerObj;
}


///////////////////////////////////
//After starting the Game//
///////////////////////////////////






});














