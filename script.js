let messages = [];
let playlistAudios = [];

function displayMessages() {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = '';
  messages.forEach(message => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
  });
}

function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  if (message !== '') {
    const songName = document.querySelector('#playlist > div:last-child').textContent;
    messages.push(`${songName}: ${message}`);
    displayMessages();
    messageInput.value = '';
  }
}

function playNextAudio(index) {
  if (index < playlistAudios.length - 1) {
    playlistAudios[index].addEventListener('ended', function() {
      playlistAudios[index].pause();
      playlistAudios[index + 1].play();
      playNextAudio(index + 1);
    });
  }
}

document.getElementById('audio-file').addEventListener('change', function(event) {
  const files = event.target.files;
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    if (file.type.startsWith('audio/')) {
      const audio = document.createElement('audio');
      audio.src = URL.createObjectURL(file);
      audio.controls = true;
      playlistAudios.push(audio);
      
      const listItem = document.createElement('div');
      listItem.textContent = file.name;
      listItem.appendChild(audio);
      
      document.getElementById('playlist').appendChild(listItem);
    }
  }

  // Autoplay the first song if there is only one in the playlist
  if (playlistAudios.length === 1) {
    playlistAudios[0].play();
    playNextAudio(0);
  }
});
