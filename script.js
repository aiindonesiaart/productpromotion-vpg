let selectedMockupColor = "";
let selectedStickerColor = "";

// Handle Mockup Color Selection
document.querySelectorAll('#mockup-colors button').forEach(button => {
  button.addEventListener('click', () => {
    selectedMockupColor = button.getAttribute('data-color');

    document.querySelectorAll('#mockup-colors button').forEach(btn => btn.classList.remove('active'));
    if (selectedMockupColor) button.classList.add('active');
    showNotification(`You choose ${selectedMockupColor || 'no color'} for mockup`);
  });
});

// Handle Sticker Color Selection
document.querySelectorAll('#sticker-colors button').forEach(button => {
  button.addEventListener('click', () => {
    selectedStickerColor = button.getAttribute('data-color');

    document.querySelectorAll('#sticker-colors button').forEach(btn => btn.classList.remove('active'));
    if (selectedStickerColor) button.classList.add('active');
    showNotification(`You choose ${selectedStickerColor || 'no color'} for sticker`);
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
  try {
    const prompt = generatePrompt();
    document.getElementById('generated-prompt').value = prompt.trim();
  } catch (error) {
    alert("Error generating prompt. Please check console.");
    console.error(error);
  }
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
  let promptParts = [];

  // Art Style
  const artStyleSelect = document.getElementById('art-style-select').value.trim();
  const artStyleCustom = document.getElementById('art-style-custom').value.trim();
  const artStyle = artStyleCustom || artStyleSelect;

  if (artStyle) {
    promptParts.push(`${artStyle} of`);
  }

  promptParts.push("a mockup product packaging,");

  // Mockup Color
  if (selectedMockupColor) {
    promptParts.push(selectedMockupColor);
  }

  // Surface + Mockup Type
  const surface = document.getElementById('surface-select').value.trim();
  const mockupType = document.getElementById('mockup-type-select').value.trim();

  if (surface && mockupType) {
    promptParts.push(`${surface} ${mockupType},`);
  } else if (surface) {
    promptParts.push(surface + ",");
  } else if (mockupType) {
    promptParts.push(mockupType + ",");
  } else {
    promptParts.pop(); // remove "a mockup product packaging," if no surface/mockup
  }

  // Sticker
  const stickerType = document.getElementById('sticker-type-select').value.trim();
  const stickerDesc = document.getElementById('sticker-description').value.trim();

  if (selectedStickerColor || stickerType) {
    if (selectedStickerColor) promptParts.push(`with ${selectedStickerColor}`);
    if (stickerType) promptParts.push(stickerType);
    if (stickerDesc) promptParts.push(`featuring ${stickerDesc}`);
  }

  // Sticker Brands
  const brands = [...document.querySelectorAll('.brand-input')]
                    .map(i => i.value.trim())
                    .filter(Boolean)
                    .join(', ');

  if (brands) promptParts.push(`labelled: "${brands}"`);

  // Lighting & Background
  const lighting = document.getElementById('lighting-select').value.trim();
  const background = document.getElementById('background-input').value.trim();

  if (lighting) promptParts.push(lighting);
  if (background) promptParts.push(background);

  // Character + Activity
  const character = document.getElementById('character-input').value.trim();
  const activity = document.getElementById('activity-input').value.trim();

  if (character && activity) {
    promptParts.push(`${character} ${activity}`);
  }

  // Dialogues
  document.querySelectorAll('#dialogue-fields .dialogue-pair').forEach(pair => {
    const char = pair.querySelector('input').value.trim();
    const text = pair.querySelector('textarea').value.trim();
    if (char && text) promptParts.push(`${char} says "${text}"`);
  });

  // Audio
  const audioSelect = document.getElementById('audio-select').value.trim();
  const audioCustom = document.getElementById('audio-custom').value.trim();
  const audio = audioCustom || audioSelect;
  if (audio) promptParts.push(`the audio is ${audio}`);

  // Camera Effect
  const cameraEffect = document.getElementById('camera-effect')?.value.trim();
  if (cameraEffect) promptParts.push(`the scene ends with ${cameraEffect}`);

  // Join all parts into one sentence
  let finalPrompt = promptParts.join(" ");

  // Clean up extra commas and spaces
  finalPrompt = finalPrompt.replace(/,\s*,/g, ",").replace(/\s+/g, " ").trim();

  return finalPrompt;
}
