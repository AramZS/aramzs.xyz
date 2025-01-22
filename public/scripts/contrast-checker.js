console.log('contrast', window.contrast)

window.addEventListener('DOMContentLoaded', (event) => {

  activateSwatchWatcher();
  window.colorContrastSet = {background: '#03092b', foreground: '#38cbb9'};
  const contrast = window.contrast.ratio(window.colorContrastSet.background, window.colorContrastSet.foreground);
  window.generateContrastStats();
  window.placeContrastStats(window.colorContrastSet.background, window.colorContrastSet.foreground);

});

window.generateContrastStats = function(){
  window.colorContrastResults = {
    ratio: contrast.ratio(window.colorContrastSet.background,window.colorContrastSet.foreground), // => 10
    score: contrast.score(window.colorContrastSet.background,window.colorContrastSet.foreground), // => 'AAA'
    isAccessible: contrast.isAccessible(window.colorContrastSet.background,window.colorContrastSet.foreground), // => true      
  }
  return window.colorContrastResults;
}

window.placeContrastStats = function(bgColor, fgColor){
  window["background-contraster"].style.backgroundColor = bgColor;
  window["foreground-contraster"].style.backgroundColor = fgColor;
  window["contrast-result-ratio"].innerText = `${window.colorContrastResults.ratio.toPrecision(4)}`;
  window["contrast-result-score"].innerText = `${window.colorContrastResults.score}`;
  window["contrast-result-check"].innerText = `${window.colorContrastResults.isAccessible}`;
  // window["results-container"].innerHTML = `${JSON.stringify(window.colorContrastResults)}`;
}

function activateSwatchWatcher() {
  const swatches = document.querySelectorAll('.compare-ready-color');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', (event) => {
      const swatch = event.target;
      swatches.forEach(otherSwatches => {
        otherSwatches.classList.remove('compare-active');
      });
      swatch.classList.toggle('compare-active');
      const fgColor = swatch.style.backgroundColor;
      const bgContainer = swatch.closest('.color-set');
      const bgColor = bgContainer.style.backgroundColor;
      window.colorContrastSet = {background: bgColor, foreground: fgColor}
      const contrastCalc = generateContrastStats();
      placeContrastStats(bgColor, fgColor);
      swatch.closest('.color-set').after(window['compare']);
      window["color-contrast-list"].style.marginTop = "14px";
    });


    swatch.addEventListener("dblclick", (event) => {
      const swatch = event.target;
      const foreground = swatch.style.backgroundColor
      console.log(swatch,foreground);
      event.stopPropagation();
      const container = swatch.closest('.color-set');
      const background = container.style.backgroundColor
      console.log(container, background)
      swatch.style.backgroundColor = background;
      container.style.backgroundColor = foreground;
    });
  });
}
