nowDate = new Date();

let date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate(),
}

let systemDate = date.year + '-'+ date.month + '-' + 0 + date.date;
console.log(systemDate);


var local_div_Test = localStorage.getItem('local_div_Test');
var json_div_Array = JSON.parse(local_div_Test);
var jsonArray = [];

var array=[];
console.log(jsonArray);
for (var m in json_div_Array){
    for (var i in json_div_Array[m]){
        if (json_div_Array[m][i].date==systemDate){
            array.push(json_div_Array[m][i])
            document.getElementById('taskTable').innerHTML+='<li class="flex-row">\n' +
                '                                <div>\n' +
                '                                    <input type="checkbox" lay-skin="primary" name="like[write]" title="">\n' +
                '                                </div>\n' +
                '                                <div class="task-name"><span>'+json_div_Array[m][i].task+'</span></div>\n' +
                '                                <div class="task-time btn-border">\n' +
                '                                    <span>'+json_div_Array[m][i].time+'</span>\n' +
                '                                </div>\n' +
                '                            </li>'
        }
    }
}
if(array.length==0){
    document.getElementById('taskTable').innerHTML+="There is no task today, please go to the task page to add!";
}
console.log(array)



layui.use('form', function(){
    var form = layui.form

});




