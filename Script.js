let numProcesses, numResources;

function generateInputForm() {
  numProcesses = parseInt(document.getElementById('num-processes').value);
  numResources = parseInt(document.getElementById('num-resources').value);

  if (numProcesses <= 0 || numResources <= 0) {
    alert('Please enter valid numbers for processes and resources.');
    return;
  }

  let processFormHtml = '';
  for (let i = 0; i < numProcesses; i++) {
    processFormHtml += `
      <div class="process-input">
        <h3>Process ${i + 1}</h3>
        <label for="allocation-${i}">Allocation:</label>
        <input type="text" id="allocation-${i}" placeholder="Enter allocation values (comma separated)" />
        <label for="max-${i}">Max:</label>
        <input type="text" id="max-${i}" placeholder="Enter max values (comma separated)" />
      </div>
    `;
  }

  document.getElementById('processes-container').innerHTML = processFormHtml;
  document.getElementById('allocation-form').style.display = 'block';
}

function calculateBankersAlgorithm() {
  const allocationMatrix = [];
  const maxMatrix = [];
  const availableResources = [];  // Initial available resources (input by user or set as example)

  // Parse allocation and max values
  for (let i = 0; i < numProcesses; i++) {
    const allocation = document.getElementById(`allocation-${i}`).value.split(',').map(Number);
    const max = document.getElementById(`max-${i}`).value.split(',').map(Number);

    if (allocation.length !== numResources || max.length !== numResources) {
      alert(`Please enter valid values for Process ${i + 1}`);
      return;
    }

    allocationMatrix.push(allocation);
    maxMatrix.push(max);
  }

  // Calculate available resources (this can also be input by the user, or calculated from the max matrix)
  // For simplicity, I'm setting an example array (you can replace with user input or calculated values)
  availableResources.push(3, 3, 2);  // Example values for resources

  // Banker's Algorithm to check for safe sequence
  const safeSequence = [];
  let work = [...availableResources];
  let finish = Array(numProcesses).fill(false);

  let count = 0;
  while (count < numProcesses) {
    let foundProcess = false;

    for (let i = 0; i < numProcesses; i++) {
      if (!finish[i]) {
        let canAllocate = true;
        for (let j = 0; j < numResources; j++) {
          if (maxMatrix[i][j] - allocationMatrix[i][j] > work[j]) {
            canAllocate = false;
            break;
          }
        }

        if (canAllocate) {
          for (let j = 0; j < numResources; j++) {
            work[j] += allocationMatrix[i][j];
          }
          safeSequence.push(i);
          finish[i] = true;
          foundProcess = true;
          count++;
          break;
        }
      }
    }

    if (!foundProcess) {
      alert('No safe sequence exists! The system is in a deadlock state.');
      return;
    }
  }

  document.getElementById('safe-sequence').innerText = `Safe Sequence: ${safeSequence.map(i => `P${i + 1}`).join(' -> ')}`;
  document.getElementById('safe-sequence-container').style.display = 'block';
}
