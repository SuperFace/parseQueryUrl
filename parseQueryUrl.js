function parseQueryUrl(url) {
    var url = url || window.location.href;
    //对非hash路由：为了防止误会：url所带参数中不要有：# , 因为location.hash是以#开始的。而且url中参数（？）和 hash（#）是有顺序的：先是 ？，后是 #
    //对hash路由，# 后面 ？有效
    //有三种情况：
    // 1. http://localhost:3003/manager?ctype=ykt#/teachercourselist?xxx=one
    // 2. http://localhost:3003/manager#/teachercourselist?xxx=one
    // 3. http://localhost:3003/manager?ctype=ykt#/teachercourselist
    var reg_url =/^[^\?]+\?([\w\W]+)$/,
        arr_url = reg_url.exec(url),
        reg_para=/([^&=]+)=([\w\W]*?)(&|$)/g, //g is very important
        ret = {};
    if(arr_url && arr_url[1]){
        if(url.indexOf("#") != -1){
            if(arr_url[1].indexOf("#") != -1){
                ret['hash'] = arr_url[1].substr(arr_url[1].indexOf("#")+1);
                arr_url[1] = arr_url[1].substring(0, arr_url[1].indexOf("#"));
            }else{
                ret['hash'] = url.substr(url.indexOf("#")+1).split("?")[0];
            }
            var hashQuery = reg_url.exec(ret['hash']);
            if(hashQuery && hashQuery[1]){
                var _str_para = hashQuery[1], _result;
                ret['hash'] = ret['hash'].split("?")[0];
                while((_result = reg_para.exec(_str_para)) != null){
                    ret[_result[1]] = _result[2];
                }
            }
        }
        var str_para = arr_url[1],result;
        while((result = reg_para.exec(str_para)) != null){
            ret[result[1]] = result[2];
        }
    }
    return ret;
}