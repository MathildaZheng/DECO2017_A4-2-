function $(id) {
    return document.getElementById(id)
}
window.onload = function() {
    //点击开始建 开始计数
    var count = 0
    var timer = null //timer变量记录定时器setInterval的返回值
    $("start").onclick = function() {
        timer = setInterval(function() {
            count++;
            console.log(count)
            // 需要改变页面上时分秒的值
            console.log($("id_S"))
            $("id_S_2").innerHTML =parseInt(count % 60%10)
            $("id_S_1").innerHTML = parseInt(count % 60/10)

            $("id_M_2").innerHTML = parseInt(count / 60 % 60%10)
            $("id_M_1").innerHTML = parseInt(count / 60 % 60/10)


            $("id_H_2").innerHTML = parseInt(count / 60 / 60 %10)
            $("id_H_1").innerHTML = parseInt(count / 60 / 60 /10)
        }, 1000)
    }
    $("stop").onclick = function() {
        //取消定时器
        clearInterval(timer)
    }
    //停止记数  数据清零  页面展示数据清零
    $("reset").onclick = function() {
        //取消定时器
        $("stop").onclick()
        // clearInterval(timer)
        //数据清零  总秒数清零
        count = 0
        //页面展示数据清零
        $("id_S_2").innerHTML =0
        $("id_S_1").innerHTML = 0

        $("id_M_2").innerHTML = 0
        $("id_M_1").innerHTML = 0

        $("id_H_2").innerHTML = 0
        $("id_H_1").innerHTML = 0
    }
    $("finish").onclick = function() {
        //取消定时器
        $("reset").onclick()
    }
}