// Toggle Character Section
document.getElementById('toggle-character-btn').addEventListener('click', () => {
  const section = document.getElementById('character-section');
  section.classList.toggle('hidden');
});

// Add Dialogue Rows
document.getElementById('add-dialogue-row').addEventListener('click', () => {
  const tbody = document.querySelector('#dialogue-table tbody');

  const tr = document.createElement('tr');

  const tdChar = document.createElement('td');
  const inputChar = document.createElement('input');
  inputChar.type = 'text';
  inputChar.placeholder = 'e.g. Sarah';
  tdChar.appendChild(inputChar);

  const tdText = document.createElement('td');
  const inputText = document.createElement('input');
  inputText.type = 'text';
  inputText.placeholder = 'What they say...';
  tdText.appendChild(inputText);

  tr.appendChild(tdChar);
  tr.appendChild(tdText);

  tbody.appendChild(tr);
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
  let characterPrompt = "";
  if (!document.getElementById('character-section').classList.contains('hidden')) {
    const charDesc = document.getElementById('character-select').value;
    const activity = document.getElementById('activity-select').value;
    characterPrompt = `${charDesc} ${activity}, `;
    prompt += characterPrompt;
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
  const dialogues = [...document.querySelectorAll('#dialogue-table tbody tr')];
  if (dialogues.length > 0) {
    dialogues.forEach(row => {
      const char = row.children[0].children[0].value;
      const text = row.children[1].children[0].value;
      if (char && text) {
        prompt += `, ${char} says "${text}"`;
      }
    });
  }

  // Audio
  const audioDesc = document.getElementById('audio-description').value.trim();
  if (audioDesc) prompt += `, the audio is ${audioDesc}`;

  // Camera Effect
  const cameraEffect = document.getElementById('camera-effect').value.trim();
  if (cameraEffect) prompt += `, the scene ends with ${cameraEffect}`;

  return prompt;
}
