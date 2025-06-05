document.getElementById('toggle-character-btn').addEventListener('click', () => {
  const section = document.getElementById('character-section');
  section.classList.toggle('hidden');
});

document.getElementById('toggle-dialogue-btn').addEventListener('click', () => {
  const container = document.getElementById('dialogues-container');

  const dialogueBox = document.createElement('div');
  dialogueBox.className = 'dialogue-box';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter dialogue line...';

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.style.marginLeft = '10px';
  removeBtn.onclick = () => dialogueBox.remove();

  dialogueBox.appendChild(input);
  dialogueBox.appendChild(removeBtn);

  container.appendChild(dialogueBox);
});
