$(function () {
    $('#link_reg').on('click', function () {
        console.log('111');

        $('.login-box').hide();
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide()
    })

    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password').val()
            if (value !== pwd)
                return '两次密码输入不一致'
        }
    })


    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username').val(),
                password: $('.reg-box input[name=password').val()
            },
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 1 })
                }
                return layer.msg('注册成功', { icon: 6 });
                $('#link_reg').click();
                $('form_reg')[0].reset
            }
        })
    })


    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 1 })
                }
                layer.msg('恭喜你,登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html';
            }
        })
    })
})