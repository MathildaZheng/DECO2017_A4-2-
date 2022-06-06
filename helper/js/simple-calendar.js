'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var myConfig = {};

window._clickSP = function (obj,num) {
    var $obj = $(obj), type = num;

    if(num==-1){
        for(var i=0;i<=4;i++){
            $(".sc-days").find(".selected_" + i).removeClass("none").show();
        }
    }else{
        for(var i=0;i<=4;i++){
            $(".sc-days").find(".selected_" + i).addClass("none").show();
        }
        $(".sc-days").find(".selected_" + type).removeClass("none").show();
    }
}
window._click_prior = function (obj,num) {
    var $obj = $(obj), prior = num;

    for(var i=0;i<=2;i++){
        $(".sc-days").find(".prior_" + i).addClass("none").show();

    }
    $(".sc-days").find(".prior_" + prior).removeClass("none").show();

}


window._MonthWeekToDay = 42;

var SimpleCalendar = function () {
    //Constructor
    function SimpleCalendar(query, options) {
        _classCallCheck(this, SimpleCalendar);
        //default allocation
        this._defaultOptions = {
            width: '500px',
            height: '500px',
            language: 'en',
            showLunarCalendar: true,
            showHoliday: true,
            showFestival: true,
            showLunarFestival: true,
            showSolarTerm: true,
            showMark: true,
            realTime: true,
            timeRange: {
                startYear: 1900,
                endYear: 2049
            },
            timeZone: "",
            mark: {},
            markColor: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
            theme: {
                changeAble: false,
                weeks: {
                    backgroundColor: '#FBEC9C',
                    fontColor: '#4A4A4A',
                    fontSize: '20px'
                },
                days: {
                    backgroundColor: '#ffffff',
                    fontColor: '#565555',
                    fontSize: '24px'
                },
                todaycolor: 'orange',
                activeSelectColor: 'orange',
                invalidDays: '#C1C0C0'
            }
        };
        this.container = document.querySelector(query);
        this._defaultOptions.width = this.container.style.offsetWidth;
        this._defaultOptions.height = this.container.style.offsetHeight;

        myConfig = this._options = this.optionAssign(this._defaultOptions, options);

        this.create();
    }

    _createClass(SimpleCalendar, [{
        key: 'optionAssign',
        value: function optionAssign(optionsA, optionsB) {
            for (var key in optionsB) {
                if (_typeof(optionsA[key]) !== 'object') optionsA[key] = optionsB[key]; else {
                    optionsA[key] = this.optionAssign(optionsA[key], optionsB[key]);
                }
            }
            return optionsA;
        }
    }, {
        key: 'create',
        value: function create() {
            var root = this.container;
            root.innerHTML = '<div class="sc-header"> </div> <div class="sc-body"> </div>';
            root.style.width = this._options.width;
            // root.style.height = this._options.height;
            root.className = 'sc-calendar';
            var header = root.querySelector('.sc-header');
            var scbody = root.querySelector('.sc-body');
            //actions

            header.innerHTML =
                '<p>Show Agenda</p>'
                +'<a class="sc-mark-type " href="javascript:void(0)" onclick="window._clickSP(this,-1)" >'+'all'+'</a>'
                + '<a class="sc-mark-type" href="javascript:void(0)" onclick="window._clickSP(this,0)" >Courses</a>'
                + '<a class="sc-mark-type" href="javascript:void(0)" onclick="window._clickSP(this,1)" >Assessment</a>'
                + '<a class="sc-mark-type" href="javascript:void(0)" onclick="window._clickSP(this,2)" >Meeting</a>'
                + '<a class="sc-mark-type" href="javascript:void(0)" onclick="window._clickSP(this,3)" >Holiday</a>'
                +'<div class="sc-actions" style="min-width: 230px !important;">'
                + '      <div class="sc-yleft">' + '        &lsaquo;</div>'
                + '      <select class="sc-select-year" name="">' + '      </select>'
                + '      <div class="sc-yright">&rsaquo;</div>' + '    <div class="sc-mleft">'
                + '      &lsaquo;</div>' + '    <select class="sc-select-month" name="">'
                + '    </select>' + '    <div class="sc-mright">&rsaquo;</div>' + '</div>';


            scbody.innerHTML = ' <div class="sc-week"> </div> <div class="sc-days"> </div>';
            var week = scbody.querySelector('.sc-week');
            var days = scbody.querySelector('.sc-days');
            for (var i = 0; i < 7; i++) {
                week.innerHTML = week.innerHTML + ' <div class="sc-week-item"></div>';
            }
            for (var i = 0; i < window._MonthWeekToDay; i++) {
                days.innerHTML = days.innerHTML + '<div class="sc-item">' +
                    '<div class="wx-day"><span class="day"></span><span class="lunar-day"></span></div>' +
                    '<div class="wx-mark-cr"><ul class="wx-mark"></ul></div>' +
                    '</div>';
            }

            this.updateSelect(this.tyear, this.tmonth);

            this.update();

            if (this._options.realTime)
                self.setInterval('SimpleCalendar.timeupdate()', 200);
        }


    }, {
        key: 'update',
        value: function update() {
            var month = arguments.length <= 0 || arguments[0] === undefined ? this.tmonth : arguments[0];
            var year = arguments.length <= 1 || arguments[1] === undefined ? this.tyear : arguments[1];

            this.updateSize();
            this.updateWeek();
            this.addData(year, month);
            // this.updateHoliday(year, month);
            this.updateMark(year, month);
            // this.updateFestival(year, month);
            this.updateEvent();
            this.updateTheme(this._options.theme);
        }

    }, {
        key: 'updateSize',
        value: function updateSize() {
            var width = arguments.length <= 0 || arguments[0] === undefined ? this._options.width : arguments[0];
            var height = arguments.length <= 1 || arguments[1] === undefined ? this._options.height : arguments[1];


            this._options.width = width;
            this._options.height = height;

            this.container.style.width = width;


            if (parseInt(width) < 500) {
                var actions = this.arrayfrom(this.container.querySelectorAll('.sc-actions'));
                actions.forEach(function (v, i) {
                    v.classList.add('sc-actions-big');
                });
            } else {
                var actions = this.arrayfrom(this.container.querySelectorAll('.sc-actions'));
                actions.forEach(function (v, i) {
                    v.classList.remove('sc-actions-big');
                });
            }
            if (parseInt(height) < 400) {
                var items = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
                var weeks = this.arrayfrom(this.container.querySelectorAll('.sc-week-item'));
                items.forEach(function (v, i) {
                    v.querySelector('.day').classList.add('sc-item-small');
                });
                weeks.forEach(function (v, i) {
                    v.classList.add('sc-item-small');
                });
            } else {
                var items = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
                var weeks = this.arrayfrom(this.container.querySelectorAll('.sc-week-item'));
                items.forEach(function (v, i) {
                    v.querySelector('.day').classList.remove('sc-item-small');
                });
                weeks.forEach(function (v, i) {
                    v.classList.remove('sc-item-small');
                });
            }
        }


    }, {
        key: 'updateSelect',
        value: function updateSelect(year, month) {
            var selectYear = this.container.querySelector('.sc-select-year');
            var selectMonth = this.container.querySelector('.sc-select-month');
            selectYear.innerHTML = '';
            for (var i = this._options.timeRange.startYear; i < this._options.timeRange.endYear + 1; i++) {
                selectYear.innerHTML += '<option value="' + i + '">' + i + '</option>';
            }
            selectMonth.innerHTML = '';
            for (var i = 0; i < 12; i++) {
                var data = this.languageData['months_' + this._options.language];
                selectMonth.innerHTML += '<option value="' + (i + 1) + '">' + data[i] + '</option>';
            }

            selectYear.value = year;
            selectMonth.value = month;
        }


    }, {
        key: 'updateWeek',
        value: function updateWeek() {
            var weeks = this.arrayfrom(this.container.querySelectorAll('.sc-week-item'));
            var data = this.languageData['days_' + this._options.language];
            if (!data) {
                console.error('language error!');
            }
            weeks.forEach(function (v, i) {
                v.innerHTML = data[i];
            });
        }


    }, {
        key: 'addData',
        value: function addData(year, month) {
            var daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
            var day = new Date(year, month - 1, 1);
            var week = day.getDay();
            if (week == 0) week = 7;

            var thispageStart = new Date(Date.parse(day) - (week - 1) * 24 * 3600 * 1000);

            var hideMonthWeekToDay = false;
            for (var i = 0; i < window._MonthWeekToDay; i++) {
                daysElement[i].className = 'sc-item';
                var theday = new Date(Date.parse(thispageStart) + i * 24 * 3600 * 1000);
                var writeyear = theday.getFullYear();
                var writeday = theday.getDate();
                var writemonth = theday.getMonth() + 1;
                if (writemonth != month) {
                    daysElement[i].classList.add('sc-othermenth');
                    if (i == window._MonthWeekToDay - 7) hideMonthWeekToDay = true;
                }
                daysElement[i].querySelector('.day').innerHTML = writeday;

                if (this._options.showLunarCalendar) {
                    var val = new LunarHelp(writeyear, writemonth, writeday).getLunarDayName();
                    daysElement[i].querySelector('.lunar-day').innerHTML = new LunarHelp(writeyear, writemonth, writeday).getLunarDayName();
                } else {
                    daysElement[i].querySelector('.lunar-day').innerHTML = '';
                    daysElement[i].classList.add('item-nolunar');
                }

                if (this.tyear == writeyear && this.tday == writeday && this.tmonth == writemonth) {
                    this.selectDay = daysElement[i];
                    daysElement[i].classList.add("sc-today");
                }

                if (hideMonthWeekToDay) {
                    $(daysElement[i]).addClass("none").hide();
                } else {
                    $(daysElement[i]).removeClass("none").show();
                }
            }
            setHeight();
        }

    }, {
        key: 'updateMark',
        value: function updateMark(year, month) {
            var options = this._options;
            if (options.showMark) {
                var daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
                var currentmonth = month - 1;

                if (this._options.main) options.mark = this._options.main(year, month);
                this._options.sp = [];


                $('.wx-mark').html("");
                $("#sc-mark-sp").html("");

                var data = options.mark;
                if (data) {
                    daysElement.forEach(function (v, i) {
                        var day = +v.querySelector('.day').innerHTML;
                        if (day == 1) currentmonth++;
                        if (currentmonth != month) return;
                        var val = data[year + '-' + currentmonth + '-' + (day < 10 ? '0' + day : day)];
                        if (typeof (val) == 'object') {
                            v.classList.add('sc-mark');
                            for (var i in val) {
                                _addMask(v, val[i], val[i].prior, val[i].type);
                            }
                        } else if (typeof (val) == 'string') {
                            v.classList.add('sc-mark');
                            _addMask(v, val, 0);
                        } else {
                            v.classList.remove('sc-mark');
                            // v.title = '';
                        }
                    });
                    $('.sc-item').find(".wx-mark-cr").each(function () {
                        // onTips($(this), $(this).html());
                    });
                }
            }
        }

    },{
        key: 'updateTheme',
        value: function updateTheme(theme) {
            if (this._options.theme.changeAble) {
                var daytheme = theme.days;
                var weektheme = theme.weeks;
                var weeks = this.arrayfrom(this.container.querySelectorAll('.sc-week-item'));
                var days = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
                weeks.forEach(function (v, i) {
                    v.style.backgroundColor = weektheme.backgroundColor;
                    v.style.fontSize = weektheme.fontSize;
                    v.style.color = weektheme.fontColor;
                });
                days.forEach(function (v, i) {
                    if (!v.classList.contains('sc-today')) {
                        v.style.backgroundColor = daytheme.backgroundColor;
                        v.querySelector('.day').style.color = daytheme.fontColor;
                    } else {
                        v.style.backgroundColor = theme.todaycolor;
                    }
                    v.querySelector('.day').style.fontSize = daytheme.fontSize;
                });
                var Calendar = this;
                //active border
                days.forEach(function (v, i) {
                    v.onmouseover = function (e) {
                        this.style.borderColor = theme.activeSelectColor;
                        this.style.borderWidth = '1px';
                    };
                    v.onmouseout = function (e) {
                        this.style.borderColor = '#F1EBE4';
                        this.style.borderWidth = '0 0 1px 1px';
                    };
                });
            }
        }


    }, {
        key: 'updateEvent',
        value: function updateEvent() {
            var daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
            var container = this.container;
            var calendar = this;
            daysElement.forEach(function (v, i) {
                v.onmouseover = function (e) {
                    this.classList.add('sc-active-day');
                };
                v.onmouseout = function (e) {
                    this.classList.remove('sc-active-day');
                };
                v.onclick = function () {
                    calendar.selectDay = v;
                    var pre = container.querySelector('.sc-selected');
                    if (pre) pre.classList.remove('sc-selected');
                    this.classList.add('sc-selected');
                };
            });

            var selectYear = container.querySelector('.sc-select-year');
            var selectMonth = container.querySelector('.sc-select-month');
            selectYear.onchange = function () {
                var m = selectMonth.value;
                var y = this.value;
                calendar.update(m, y);
            };

            selectMonth.onchange = function () {
                var y = selectYear.value;
                var m = this.value;
                calendar.update(m, y);
            };

            var yearadd = container.querySelector('.sc-yright');
            var yearsub = container.querySelector('.sc-yleft');
            var monthadd = container.querySelector('.sc-mright');
            var monthsub = container.querySelector('.sc-mleft');
            var endYear = this._options.timeRange.endYear, startYear = this._options.timeRange.startYear;
            yearadd.onclick = function () {
                var currentyear = selectYear.value;
                if (currentyear < endYear) currentyear++;
                else return;
                selectYear.value = currentyear;
                calendar.update(this.tmonth, currentyear);
            };
            yearsub.onclick = function () {
                var currentyear = selectYear.value;
                if (currentyear > startYear) currentyear--;
                else return;
                selectYear.value = currentyear;
                calendar.update(this.tmonth, currentyear);
            };
            monthadd.onclick = function () {
                var currentmonth = selectMonth.value;
                var currentyear = selectYear.value;
                if (currentmonth < 12) currentmonth++;
                else if (currentyear < endYear) {
                    currentmonth = 1;
                    selectYear.value = ++currentyear;
                } else return;
                selectMonth.value = currentmonth;
                calendar.update(currentmonth, currentyear);
            };
            monthsub.onclick = function () {
                var currentmonth = selectMonth.value;
                var currentyear = selectYear.value;
                if (currentmonth > 1) currentmonth--;
                else if (currentyear > startYear) {
                    currentmonth = 12;
                    selectYear.value = --currentyear;
                } else return;
                selectMonth.value = currentmonth;
                calendar.update(currentmonth, currentyear);
            };
        }

    }, {
        key: 'addMark',
        value: function addMark(day, info) {
            this._options.mark[day] = info;
            this.update();
        }

    }, {
        key: 'getSelectedDay',
        value: function getSelectedDay() {
            var selectYear = this.container.querySelector('.sc-select-year').value;
            var selectMonth = this.container.querySelector('.sc-select-month').value;
            var selectDay = this.selectDay.querySelector('.day').innerHTML;
            return new Date(selectYear, selectMonth - 1, selectDay);
        }

    }, {
        key: 'setLenguage',
        value: function setLenguage(language) {
            this._options.language = language;
            var selectYear = this.container.querySelector('.sc-select-year');
            var selectMonth = this.container.querySelector('.sc-select-month');
            this.updateSelect(selectYear.value, selectMonth.value);
            this.update();
        }


    }, {
        key: 'showFestival',
        value: function showFestival(s) {
            this._options.showFestival = s;
            this.update();
        }

    }, {
        key: 'showHoliday',
        value: function showHoliday(s) {
            this._options.showHoliday = s;
            this.update();
        }

    }, {
        key: 'showSolarTerm',
        value: function showSolarTerm(s) {
            this._options.showSolarTerm = s;
            this.update();
        }
    }, {
        key: 'showLunarFestival',
        value: function showLunarFestival(s) {
            this._options.showLunarFestival = s;
            this.update();
        }

    }, {
        key: 'showLunarCalendar',
        value: function showLunarCalendar(s) {
            this._options.showLunarCalendar = s;
            this.update();
        }

    }, {
        key: 'showMark',
        value: function showMark(s) {
            this._options.showMark = s;
            this.update();
        }

    }, {
        key: 'arrayfrom',
        value: function arrayfrom(nidelist) {
            var array = [];
            [].forEach.call(nidelist, function (v) {
                array.push(v);
            });
            return array;
        }


    }]);

    return SimpleCalendar;
}();

SimpleCalendar.timeupdate = function () {
    var timespan = document.querySelectorAll('.sc-time');
    var now = new Date();
    var nh = now.getHours();
    var nm = now.getMinutes();
    var ns = now.getSeconds();
    if (nh < 10) nh = '0' + nh;
    if (nm < 10) nm = '0' + nm;
    if (ns < 10) ns = '0' + ns;
    [].forEach.call(timespan, function (v) {
        v.innerHTML = 'time：' + nh + ":" + nm + ':' + ns;
    });
};

SimpleCalendar.prototype.languageData = {
    days_EN: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    months_EN: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

SimpleCalendar.prototype.tyear = new Date().getFullYear();
SimpleCalendar.prototype.tmonth = new Date().getMonth() + 1;
SimpleCalendar.prototype.tday = new Date().getDate();

function _addMask(parentObj, val, prior, type) {
    var color = myConfig.markColor[type];
    if (typeof (val) == 'object') {
        var title = val.title, name = val.name;
        var prior_circle='';
        for(var i=2;i>=prior;i--){
            prior_circle+="<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1.5vw\" height=\"33\" viewBox=\"0 0 33 33\">\n" +
                "  <defs>\n" +
                "    <clipPath id=\"clip-path\">\n" +
                "      <circle id=\"_1\" data-name=\"1\" cx=\"16\" cy=\"16\" r=\"16\" transform=\"translate(0.382)\" fill=\"#fc5a5a\" stroke=\"#fff\" stroke-miterlimit=\"10\" stroke-width=\"1\"/>\n" +
                "    </clipPath>\n" +
                "  </defs>\n" +
                "  <g id=\"Profile_Picture_PP_Oval_32px_PP_5_Oval\" data-name=\"Profile Picture/PP Oval/32px/PP 5 Oval\" transform=\"translate(0.118 0.5)\">\n" +
                "    <g id=\"PP8\">\n" +
                "      <circle id=\"_1-2\" data-name=\"1\" cx=\"16\" cy=\"16\" r=\"16\" transform=\"translate(0.382)\" fill=\"#fc5a5a\" stroke=\"#fff\" stroke-miterlimit=\"10\" stroke-width=\"1\"/>\n" +
                "    </g>\n" +
                "  </g>\n" +
                "</svg>\n"

        }
        if (title) title = title.trim();
        else title = '';
        console.log(title)
        $(parentObj).find('.wx-mark').append(
            "<li class='wx-mark-li selected_" + type + " prior_" + prior + "' style='border-left: 3px solid " + color + ";background:" + color + "1A;'>"
            + prior_circle
            + "<p>" + title + "</p>"
            + "<p>" + name + " </p>" + "</li>"
        );
    }
}


window.onresize = function () {
    setHeight();
}

function setHeight() {
    var height = document.documentElement.clientHeight - 30 - 35 - 40;
    $(".sc-item").css("height", Math.max(96, height / 5) + "px");
}

setHeight();
