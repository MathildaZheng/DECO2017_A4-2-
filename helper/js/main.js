/**
 * TODO 本功能需要layer和jquery插件的支持； 本功能为二次开发。
 * @see 源文件地址：http://sc.chinaz.com/jiaobendemo.aspx?downloadid=0201785541739
 */
var layer;
layui.use('layer', function () {
    layer = layui.layer;
});
// 去除0 参数 日期 如 2020-07-08 返回为 2020-7-8
function dislodgeZero(str) {
    let strArray = str.split("-");
    strArray = strArray.map(function(val) {
        if (val[0] == "0") {
            return (val = val.slice(1));
        } else {
            return val;
        }
    });
    return strArray.join("-");
}

function main() {
    if (typeof (layer) != "object" || !layer) {
        setTimeout("main()", 400);
        return;
    }
    var myCalendar = new SimpleCalendar('#calendar', {
        width: '100%',
        height: '500px',
        language: 'EN', //语言
        showLunarCalendar: false, //阴历
        showHoliday: false, //休假-暂时禁用
        showFestival: false, //节日
        showLunarFestival: false, //农历节日
        showSolarTerm: false, //节气
        showMark: true, //标记
        realTime: false, //具体时间
        timeRange: {
            startYear: 2002,
            endYear: 2049
        },
        mark: {},
        markColor: ['#82C43C', '#1E75FF', '#FF9AD5', '#DDDF00', '#FF974A'],//记事各个颜色
        main: function (year, month) {
            // alert("[获取数据]" + year + "--->" + month);
            var index = -1;
            if (layer) index = layer.msg('正在查询数据......', {icon: 16, shade: 0.6});
            //@-这里获取数据：
            console.log(year + "--->" + month);

            //模拟获取数据start

            var localTest = localStorage.getItem('test');
            console.log(localTest); //结果：小黑
            var jsonArray = JSON.parse(localTest);
            var resultObj = {},status = ['待揽收', '已发货', '配送中', '已签收'];
            for(var i in jsonArray){
                var array = [];
                var date = dislodgeZero(jsonArray[i].date);
                // var date2 = "2022-5-11";

                console.log(date)
                // console.log(date2)
                array.push({
                    title: jsonArray[i].task,
                    name: jsonArray[i].content,
                    prior: jsonArray[i].prior,
                    type: jsonArray[i].type
                });
                resultObj[date] = array;
            }

            // {2022-5-11: Array(1)}2022-5-11: Array(1)0:
            // {title: '第1个货区某个快递在该天需要处理的事情呀呀呀', name: '某区', ratio: '1%', status: 0, statusText: '待揽收'}
            // length: 1[[Prototype]]: Array(0)[[Prototype]]: Object
            // var resultObj = {},status = ['待揽收', '已发货', '配送中', '已签收'];
            // for (var i = 1; i <= 28; i++) {
            //     var array = [];
            //     var date = "2022-5-11";
            //     console.log(date)
            //     for (var num = 0; num <= i % 4; num++)
            //         array.push({
            //             title: '第' + (num + 1) + '个货区某个快递在该天需要处理的事情呀呀呀',
            //             name: '某区',
            //             ratio: (num + 1) * (num + 1) + '%',
            //             status: num,
            //             statusText: status[num]
            //         });
            //     resultObj[date] = i == 27 ? [] : array;
            // }

            // var localTest = localStorage.getItem('test');
            // console.log(localTest); //结果：小黑
            //
            // var jsonArray = JSON.parse(localTest);
            // for(var i in jsonArray){
            //     console.log(jsonArray[i].task); // 或 jsonArray[i]["name"]
            // }
            // console.log(jsonArray);
            //模拟获取数据end

            console.log(resultObj);
            if (layer) layer.close(index);
            return resultObj;
        },
        // timeupdate: false,//显示当前的时间HH:mm
        theme: {
            changeAble: false,
            weeks: {
                backgroundColor: 'white',
                fontColor: '#4A4A4A',
                fontSize: '20px',
            },
            days: {
                backgroundColor: '#ffffff',
                fontColor: '#565555',
                fontSize: '24px'
            },
            todaycolor: 'orange',
            activeSelectColor: 'orange',
        }
    });
}

main();
