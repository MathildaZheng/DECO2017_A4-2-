//播放列表
var music_list =[
    {
        "id":"1",
        "name":"亲爱的",
        "src":"music/whkl.mp3"
    },
    {
        "id":"2",
        "name":"其实",
        "src":"music/lryh.mp3"
    },      
    {
        "id":"3",
        "name":"好想就这样",
        "src":"music/lx.mp3"
    },
]


var player = document.querySelector("#player");
var play_music = document.querySelector("#play_music");

var process_slide = document.querySelector("#process_slide");
var process = document.querySelector("#process");
var showHide = document.querySelector("#showHide");

var time = document.querySelector("#time");
var all_time = document.querySelector("#all-time");
var　btnPlay　= document.querySelector("#btnPlay");
var start_svg=document.querySelector("#start_svg");
var stop_svg=document.querySelector("#stop_svg");

var play_list = document.querySelector("#play_list");
var play_list_area = document.querySelector("#play_list_area");

//播放列表
function loadPlayList(){
    for(var i=0;i<music_list.length;i++){
        var music = music_list[i];
        //创建标签
        var liTag = document.createElement("li");
        var spanTitleTag = document.createElement("span");

        play_list.appendChild(liTag);
        liTag.appendChild(spanTitleTag);
        spanTitleTag.innerHTML=music.name;

        liTag.setAttribute("data-index",i);
        liTag.addEventListener("click",function(){
            //获取每个li标签的歌曲id
            var index = this.getAttribute("data-index");
            //将歌曲id赋给，全局变量play_index
            play_index = index;

            loadMusic();
            playMusic();
        })
    }
}

//载入歌曲
function loadMusic(){
    var music = music_list[play_index];
    console.log(play_index)
    player.src = music.src;
}

//播放,暂停
btnPlay.addEventListener("click",function(){
    if(player.paused){
        playMusic();
    }
    else {
        player.pause();
        start_svg.setAttribute("class","none");
        stop_svg.setAttribute("class","block");
    }
})

//上一曲
function backword(){
    if(play_index==0){
        play_index=music_list.length-1;
    }
    else{
        //改变播放序号
        play_index--;
    }

    loadMusic();
    playMusic();   
}

//下一曲
function forward(){
    if(play_index==music_list.length-1){
        play_index=0;
    }
    else{
        //改变播放序号
        play_index++;
    }
    loadMusic();
    playMusic();   
}

//播放
function playMusic(){
    player.play();
    start_svg.setAttribute("class","block");
    stop_svg.setAttribute("class","none");
}

//时间转换
function formateTime(time){
    if(time>3600){
        var hour = parseInt(time/3600);
        var minute = parseInt(time%3600/60);
        var second = parseInt(time%3600);
        hour=hour>=10?hour:"0"+hour;
        minute=minute>=10?minute:"0"+minute;
        second=second>=10?second:"0"+second;
        return hour+":"+minute+":"+second;
    }
    else{
        var minute = parseInt(time/60);
        var second = parseInt(time%60);
        minute=minute>=10?minute:"0"+minute;
        second=second>=10?second:"0"+second;
        return minute+":"+second;  
    }
}

//设置定时器
window.setInterval(function(){
    time.innerHTML = formateTime(player.currentTime);
    all_time.innerHTML=formateTime(player.duration);
    var percent = player.currentTime/player.duration;

    process_slide.style.width=percent*100+"%";
},100)


//隐藏播放列表 flag=0表示列表在隐藏
function showMusicList(){
    if(flag){
        play_list_area.style.display="none";
        flag=0;
    }
    else {
        play_list_area.style.display="block";
        flag=1;
    }
}


//初始化
loadPlayList();
var play_index=0;
var flag=1;

