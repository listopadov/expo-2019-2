const CookieHelper = (() => {
  "use strict";
  
  function setCookie(name, value, expires) {
    if (typeof expires === "number" && expires) {
      let date = new Date();
      
      date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
      expires = date;
    }
    
    if (expires && expires.toUTCString) {
      expires = expires.toUTCString();
    }
    
    document.cookie = `${name}= ${encodeURIComponent(value)}; expires= ${expires};`;
  }
  
  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  // cookie helper API
  return {
    setCookie,
    getCookie,
  }
})();

export default CookieHelper;