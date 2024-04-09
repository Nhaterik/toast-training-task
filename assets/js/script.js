const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const cd = $(".cd");
const player = $(".player");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $(".audio");
const playBtn = $(".btn-toggle-play");
const progress = $(".progress");
const nextBtn = $(".btn-next");
const preBtn = $(".btn-pre");
const randomBtn = $(".btn-random");
const repeatBtn=$(".btn-repeat")
const  playList=$(".playlist")
const app = {
  currentIdx: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat:false,
  songs: [
    {
      name: "We are in the future",
      singer: "SON TUNG MTP",
      path: "./assets/music/future.mp3",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsjPq5hnnt7UfvVgNfAbphlLdtDDQEMkvkvqL1-Wp5Sg&s",
    },
    {
      name: "Summer Time",
      singer: "ArmsStrong",
      path: "./assets/music/summertime.mp3",
      image: "./assets/images/summertime.jpg",
    },
    {
      name: "Gratefull",
      singer: "NEFFEX",
      path: "./assets/music/grateful.mp3",
      image: "./assets/images/grateful.jpeg",
    },
    {
      name: "COLD",
      singer: "NEFFEX",
      path: "./assets/music/cold.mp3",
      image: "./assets/images/cold.jpeg",
    },
    {
      name: "FLY AWAY",
      singer: "The Fat Rat",
      path: "./assets/music/flyaway.mp3",
      image: "./assets/images/flyaway.png",
    },
    {
      name: "SAVE ME",
      singer: "DEAMY",
      path: "./assets/music/saveme.mp3",
      image: "./assets/images/saveme.jpeg",
    },
    {
      name: "We don't know",
      singer: "Hacker",
      path: "./assets/music/song1.mp3",
      image: "./assets/images/grass.jpg",
    },
  ],
 
  render: function () {
    const htmls = this.songs.map((song,idx) => {
      return `
      <div class="song ${idx===this.currentIdx ? 'active' :' '} " data-idx="${idx}">
      <div class="thumb" style="background-image: url('${song.image}');"></div>
      <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.singer}</p>
      </div>
      <div class="option">
        <i class="icon-option fa-solid fa-ellipsis"></i>
      </div>
    </div>
      `;
    });
   playList.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIdx];
      },
    });
  },
  handleEvents: function () {
    //handle cd smaller and larger
    const cdWidth = cd.offsetWidth;
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    //playing btn
    playBtn.onclick = function () {
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      audio.onplay = function () {
        app.isPlaying = true;
        player.classList.add("playing");
        cdThumbAnimate.play();
      };
      audio.onpause = function () {
        app.isPlaying = false;
        player.classList.remove("playing");
        cdThumbAnimate.pause();
      };
    };
    //moving the time
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPersent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPersent;
      }
    };
    progress.onchange = function (e) {
      const seekTime = (audio.duration * e.target.value) / 100;
      audio.currentTime = seekTime;
    };
    //handle cd rotating
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 100000,
      iterations: Infinity,
    });
    cdThumbAnimate.pause();
    // next song
    nextBtn.onclick = function () {
      if (app.isRandom) {
        app.randomSong();
      } else {
        app.nextSong();
      }
      audio.play();
      app.render();
      app.scrollToActiveSong();
    };
    // pre song
    preBtn.onclick = function () {
      if (app.isRandom) {
        app.randomSong();
      } else {
        app.preSong();
      }
      audio.play();
      app.render();
      app.scrollToActiveSong();
    };
    // random song
    randomBtn.onclick = function () {
      app.isRandom = !app.isRandom;
      randomBtn.classList.toggle("active", app.isRandom);
    };
    //repeat song
    repeatBtn.onclick=function() {
      app.isRepeat=!app.isRepeat
      repeatBtn.classList.toggle('active',app.isRepeat)
    };
    //handle ended song
    audio.onended=function() {
      if(app.isRepeat)
      audio.play();
    else 
      nextBtn.click();
    };
    playList.onclick=function(e){
      const songNode=e.target.closest('.song:not(.active)')
      if(songNode || e.target.closest('.option'))
      {
        //click song
        if(songNode) {
         app.currentIdx=Number(songNode.dataset.idx);
         app.loadCurrentSong();
         audio.play();
         app.render();
        }
      }
    };
  },
  scrollToActiveSong:function() {
    const blockValue = this.currentIndex <= 3 ? 'center' : 'nearest';
    setTimeout(()=>{
      $('.song.active').scrollIntoView({
        behavior:'smooth',
        block:blockValue,
      })
    },200)
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  nextSong: function () {
    this.currentIdx++;
    if (this.currentIdx >= this.songs.length) {
      this.currentIdx = 0;
    }
    this.loadCurrentSong();
  },
  preSong: function () {
    this.currentIdx--;
    if (this.currentIdx < 0) {
      this.currentIdx = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  randomSong: function () {
    let newIdx;
    do {
      newIdx =Math.floor(Math.random() * app.songs.length);
    } while (newIdx === this.currentIdx);
    this.currentIdx = newIdx;
    this.loadCurrentSong();
  },

  start: function () {
    // show the songs
    this.render();
    //take the current song
    this.defineProperties();
    // handle pull the cd
    this.handleEvents();
    //update the song heading, image,audio
    this.loadCurrentSong();
  },
};

app.start();
