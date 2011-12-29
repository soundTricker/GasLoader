function fetch() {
  GasLoader.removeCache("https://raw.github.com/soundTricker/gasmarty-jarty_for_google_apps_script/master/src/jarty.js");
  
  // GasLoader.require( url , charset , cacheTime);
  // Set null value to charset,if don't need charset.
  // Set 0 value to cacheTime,if don't need cache.
  GasLoader.require("https://raw.github.com/soundTricker/gasmarty-jarty_for_google_apps_script/master/src/jarty.js",null , 0);
  Logger.log(GaSmarty.eval("hello , {$test}" , {test : "soundTricker"}));
}

function fromDocs() {
  GasLoader.removeCache({your scripts file id at google docs });
  
  GasLoader.requireFromDocs({your scripts file id at google docs }  , 0);
  Logger.log(GaSmarty.eval("hello , {$test}" , {test : "soundTricker"}));

}