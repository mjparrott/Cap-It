window.fbAsyncInit = function() {
	FB.init({
		appId      : '1401062393477841',
		channelUrl: '//http://cap-it.herokuapp.com/channel.html', // Channel File
		status     : true, // check login status
		cookie     : true, // enable cookies to allow the server to access the session
		xfbml      : true  // parse XFBML
	});

	FB.Event.subscribe('auth.authResponseChange', function(response) {
		if (response.status === 'connected') {
			testAPI();
		} else if (response.status === 'not_authorized') {
			FB.login();
		} else {
			FB.login();
		}
	});
};
 
 function testAPI() {
    window.alert("Welcome!  Fetching your information.... ");
    FB.api('/me', function(response) {
      widow.alert("WHAT UP!" + response.name + "!");
    });
}
 


(function(d){
var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
if (d.getElementById(id)) {return;}
js = d.createElement('script'); 
js.id = id; 
js.async = true;
js.src = "//connect.facebook.net/en_US/all.js";
ref.parentNode.insertBefore(js, ref);
}(document));