//开发
let baseURL = 'http://api-breakingnews-web.itheima.net'

//测试
//let baseURL = 'http://api-breakingnews-web.itheima.net'

//生产
//let baseURL = 'http://api-breakingnews-web.itheima.net'

$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url


    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }


    options.complete = function (res) {
        //console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html'
        }
    }
})