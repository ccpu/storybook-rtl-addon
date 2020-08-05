export const getKnobDirection = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const dirKnob = urlParams.get('knob-direction');
  return dirKnob;
};
