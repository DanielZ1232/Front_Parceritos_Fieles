const loadFonts = () => {
    const fontNames = [
      'Poppins-Light', 'Poppins-Regular', 'Poppins-Bold',
      'Poppins-Black', 'Poppins-BlackItalic', 'Poppins-BoldItalic',
      'Poppins-Italic', 'Poppins-ExtraLightItalic', 'Poppins-LightItalic',
      'Poppins-Medium', 'Poppins-MediumItalic', 'Poppins-SemiBold',
      'Poppins-SemiBoldItalic', 'Poppins-Thin', 'Poppins-ThinItalic'
    ]; // Lista de todas las fuentes
  
    fontNames.forEach(font => {
      const fontFace = new FontFace(font, `url('./fonts/${font}.ttf')`, {
        style: 'normal',
        weight: 'normal', // Puedes ajustar esto según el tipo de fuente
      });
  
      fontFace.load().then(loadedFont => {
        document.fonts.add(loadedFont);
        console.log(`Font loaded: ${font}`);
      }).catch(error => {
        console.error(`Failed to load font: ${font}`, error);
      });
    });
  };
  
  export default loadFonts;
  