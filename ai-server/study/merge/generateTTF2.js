const fs = require('fs');
const gracefulFs = require('graceful-fs');
const { PNG } = require('pngjs');
const ImageTracer = require("../public/javascript/imagetracer_v1.2.1");
const svg2ttf = require("svg2ttf");
const svgicons2svgfont = require("svgicons2svgfont");

gracefulFs.gracefulify(fs);

// 설정된 옵션
const option = {
  ltres: 1,
  qtres: 1,
  strokewidth: 0.5,
  pathomit: 8,
  blurradius: 0,
  blurdelta: 10,
  pal: [
    { r: 0, g: 0, b: 0, a: 255 },
    { r: 255, g: 255, b: 255, a: 255 },
  ],
  linefilter: true
};

// 디렉토리 생성
const directories = ['/test', './svgs', './svg_fonts', './ttf_fonts'];
directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
});

// 파일 처리
const files = fs.readdirSync('./test/');

// 메인 함수
function generateFonts(files) {
  const fontStream = new svgicons2svgfont({ fontName: "_FONT" });
  setupFontStream(fontStream);
  
  files.forEach(file => {
    if (file.endsWith('.png')) {
      const fileName = file.split('.png')[0];
      processImage(`./test/${file}`, fileName);
      addGlyphToFontStream(`./svgs/${fileName}.svg`, fileName, fontStream);
    }
  });

  fontStream.end();
}

// 이미지 처리 및 SVG 변환
function processImage(filePath, fileName) {
  const data = fs.readFileSync(filePath);
  const png = PNG.sync.read(data);
  const myImageData = { width: png.width, height: png.height, data: png.data };
  const svgstring = ImageTracer.imagedataToSVG(myImageData, option);
  fs.writeFileSync(`./svgs/${fileName}.svg`, svgstring);
}

// Glyph를 Font Stream에 추가
function addGlyphToFontStream(svgFilePath, glyphName, fontStream) {
  const glyph = fs.createReadStream(svgFilePath);
  glyph.metadata = {
    unicode: [String.fromCharCode(parseInt(glyphName, 16))],
    name: `uni${glyphName}`
  };
  fontStream.write(glyph);
}

// Font Stream 설정 및 TTF 변환
function setupFontStream(fontStream) {
  fontStream
    .pipe(fs.createWriteStream('./svg_fonts/font_ss.svg'))
    .on('finish', () => {
      const ttf = svg2ttf(fs.readFileSync('./svg_fonts/font_ss.svg', 'utf8'), {});
      fs.writeFileSync('./ttf_fonts/test.ttf', Buffer.from(ttf.buffer));
    })
    .on('error', (err) => {
      console.error(err);
    });
}

generateFonts(files);
