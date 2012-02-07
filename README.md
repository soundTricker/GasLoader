# GasLoader
## What's GasLoader?
- GasLoader is Script Loader for Google Apps Script.
- GasLoader can load script on url or Google Docs

## Example
### load script file on Server
  
    GasLoader.require("https://raw.github.com/soundTricker/gasmarty-jarty_for_google_apps_script/master/src/jarty.js",null , 0);
  
  - args1 url
  - args2 charset 
  - args3 cacheSecond cache time(sec).Set 0 value,if don't need cache. GasLoader set default value,if Set none value.

### load script file on Google Docs

    GasLoader.requireFromDocs({key}  , 0);
    
    
  - args1 key Google Docs's key
  - args2 cacheSecond cache time(sec).Set 0 value,if don't need cache. GasLoader set default value,if Set none value.

### Delete cache.

    GasLoader.removeCache({key});
    
  - args1 key Google Docs's key or url
  
## Caution
- Take care and Security,GasLoader load External Script.Please read the script of their own as possible.
You can't known , if loaded script update to The malicious script.
- If there are dependencies that must be authenticated to the API, such as side Spreadsheet files read from the outside,
 and the caller is not calling the same API, I get no authentication dialog.