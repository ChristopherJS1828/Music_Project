const WHITE_KEYS = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';']
const BLACK_KEYS = ['w', 'e', 'r', 't', 'y', 'u', 'o', 'p']

const recordButton = document.querySelector('.rec-button')
const keys = document.querySelectorAll('.key')
const playButton = document.querySelector('.play-button')
// const saveButton = document.querySelector('.save-button')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

//maps user note into key array to be 
//able to loop through each key
const keyMap = [...keys].reduce((map, key) => {
  map[key.dataset.note] = key
  return map
}, {})

keyMap[C]

//global variables
let recordingStartTime
let songNotes

var songOne = document.getElementById("idAudio");
var songTwo = document.getElementById("idAudio2");
var songThree = document.getElementById("idAudio3");

function play_Audio() {
  songOne.play();
}

function play_Audio2() {
  songTwo.play();
}

function play_Audio3() {
  songThree.play();
}

function pause_Audio() {
  songOne.pause();
  songTwo.pause();
  songThree.pause();
}

keys.forEach(key => {
  key.addEventListener('click', () => playNote(key))
})

recordButton.addEventListener('click', toggleRecording)
// saveButton.addEventListener('click', saveSong)
playButton.addEventListener('click', playSong)

document.addEventListener('keydown', e => {
  if (e.repeat) return
  const key = e.key
  const whiteKeyIndex = WHITE_KEYS.indexOf(key)
  const blackKeyIndex = BLACK_KEYS.indexOf(key)

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
})
//toggles recording of a song
function toggleRecording() {
  recordButton.classList.toggle('active')
  if (isRecording()){
    startRecording()
  } else {
    stopRecording()
  }
}
//checks if its recordinf if not it starts
function isRecording() {
  return recordButton != null && recordButton.classList.contains('active')
}
//starts recording and gets the time of when recording started
function startRecording(){
  recordingStartTime = Date.now()
  songNotes = []
  playButton.classList.remove('show')
  saveButton.classList.remove('show')
}
//stops recording and plays song back to user
function stopRecording() {
  playSong()
  playButton.classList.add('show')
  saveButton.classList.add('show')
}
//loops through every key to play it back to the user
function playSong() {
  if (songNotes.length === 0) return
  songNotes.forEach(note => {
    setTimeout(() => {
      playNote(keyMap[note.key])
    }, note.startTime)
  })
}

function playNote(key) {
  if(isRecording()) recordNote(key.dataset.note)
  const noteAudio = document.getElementById(key.dataset.note)
  noteAudio.currentTime = 0
  noteAudio.play()
  key.classList.add('active')
  noteAudio.addEventListener('ended', () => {
    key.classList.remove('active')
  })
}

function recordNote(note) {
  songNotes.push({
    key: note,
    startTime: Date.now() - recordingStartTime
  })
}

// function saveSong() {
//   axios.post('/songs', {songNotes: songNotes}).then(res =>{
//     console.log(res.data)
//   })
// }