// initial localStorage
window.onload=function(){
    if (localStorage.getItem("test") == null){
        storage.setItem('test', '[]')
        storage.setItem('local_div_Test', '{}')
    }
}
let storage = window.localStorage;
var str='';
var div_str='';
var name='';
var localTest = localStorage.getItem('test');
var jsonArray = JSON.parse(localTest);


layui.use('form', function(){
    var form = layui.form,
        laydate = layui.laydate,
        element = layui.element;
    ;

    laydate.render({
        elem: '#date'
        ,theme: '#8A56AC'
        ,lang: 'en'
        ,format:'yyyy-M-dd'
    });
    laydate.render({
        elem: '#time'
        ,type: 'time'
        ,theme: '#8A56AC'
        ,lang: 'en'
    });
    laydate.render({
        elem: '#date_add'
        ,theme: '#8A56AC'
        ,lang: 'en'
    });
    laydate.render({
        elem: '#time_add'
        ,type: 'time'
        ,theme: '#8A56AC'
        ,lang: 'en'
    });

    //add task
    form.on('submit(demo1)', function(data){

        var local_div_Test = localStorage.getItem('local_div_Test');
        var json_div_Array = JSON.parse(local_div_Test);
        console.log(json_div_Array)
        console.log(jsonArray)
        // add task
        var settings=data.field;
        settings.isfinish=0;
        jsonArray.push(settings)
        // add localstorage
        str=JSON.stringify(jsonArray)
        storage.setItem('test', str)

        // add divide_task
        json_div_Array[settings.task]=[];
        // add localstorage
        div_str=JSON.stringify(json_div_Array)
        storage.setItem('local_div_Test', div_str)

        window.location.href="../Helper/calender.html"
        return false;
    });

    form.on('submit(demo_add)', function(data){
        var local_div_Test = localStorage.getItem('local_div_Test');
        var json_div_Array = JSON.parse(local_div_Test);
        if(name==''){
            alert("please input task name!!");
            return false
        }
        var array = json_div_Array[name];
        var settings=data.field;
        console.log(settings);
        var isfin=0;
        if (settings.hasOwnProperty("isfinish")){
            isfin=1
        }

        array = json_div_Array[name];
        array.push({
            title: settings.name,
            date: settings.date,
            time: settings.time,
            isfinish:isfin
        });

        json_div_Array[name]=array;
        div_str=JSON.stringify(json_div_Array)
        storage.setItem('local_div_Test', div_str)
        storage.setItem('text', '')
        console.log(json_div_Array)
        document.getElementById("add_form").style.display='none';
        document.getElementById('search_div').click();

        return false;
    });
    // search divide—task
    form.on('submit(search_div_task)', function(data){
        var local_div_Test = localStorage.getItem('local_div_Test');
        var json_div_Array = JSON.parse(local_div_Test);
        name=data.field.task;
        var div_task=json_div_Array[name];
        console.log(div_task)
        if (json_div_Array[name]==null){
            alert("not found this task!!");
            return false
        }
        var all=0,finish=0;
        var btn_j='';
        document.getElementById("task_tbody").innerHTML=''
        if(div_task.length===0){
            document.getElementById("task_tbody").innerHTML+='<p class="title-3">divide task is null,please add</p>'
        }else{
            all=div_task.length;
            for(var j in div_task){
                if(div_task[j].isfinish===1){
                    finish++;
                    document.getElementById("task_tbody").innerHTML+='<li class="flex-row">\n' +
                        '<div class="task_finish margin-20 margin-left-20">\n' +
                        '     <input class="checkbox" checked type="checkbox" id="'+j+'" onclick="btn_finish('+j+')">\n' +
                        '</div>'+
                        '                                <div class="task-name"><span>' +div_task[j].title+j+
                        '</span></div>\n' +
                        '                                <div class="task-time margin-20">\n' +
                        '                                    <div class="layui-form-item type_divide">\n' +
                        '                                        <input type="text" name="divide_task_date" placeholder="" value="'+div_task[j].date+'" class="layui-input btn-border divide_task_date" >\n' +
                        '                                        <svg xmlns="http://www.w3.org/2000/svg" width="18.8" height="20.889" viewBox="0 0 18.8 20.889">\n' +
                        '                                            <path id="ic_event_24px" d="M17.622,12.489H12.4v5.222h5.222ZM16.578,1V3.089H8.222V1H6.133V3.089H5.089A2.079,2.079,0,0,0,3.01,5.178L3,19.8a2.088,2.088,0,0,0,2.089,2.089H19.711A2.1,2.1,0,0,0,21.8,19.8V5.178a2.1,2.1,0,0,0-2.089-2.089H18.666V1Zm3.133,18.8H5.089V8.311H19.711Z" transform="translate(-3 -1)" fill="#fb9696"/>\n' +
                        '                                        </svg>\n' +
                        '                                    </div>\n' +
                        '                                </div>\n' +'<div class="task-time margin-20">\n' +
                        '                                    <div class="layui-form-item type_divide">\n' +
                        '                                        <input type="text"  name="divide_task_time" value="'+div_task[j].time+'" class="layui-input btn-border divide_task_time" >\n' +
                        '                                    </div>\n' +
                        '                                </div></li>'

                }else{
                    document.getElementById("task_tbody").innerHTML+='<li class="flex-row">\n' +
                        '<div class="task_finish margin-20 margin-left-20">\n' +
                        '     <input class="checkbox fin_'+div_task[j].isfinish +'" type="checkbox" id="'+j+'" onclick="btn_finish('+j+')">\n' +
                        '</div>'+
                        '                                <div class="task-name"><span>' +div_task[j].title+j+
                        '</span></div>\n' +
                        '                                <div class="task-time margin-20">\n' +
                        '                                    <div class="layui-form-item type_divide">\n' +
                        '                                        <input type="text" name="divide_task_date" placeholder="" value="'+div_task[j].date+'" class="layui-input btn-border divide_task_date" >\n' +
                        '                                        <svg xmlns="http://www.w3.org/2000/svg" width="18.8" height="20.889" viewBox="0 0 18.8 20.889">\n' +
                        '                                            <path id="ic_event_24px" d="M17.622,12.489H12.4v5.222h5.222ZM16.578,1V3.089H8.222V1H6.133V3.089H5.089A2.079,2.079,0,0,0,3.01,5.178L3,19.8a2.088,2.088,0,0,0,2.089,2.089H19.711A2.1,2.1,0,0,0,21.8,19.8V5.178a2.1,2.1,0,0,0-2.089-2.089H18.666V1Zm3.133,18.8H5.089V8.311H19.711Z" transform="translate(-3 -1)" fill="#fb9696"/>\n' +
                        '                                        </svg>\n' +
                        '                                    </div>\n' +
                        '                                </div>\n' +'<div class="task-time margin-20">\n' +
                        '                                    <div class="layui-form-item type_divide">\n' +
                        '                                        <input type="text"  name="divide_task_time" value="'+div_task[j].time+'" class="layui-input btn-border divide_task_time" >\n' +
                        '                                    </div>\n' +
                        '                                </div></li>'

                }
            }
            document.getElementById('finish_pro').innerText="finish:"+finish+"/"+all;
            document.getElementById('pro').style.width=finish*100/all+'%';
        }
        return false;
    });
});

// Set whether dividetask is completed
function btn_finish(j){
    var local_div_Test = localStorage.getItem('local_div_Test');
    var json_div_Array = JSON.parse(local_div_Test);

    if (json_div_Array.length==0){
        alert("please input divide task！！");
    }
    var checked=json_div_Array[name][j]['isfinish'];

    if(checked){
        json_div_Array[name][j]['isfinish']=0;
    }else{
        json_div_Array[name][j]['isfinish']=1;
    }
    console.log(json_div_Array[name][j])
    div_str=JSON.stringify(json_div_Array)
    storage.setItem('local_div_Test', div_str)
    document.getElementById('search_div').click();
}

// add divide task function
function add_div_task(){
    if(name==''){
        alert("please input task name!!");
        return false
    }
    document.getElementById("add_form").style.display='block';
}