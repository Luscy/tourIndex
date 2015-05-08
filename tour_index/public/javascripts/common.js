/**
 * js通用工具文件
 */

(function() {
	String.prototype.startWith = function(str) {
		var reg = new RegExp("^" + str);
		return reg.test(this);
	};

	String.prototype.endWith = function(str) {
		var reg = new RegExp(str + "$");
		return reg.test(this);
	};  
	    
	/**   
	 * Simple Map   
	 *    
	 * var m = new Map();   
	 * m.put('key', 'value');   
	 * ...   
	 * var s = "";   
	 * m.each(function(key, value, index) {   
	 *      s += index + ":" + key + "=" + value + "/n";   
	 * });   
	 * alert(s);   
	 *    
	 * @author xiaoc 
	 * @date 2015-03-14   
	 */    
	Map = function() {     
	    /** 存放键的数组(遍历用到) */    
	    this.keys = new Array();    
	    /** 存放数据 */    
	    this.data = new Object(); 
	};
	         
    /**   
     * 放入一个键值对   
     * @param {String} key   
     * @param {Object} value   
     */    
	Map.prototype.put = function(key, value) {     
        if (this.data[key] == null) {     
            this.keys.push(key);     
        }     
        this.data[key] = value;     
    };     
         
    /**   
     * 获取某键对应的值   
     * @param {String} key   
     * @return {Object} value   
     */
    Map.prototype.get = function(key) {
        return this.data[key];
    };
         
    /**   
     * 删除一个键值对   
     * @param {String} key   
     */    
    Map.prototype.remove = function(key) {  
    	for (var i = 0; i < this.keys.length; i++) {     
	        if (key == this.keys[i]) {
	        	this.keys.splice(i, 1);
	        }
	    }
        this.data[key] = null;     
    };     
         
    /**   
     * 遍历Map,执行处理函数   
     * @param {Function} 回调函数 function(key,value,index){..}   
     */    
    Map.prototype.each = function(fn) {     
        if (typeof fn !== 'function') {     
            return;     
        }     
        var len = this.keys.length;     
        for (var i = 0; i < len; i++) {     
            var k = this.keys[i];     
            fn(k, this.data[k], i);     
        }     
    };     
         
    /**   
     * 获取键值数组(类似Java的entrySet())   
     * @return 键值对象{key,value}的数组   
     */    
    Map.prototype.entrys = function() {     
        var len = this.keys.length;     
        var entrys = new Array(len);     
        for (var i = 0; i < len; i++) {     
            entrys[i] = {     
                key : this.keys[i],     
                value : this.data[this.keys[i]]     
            };     
        }     
        return entrys;     
    };     
         
    /**   
     * 判断Map是否为空   
     */    
    Map.prototype.isEmpty = function() {     
        return this.keys.length == 0;     
    };     
         
    /**   
     * 获取键值对数量   
     */    
    Map.prototype.size = function() {     
        return this.keys.length;     
    };     
         
    /**   
     * 重写toString    
     */    
    Map.prototype.toString = function() {     
        var s = "{";     
        for(var i = 0; i < this.keys.length; i++, s += ','){     
            var k = this.keys[i];     
            s += k + "=" + this.data[k];     
        }     
        s = s.substring(0, s.length - 1);
        s += "}";     
        return s;     
    };     
})();
