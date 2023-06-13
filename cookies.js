function setCookie(name, value, days) {
    if (days)
  {
    var date = new Date();
    date.setTime(date.getTime()+days*24*60*60*1000); // ) removed
    var expires = "; expires=" + date.toGMTString(); // + added
  }
  else
    var expires = "";
  document.cookie = name+"=" + value+expires + ";path=/"; // + and " added
}


function getCookie(cName) {
	return new Promise((resolve, regect) => {
		const name = cName + "=";
		const cDecoded = decodeURIComponent(document.cookie); //to be careful
		const cArr = cDecoded .split('; ');
		let res;
		cArr.forEach(val => {
			if (val.indexOf(name) === 0)
				res = val.substring(name.length);
		});
		resolve(res);
	});
}
function eraseCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getCookieMap() {
	// Cookies are generally separated by a "; "
	// https://stackoverflow.com/a/4843598/2968465
	const cookieList = document.cookie.split('; ');
  
	// A key-value pair in the cookie list is separated by a "="
	// We pass a function to cookieList.map that will return
	// an array of tuples, like [key, value]
	const cookieToObjEntry = cookie => cookie.split('=')
	const cookieEntries = cookieList.map(cookieToObjEntry)
  
	// Such an array can be passed to Object.fromEntries to
	// obtain an object with all cookie key-value pairs as
	// the keys and values of an object
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
	return Object.fromEntries(cookieEntries)
  
	// So, for a cookies stored as "c1=v1; c2=v2", you'll get
	// an object like `{c1: v1, c2: v2}`
  }
