export const generateWaveformData = (audioBuffer: AudioBuffer, numSamples: number = 100): number[] => {
  const rawData = audioBuffer.getChannelData(0); // Assuming mono audio
  const blockSize = Math.floor(rawData.length / numSamples);
  const maxValues = Array(numSamples).fill(0);

  for (let i = 0; i < numSamples; i++) {
    let blockStart = blockSize * i;
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum += rawData[blockStart + j];
    }
    maxValues[i] = sum / blockSize;
  }

  return maxValues;
};
