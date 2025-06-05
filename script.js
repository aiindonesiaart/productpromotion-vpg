let selectedMockupColor = "";

// Handle Mockup Color Selection
document.querySelectorAll('#mockup-colors button').forEach(button => {
  button.addEventListener('click', () => {
    selectedMockupColor = button.getAttribute('data-color');

    // Remove active class from all
    document.querySelectorAll('#mockup-colors button').forEach(btn => btn.classList.remove('active'));

    // Add active to selected
    if (selectedMockupColor !== "") {
      button.classList.add('active');
      document.getElementById('mockup-color-value').value = selectedMockupColor;
      showNotification(`You choose ${selectedMockupColor} for mockup`);
    } else {
      document.getElementById('mockup-color-value').value = "";
      showNotification("You chose no color for mockup");
    }
  });
});

// Add Sticker Brand
document.getElementById('add-sticker-brand-btn').addEventListener('click', () => {
  const container = document.getElementById('sticker-brand-fields');
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'brand-input';
  input.placeholder = 'e.g. Bandar Sabun';
  container.appendChild(input);
});

// Add Dialogue Field
document.getElementById('toggle-dialogue-btn').addEventListener('click', () => {
  const container = document.getElementById('dialogue-fields');

  const wrapper = document.createElement('div');
  wrapper.className = 'dialogue-pair';

  const charInput = document.createElement('input');
  charInput.type = 'text';
  charInput.placeholder = 'Character Name';

  const dialogueTextarea = document.createElement('textarea');
  dialogueTextarea.placeholder = 'What does the character say?';

  wrapper.appendChild(charInput);
  wrapper.appendChild(dialogueTextarea);

  container.appendChild(wrapper);
});

// Show Notification
function showNotification(message) {
  const notif = document.getElementById('notifications');
  notif.textContent = message;
  setTimeout(() => { notif.textContent = ""; }, 3000);
}

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
  let prompt = "";

  // Art Style
  const artStyle = document.getElementById('art-style').value.trim();
  if (artStyle) prompt += `${artStyle} of `;

  // Base Prompt
  prompt += "a mockup product packaging,";

  // Mockup Color
  if (selectedMockupColor) {
    prompt += ` ${selectedMockupColor}`;
  }

  // Surface + Mockup Type
  const surface = document.getElementById('surface-select').value;
  const mockupType = document.getElementById('mockup-type-select').value;
  prompt += ` ${surface} ${mockupType},`;

  // Sticker
  const stickerColorHex = document.getElementById('sticker-color').value;
  const stickerColor = rgbToName(stickerColorHex) || "color";
  const stickerType = document.getElementById('sticker-type-select').value;
  const stickerDesc = document.getElementById('sticker-description').value.trim();

  prompt += ` with ${stickerColor} ${stickerType}`;

  if (stickerDesc) prompt += ` featuring ${stickerDesc}`;

  // Sticker Brands
  const brands = [...document.querySelectorAll('.brand-input')]
                    .map(i => i.value.trim())
                    .filter(Boolean)
                    .join(', ');

  if (brands) prompt += ` labelled: "${brands}"`;

  // Lighting & Background
  const lighting = document.getElementById('lighting-select').value;
  const background = document.getElementById('background-select').value;
  prompt += `, ${lighting}, ${background}`;

  // Character + Activity
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

  // Audio
  const audio = document.getElementById('audio-description').value.trim();
  if (audio) prompt += `, the audio is ${audio}`;

  // Camera Effect
  const cameraEffect = document.getElementById('camera-effect').value.trim();
  if (cameraEffect) prompt += `, the scene ends with ${cameraEffect}`;

  return prompt;
}

// Map Hex to Color Name
function rgbToName(hex) {
  const colorMap = {
    "#0000FF": "blue",
    "#000000": "black",
    "#FFFFFF": "white",
    "#008000": "green",
    "#FFD700": "golden",
    "#FFA500": "orange",
    "#FF0000": "red",
    "#FFFF00": "yellow"
  };
  return colorMap[hex.toUpperCase()] || "color";
}
