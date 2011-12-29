/**
 * GasLoader
 */
/*
 * The MIT License
 * 
 * Copyright (c) 2011 soundTricker <twitter [at]soundTricker318>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
*/
(function() {
  var LogLevel = {
    DEBUG : {code : 0 , name : "debug"},
    INFO :  {code : 1 , name : "info"},
    ERROR :  {code : 2 , name : "error"},
    NONE :  {code : 9999 , name : "none"}
  };
 var GasLoaderLogger  = this.GasLoaderLogger= function() {
  };
  GasLoaderLogger.prototype = {
    debug : function(message){
        this.log(LogLevel.DEBUG , message);
    },
    info : function(message) {
        this.log(LogLevel.INFO , message);
    },
    error : function(message) {
        this.log(LogLevel.ERROR , message);
    },
    log : function(logLevel , message) {
      if(GasLoader.logLevel.code <= logLevel.code) {
        Logger.log("[GasLoader]["+ logLevel.name +"]" + message);
      }
    }
    
  };
  var GasLoader = this.GasLoader = {
    version : 0.1,
    logLevel : LogLevel.DEBUG,
    loggers : new GasLoaderLogger(),
    defaultCacheSecond : 7 * 24 * 60 * 60,
    cacheKeyPrefix : "GasLoaderCache-",
    cacheListKey : "GasLoaderCacheList" , 
    cache : CacheService.getPublicCache(),
    
    requireFromDocs : function(key, cacheSecond) {
      var scripts = this.getScriptCache_(key);
      if(!scripts) {
        this.loggers.debug("cache is nothing. get from docs " + key);
        scripts = this.getScriptFromDocs_(key);
        this.cache_(key , scripts , cacheSecond);
      }
      
      this.compile(scripts);
    },
    
    require : function(url ,charset, cacheSecond) {
      var scripts = this.getScriptCache_(url);
      if(!scripts) {
        this.loggers.debug("cache is nothing. fetch " + url);
        scripts = this.fetch_(url,charset);
        this.cache_(url , scripts , cacheSecond);
      }
      
      this.compile(scripts);
    },
    
    compile :function(scripts) {
      try {
        var compiledScript = new Script().compile(scripts);
        
        compiledScript();
        
      } catch(e) {
        this.removeCache(url);
        this.loggers.error("throw error at compile script.delete cache. Detail :[" + e + "]");
        throw e;
      }
    },
    
    getScriptFromDocs_ : function(key) {
      var file = DocsList.getFileById(key);
      return file.getContentAsString();
    },
    
    fetch_ : function(url ,charset) {
      var res = UrlFetchApp.fetch(url);
      var scripts = res.getContentText(charset);
      return scripts;
    },
    
    cache_ : function(key , scripts , cacheSecond) {
      var second = cacheSecond || this.defaultCacheSecond;
      if(second > 0) {
        var cacheList = this.getCacheList();
        this.cache.put(this.cacheKeyPrefix + key, scripts,second);
        cacheList.push(key);
        this.cache.put(this.cacheListKey , Utilities.jsonStringify(cacheList));
        this.loggers.info("cached { key:" + this.cacheKeyPrefix + key +" , time: " + second + "}");
      }      
    },
    
    removeCache : function (url) {
      this.cache.remove(this.cacheKeyPrefix + url);
      
      var cacheList = this.getCacheList(this.cache);
      //var cacheList = [];
      cacheList = cacheList.filter(function(obj) {
        return obj != url;
      });
      
      
      this.cache.put(this.cacheListKey, Utilities.jsonStringify(cacheList));
      this.loggers.debug("delete cache. key:" + url);
    },
    
    getScriptCache_ : function(key) {
      return this.cache.get(this.cacheKeyPrefix + key);
    },
    
    getCacheList : function(c) {
      var cache = c || this.cache;
      var cacheListStr = cache.get(this.cacheListKey);
      var cacheList = null;
      if(!cacheListStr) {
        cacheList = [];
        cache.put(this.cacheListKey, Utilities.jsonStringify(cacheList));
      } else {
        cacheList = Utilities.jsonParse(cacheListStr);
      }
      return cacheList;
    }
  };
})();