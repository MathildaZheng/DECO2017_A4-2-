var localTest = localStorage.getItem('test');
var jsonArray = JSON.parse(localTest);
var array=[];
console.log(GetDateStr())
for (var i in jsonArray){
    console.log(dislodgeZero(jsonArray[i].date))
    // if (dislodgeZero(jsonArray[i].date)==GetDateStr()){
        array.push(jsonArray[i])
        document.getElementById('taskTable').innerHTML+='<li class="flex-row">\n' +
            '                                <div>\n' +
            '                                    <input type="checkbox" lay-skin="primary" name="like[write]" title="">\n' +
            '                                </div>\n' +
            '                                <div class="task-name"><span>'+jsonArray[i].task+'</span></div>\n' +
            '                                <div class="task-time btn-border">\n' +
            '                                    <span>'+jsonArray[i].time+'</span>\n' +
            '                                </div>\n' +
            '                            </li>'
    // }
}
if(array.length==0){
    document.getElementById('taskTable').innerHTML+="There is no task today, please go to the task page to add!";
}



layui.use('form', function(){
    var form = layui.form

});

