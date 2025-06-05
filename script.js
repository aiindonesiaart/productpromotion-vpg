// Add dialogue field dynamically
document.getElementById('toggle-dialogue-btn').addEventListener('click', () => {
  const container = document.getElementById('dialogue-fields');

  const wrapper = document.createElement('div');
  wrapper.className = 'dialogue-pair';

  const charInput = document.createElement('input');
  charInput.type = 'text';
  charInput.placeholder = 'Character Name (e.g., Sarah)';

  const dialogueTextarea = document.createElement('textarea');
  dialogueTextarea.placeholder = 'What does the character say?';

  wrapper.appendChild(charInput);
  wrapper.appendChild(dialogueTextarea);

  container.appendChild(wrapper);
});

// Generate Prompt
document.getElementById('generate-prompt-btn').addEventListener('click', () => {
  const prompt = generatePrompt();
  document.getElementById('generated-prompt').value = prompt;
});

// Copy to Clipboard
document.getElementById('copy-prompt-btn').addEventListener('click', () => {
  const promptArea = document.getElementById('generated-prompt');
  promptArea.select();
  navigator.clipboard.writeText(promptArea.value).then(() => {
    alert('Prompt copied to clipboard!');
  });
});

function generatePrompt() {
  let prompt = "a mockup product packaging,";

  // Mockup Color
  const mockupColorHex = document.getElementById('mockup-color').value;
  const mockupColor = rgbToName(mockupColorHex) || "color";

  const surface = document.getElementById('surface-select').value;
  const mockupType = document.getElementById('mockup-type-select').value;

  prompt += ` ${mockupColor} ${surface} ${mockupType},`;

  // Sticker
  const stickerColorHex = document.getElementById('sticker-color').value;
  const stickerColor = rgbToName(stickerColorHex) || "color";
  const stickerType = document.getElementById('sticker-type-select').value;
  const stickerDesc = document.getElementById('sticker-description').value.trim();
  const stickerText = document.getElementById('sticker-text').value.trim();

  prompt += ` with ${stickerColor} ${stickerType}`;
  if (stickerDesc) prompt += ` featuring "${stickerDesc}"`;
  if (stickerText) prompt += ` says "${stickerText}"`;

  // Lighting & Background
  const lighting = document.getElementById('lighting-select').value;
  const background = document.getElementById('background-select').value;

  prompt += `, ${lighting}, ${background}`;

  // Character
  const character = document.getElementById('character-input').value.trim();
  const activity = document.getElementById('activity-input').value.trim();

  if (character && activity) {
    prompt += `, ${character} ${activity}`;
  }

  // Dialogues
  const dialogues = document.querySelectorAll('#dialogue-fields .dialogue-pair');
  dialogues.forEach(pair => {
    const char = pair.querySelector('input').value.trim();
    const text = pair.querySelector('textarea').value.trim();
    if (char && text) {
      prompt += `, ${char} says "${text}"`;
    }
  });

  // Art Style
  const artStyle = document.getElementById('art-style').value.trim();
  if (artStyle) {
    prompt = `${artStyle} of ${prompt}`;
  }

  // Audio
  const audio = document.getElementById('audio-description').value.trim();
  if (audio) prompt += `, the audio is ${audio}`;

  // Camera Effect
  const cameraEffect = document.getElementById('camera-effect').value.trim();
  if (cameraEffect) prompt += `, the scene ends with ${cameraEffect}`;

  return prompt;
}

// Simple RGB to Color Name Map (for better readability)
function rgbToName(hex) {
  const colorMap = {
    "#0000FF": "blue",
    "#000000": "black",
    "#A52A2A": "brown",
    "#FFFFFF": "white",
    "#008000": "green",
    "#FFD700": "golden",
    "#FFA500": "orange",
    "#FFC0CB": "pink",
    "#800080": "purple",
    "#C0C0C0": "silver",
    "#FF0000": "red",
    "#FFFF00": "yellow"
  };
  return colorMap[hex.toUpperCase()] || null;
}
