// initial localStorage
window.onload=function(){
    if (localStorage.getItem("local_div_Test") == null){
        storage.setItem('test', '[]')
        storage.setItem('local_div_Test', '{}')
        storage.setItem('local_task_new', '[]')
    }
}
let storage = window.localStorage;
var str='';
var div_str='';
var task_str='';
var name="";
var is_change=false;
var index=-1;
var  local_task_new= localStorage.getItem('local_task_new');
var task_array = JSON.parse(local_task_new);

var local_div_Test = localStorage.getItem('local_div_Test');
var json_div_Array = JSON.parse(local_div_Test);

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
        elem: '#due_date'
        ,theme: '#8A56AC'
        ,lang: 'en'
    });

    //add task
    form.on('submit(div_add)', function(data){
        // var localTest = localStorage.getItem('test');
        // var jsonArray = JSON.parse(localTest);

        if(is_change&&index!==-1){
            var data1 = form.val("formTask");
            json_div_Array[name][index].task=data1.task
            json_div_Array[name][index].prior=data1.prior
            json_div_Array[name][index].date=data1.date
            json_div_Array[name][index].time=data1.time
            json_div_Array[name][index].type=data1.type
            json_div_Array[name][index].time=data1.time
            json_div_Array[name][index].link=data1.type
            form.val("formTask", {
                "task": ''
                ,"type": 0
                ,"prior": 0
                ,"date": ''
                ,"time": ''
                ,"content": ''
                ,"link": ''
            });
            is_change=false;
        }else{
            // add divide_task
            if(name===''){
                alert("please input task name");
                return false
            }else{
                var settings=data.field;
                settings.isfinish=0;
                // jsonArray.push(settings)
                console.log(settings);
                var array = json_div_Array[name];
                array.push(settings);

                console.log(json_div_Array);
            }
        }
        // add localstorage
        // str=JSON.stringify(jsonArray)
        // storage.setItem('test', str)
        div_str=JSON.stringify(json_div_Array)
        storage.setItem('local_div_Test', div_str)
        get_list(name,"","")
        form.val("formTask", {
            "task": ''
            ,"type": 0
            ,"prior":0
            ,"date": ''
            ,"time": ''
            ,"content": ''
            ,"link": ''
        });
        return false;
    });

    window._clicktask = function (obj,i) {
        var local_div_Test = localStorage.getItem('local_div_Test');
        var json_div_Array = JSON.parse(local_div_Test);
        var $obj = $(obj);
        var div_task=json_div_Array[name][i];
        console.log(div_task)
        form.val("formTask", {
            "task": div_task.task
            ,"type": div_task.type
            ,"prior": div_task.prior
            ,"date": div_task.date
            ,"time": div_task.time
            ,"content": div_task.content
            ,"link": div_task.link
        });
        is_change=true;
        index=i;
    }

});
function task_change(){
    name=document.getElementById("task_name").value;
    console.log(name);

    var task_type=document.getElementById("task_type").value;
    var due_date=document.getElementById("due_date").value;

    get_list(name,task_type,due_date)
}
function get_list(task,type,due_date){

   
    if(json_div_Array[name]==null){
        // add task json

        json_div_Array[name]=[];
    }
    add_to_list(task)
}

function add_to_list(task){

    var all=0,finish=0;
    console.log(task);
    var div_task=json_div_Array[task];
    console.log(div_task)
    document.getElementById("task_tbody").innerHTML=''
    if(div_task.length===0){
        document.getElementById("task_tbody").innerHTML+='<p class="title-3">divide task is null,please add</p>'
        document.getElementById('pro').style.width='0';
    }else{
        all=div_task.length;
        for(var j in div_task){
            if(div_task[j].isfinish===1){
                finish++;
                document.getElementById("task_tbody").innerHTML+='<li class="flex-row">\n' +
                    '<div class="task_finish margin-20 margin-left-20">\n' +
                    '     <input class="checkbox" checked type="checkbox" id="'+j+'" onclick="btn_finish('+j+')">\n' +
                    '</div>'+
                    '                                <div class="task-name" ><a href="javascript:void(0)" onclick="window._clicktask(this,'+j+')" >'+div_task[j].task+
                    '</a></div>\n' +
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
                    '                                <div class="task-name" ><a href="javascript:void(0)" onclick="window._clicktask(this,'+j+')" >'+div_task[j].task+
                    '</a></div>\n' +
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
        document.getElementById('pro').style.width=finish*100/all+'%';
    }
    document.getElementById('finish_pro').innerText="finish:"+finish+"/"+all;
    return false;
}

function btn_finish(j){

    var checked=json_div_Array[name][j]['isfinish'];

    if(checked){
        json_div_Array[name][j]['isfinish']=0;
    }else{
        json_div_Array[name][j]['isfinish']=1;
    }
    console.log(json_div_Array[name][j])
    div_str=JSON.stringify(json_div_Array)
    storage.setItem('local_div_Test', div_str)
    add_to_list(name)
}
function to_cal(){
    var task_type=document.getElementById("task_type").value;
    var due_date=document.getElementById("due_date").value;

    var flag=true;
    for(var i in task_array){
        if (task_array[i].task==name){
            flag=false;
        }
    }
    if(flag){
        if(task_type==''||due_date==''){
            alert("Please do not allow the task field to be empty")
            return false
        }
        task_array.push({
            task: name,
            type: task_type,
            due_date: due_date,
        });
    }

    task_str=JSON.stringify(task_array)
    div_str=JSON.stringify(json_div_Array)
    storage.setItem('local_div_Test', div_str)
    storage.setItem('local_task_new', task_str)
window.location.href="../helper/calender.html"
}