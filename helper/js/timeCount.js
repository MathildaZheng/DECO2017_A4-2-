function $(id) {
    return document.getElementById(id)
}
window.onload = function() {
    var t;
    var Minute;
    var Second;
    var hour;
    var d;
    function begin() {
        if (Second != 0) {
            Second--;
            $("id_S_2").value = Second%10
            $("id_S_1").value = Math.floor(Second/10)

            $("id_M_2").value =Minute%10
            $("id_M_1").value = Math.floor(Minute/10)


            $("id_H_2").value = hour%10
            $("id_H_1").value = Math.floor(hour/10)

        } else {
            if (Minute > 0) {
                Minute--;
                Second = 59;
                $("id_S_2").value = Second%10
                $("id_S_1").value = Math.floor(Second/10)

                $("id_M_2").value =Minute%10
                $("id_M_1").value = Math.floor(Minute/10)


                $("id_H_2").value = hour%10
                $("id_H_1").value = Math.floor(hour/10)
            } else {
                if (hour > 0) {
                    hour--;
                    Minute = 59;
                    $("id_S_2").value = Second%10
                    $("id_S_1").value = Math.floor(Second/10)

                    $("id_M_2").value =Minute%10
                    $("id_M_1").value = Math.floor(Minute/10)


                    $("id_H_2").value = hour%10
                    $("id_H_1").value = Math.floor(hour/10)
                }else {
                    clearTimeout(t);
                }
            }
        }
        t = setTimeout(function () {
            begin()
        }, 1000)
    }
    $("start").onclick = function() {
        Second= parseInt($("id_S_1").value)*10+parseInt($("id_S_2").value);
        Minute= parseInt($("id_M_1").value)*10+parseInt($("id_M_2").value);
        hour =parseInt($("id_H_1").value)*10+parseInt($("id_H_2").value);

        console.log(Minute)
        console.log(Second)
        console.log(hour)

        $("id_S_2").value = Second%10
        $("id_S_1").value = Math.floor(Second/10)

        $("id_M_2").value =Minute%10
        $("id_M_1").value = Math.floor(Minute/10)


        $("id_H_2").value = hour%10
        $("id_H_1").value = Math.floor(hour/10)
        setTimeout(function () {
            begin()
        }, 1000);
    }
    $("stop").onclick = function() {
        clearTimeout(t);
    }

    $("reset").onclick = function() {

        $("id_S_2").value =0
        $("id_S_1").value = 0

        $("id_M_2").value = 0
        $("id_M_1").value = 0

        $("id_H_2").value = 0
        $("id_H_1").value = 0
        clearTimeout(t);
    }
    $("finish").onclick = function() {
        $("id_S_2").value =0
        $("id_S_1").value = 0

        $("id_M_2").value = 0
        $("id_M_1").value = 0

        $("id_H_2").value = 0
        $("id_H_1").value = 0
        clearTimeout(t);
    }
}