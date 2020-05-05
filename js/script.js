document.addEventListener('DOMContentLoaded', function () { // Аналог $(document).ready(function(){

    const audioEl = document.getElementById('audio');
    const audioContainer = document.getElementById('audioContainer');
    const plateImage = document.getElementById('plateImage');
    const prev = document.getElementById('audioPrev');
    const play = document.getElementById('audioPlay');
    const next = document.getElementById('audioNext');
    const audioName = document.getElementById('audioName');
    const progressContainer = document.getElementById('progressContainer');
    const progress = document.getElementById('progress');

    // Названия песней
    const audios = ['hey', 'summer', 'ukulele'];

    let audioIndex = 1;

    // Вставка параметров песни в DOM
    loadAudio(audios[audioIndex]);

    // Обновление параметров песни
    function loadAudio(audio) {
        audioEl.src = `music/${audio}.mp3`;
        plateImage.setAttribute('src', `img/${audio}.jpg`);
        plateImage.setAttribute('alt', `${audio} Image`);
        audioName.innerText = `${audio}`;
    }

    // Функция проигрывания аудио
    function audioPlay() {
        audio.play();
        audioContainer.classList.add('play');
        play.querySelector('i.fa').classList.remove('fa-play');
        play.querySelector('i.fa').classList.add('fa-pause');
    }

    // Функция паузы аудио
    function audioPause() {
        audio.pause();
        audioContainer.classList.remove('play');
        play.querySelector('i.fa').classList.remove('fa-pause');
        play.querySelector('i.fa').classList.add('fa-play');
    }

    // Функция предыдущей песни
    function prevAudio() {
        audioIndex--;

        if (audioIndex < 0) {
            audioIndex = audios.length - 1;
        }

        loadAudio(audios[audioIndex]);
        audioPlay();
    }

    // Функция следующей песни
    function nextAudio() {
        audioIndex++;

        if (audioIndex > audios.length - 1) {
            audioIndex = 0;
        }

        loadAudio(audios[audioIndex]);
        audioPlay();
    }

    // Функция смены статуса аудио 
    function changeAudioStatus() {
        if (audio.paused) {
            audioPlay();
        } else {
            audioPause();
        }
    }

    // Функция обновления блока progress
    function updateProgress() {
        const audioDuration = audio.duration;
        const currentTime = audio.currentTime;
        progress.style.width = `${currentTime / audioDuration * 100}%`;
    }

    // Событие при клике на кнопку Play
    play.addEventListener('click', changeAudioStatus);

    // Событие при клике кнопки Previous
    prev.addEventListener('click', prevAudio);

    // Событие при клике кнопки Next
    next.addEventListener('click', nextAudio);

    // Событие при изменение времени аудио
    audio.addEventListener('timeupdate', updateProgress);

    // Событие установки времени аудио
    function setProgress(e) {
        const progressWidth = this.clientWidth;
        const setProgressWidth = e.offsetX;
        const audioDuration = audio.duration;
        audio.currentTime = setProgressWidth * audioDuration / progressWidth;
    }

    // Событие при нажатии на блок Progress
    progressContainer.addEventListener('click', setProgress);

    // Событие при окончании аудио
    audio.addEventListener('ended', nextAudio);

});