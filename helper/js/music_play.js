//Play list
var music_list =[
        {
            "id":"1",
            "name":"love story",
            "src":"music/whkl.mp3"
        },
        {
            "id":"2",
            "name":"ln my blood",
            "src":"music/lryh.mp3"
        },      
        {
            "id":"3",
            "name":"Faded",
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

//play list
    function loadPlayList(){
        for(var i=0;i<music_list.length;i++){
            var music = music_list[i];
            //create element
            var liTag = document.createElement("li");
            var spanTitleTag = document.createElement("span");

            play_list.appendChild(liTag);
            liTag.appendChild(spanTitleTag);
            spanTitleTag.innerHTML=music.name;

            liTag.setAttribute("data-index",i);
            liTag.addEventListener("click",function(){
                //Get the song id of each li tag
                var index = this.getAttribute("data-index");
                //Assign the song id to the global variable play_index
                play_index = index;

                loadMusic();
                playMusic();
            })
        }
    }
    
//loading music
    function loadMusic(){
        var music = music_list[play_index];
        console.log(play_index)
        player.src = music.src;
    }
    
//play, stop
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

// last song
    function backword(){
        if(play_index==0){
            play_index=music_list.length-1;
        }
        else{
            //change the play number
            play_index--;
        }

        loadMusic();
        playMusic();   
    }
    
//next
    function forward(){
        if(play_index==music_list.length-1){
            play_index=0;
        }
        else{
            //change the play number
            play_index++;
        }
        loadMusic();
        playMusic();   
    }
    
//play
    function playMusic(){
        player.play();
        start_svg.setAttribute("class","block");
        stop_svg.setAttribute("class","none");
    }

//time shift
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
    
//set timer
    window.setInterval(function(){
        time.innerHTML = formateTime(player.currentTime);
        all_time.innerHTML=formateTime(player.duration);
        var percent = player.currentTime/player.duration;

        process_slide.style.width=percent*100+"%";
    },100)
    

//hide the playlist flag=0 means the list is hidden
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


//initialization
    loadPlayList();
    var play_index=0;
    var flag=1;

