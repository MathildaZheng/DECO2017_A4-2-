var layer;
layui.use('layer', function () {
    layer = layui.layer;
});

function main() {
    if (typeof (layer) != "object" || !layer) {
        setTimeout("main()", 400);
        return;
    }
    var myCalendar = new SimpleCalendar('#calendar', {
        width: '100%',
        height: '500px',
        language: 'EN', //language
        showLunarCalendar: false, //luner calender
        showHoliday: false, //holiday
        showFestival: false, //festival
        showLunarFestival: false,
        showSolarTerm: false, 
        showMark: true, 
        realTime: false, 
        timeRange: {
            startYear: 2002,
            endYear: 2049
        },
        mark: {},
        markColor: ['#82C43C', '#1E75FF', '#FF9AD5', '#DDDF00', '#FF974A'],//记事各个颜色
        main: function (year, month) {
            var index = -1;
            if (layer) index = layer.msg('正在查询数据......', {icon: 16, shade: 0.6});

            var localTest = localStorage.getItem('test');
            var jsonArray = JSON.parse(localTest);
            var resultObj = {}
            for(var i in jsonArray){
                var array = [];
                var date = jsonArray[i].date;
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

            console.log(resultObj);
            if (layer) layer.close(index);
            return resultObj;
        },

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