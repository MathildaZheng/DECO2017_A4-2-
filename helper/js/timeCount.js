function $(id) {
    return document.getElementById(id)
}
window.onload = function() {
    //click start,start to count
    var count = 0
    var timer = null //The timer variable records the return value of the timer setInterval
    $("start").onclick = function() {
        timer = setInterval(function() {
            count++;
            console.log(count)
            // Need to change the value of hours, minutes and seconds on the page
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
        //cancel timer
        clearInterval(timer)
    }
    //Stop counting Data clearing Page display data clearing
    $("reset").onclick = function() {
        //cancel timer
        $("stop").onclick()
        // clearInterval(timer)
        //Data reset Total seconds rese
        count = 0
        //Clear page display data
        $("id_S_2").innerHTML =0
        $("id_S_1").innerHTML = 0

        $("id_M_2").innerHTML = 0
        $("id_M_1").innerHTML = 0

        $("id_H_2").innerHTML = 0
        $("id_H_1").innerHTML = 0
    }
    $("finish").onclick = function() {
        //cancel timer
        $("reset").onclick()
    }
}