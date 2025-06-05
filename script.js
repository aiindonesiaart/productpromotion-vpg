// Toggle Character Section
document.getElementById('toggle-character-btn').addEventListener('click', () => {
  const section = document.getElementById('character-section');
  section.classList.toggle('hidden');
});

// Add Dialogue Button
document.getElementById('add-dialogue-row').addEventListener('click', () => {
  const container = document.getElementById('dialogue-fields');

  const wrapper = document.createElement('div');
  wrapper.className = 'dialogue-pair';

  const charInput = document.createElement('input');
  charInput.type = 'text';
  charInput.placeholder = 'Character Name (e.g., Sarah)';
  charInput.style.marginBottom = '5px';

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

// Function to collect all form data and generate prompt
function generatePrompt() {
  let prompt = "";

  // Art Style
  const artStyle = document.getElementById('art-style').value.trim();
  if (artStyle) prompt += `${artStyle} of `;

  // Character + Activity
  if (!document.getElementById('character-section').classList.contains('hidden')) {
    const charDesc = document.getElementById('character-select').value;
    const activity = document.getElementById('activity-select').value;
    prompt += `${charDesc} ${activity}, `;
  }

  // Mockup Section
  const surface = document.querySelectorAll('#mockup-section select')[0].value;
  const mockupType = document.querySelectorAll('#mockup-section select')[1].value;
  const lighting = document.querySelectorAll('#mockup-section select')[2].value;
  const background = document.querySelectorAll('#mockup-section select')[3].value;

  const stickerType = document.querySelectorAll('#mockup-section select')[4].value;
  const stickerText = document.getElementById('sticker-text').value;

  prompt += `a product packaging, ${surface} ${mockupType}, ${stickerType} featuring a slice of lemon says "${stickerText || 'Bandar Sabun'}", ${lighting}, ${background}`;

  // Dialogues
  const dialoguePairs = document.querySelectorAll('#dialogue-fields .dialogue-pair');
  dialoguePairs.forEach(pair => {
    const char = pair.querySelector('input').value.trim();
    const text = pair.querySelector('textarea').value.trim();

    if (char && text) {
      prompt += `, ${char} says "${text}"`;
    }
  });

  // Audio
  const audioDesc = document.getElementById('audio-description').value.trim();
  if (audioDesc) prompt += `, the audio is ${audioDesc}`;

  // Camera Effect
  const cameraEffect = document.getElementById('camera-effect').value.trim();
  if (cameraEffect) prompt += `, the scene ends with ${cameraEffect}`;

  return prompt;
}
