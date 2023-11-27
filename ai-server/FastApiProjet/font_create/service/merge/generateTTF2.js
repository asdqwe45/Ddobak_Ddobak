const fs = require('fs');
const gracefulFs = require('graceful-fs');
const {PNG} = require('pngjs');
const ImageTracer = require("../public/javascript/imagetracer_v1.2.1");
const svg2ttf = require("svg2ttf");
const svgicons2svgfont = require("svgicons2svgfont");

gracefulFs.gracefulify(fs);

const fontName = process.argv[2]; // 첫 번째 인자: 폰트 이름
const pngFolder = process.argv[3]; // 두 번째 인자: PNG 폴더 위치
const outputFolder = process.argv[4]; // 세 번째 인자: 생성 위치


// 설정된 옵션
const option = {
    ltres: 1,
    qtres: 1,
    strokewidth: 0.5,
    pathomit: 8,
    blurradius: 0,
    blurdelta: 10,
    pal: [
        {r: 0, g: 0, b: 0, a: 255},
        {r: 255, g: 255, b: 255, a: 255},
    ],
    linefilter: true
};

const directories = [`${outputFolder}/${fontName}/svgs`, `${outputFolder}/${fontName}/svg_fonts`, `${outputFolder}/${fontName}`];
directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }
});
// 파일 처리
const files = fs.readdirSync(pngFolder);


// 메인 함수
function generateFonts(files) {
    const fontStream = new svgicons2svgfont({fontName: fontName});
    setupFontStream(fontStream);

    files.forEach(file => {
        if (file.endsWith('.png')) {
            const fileName = file.split('.png')[0];
            processImage(`${outputFolder}/${fontName}/${file}`, fileName);
            addGlyphToFontStream(`${outputFolder}/${fontName}/svgs/${fileName}.svg`, fileName, fontStream);
        }
    });

    fontStream.end();
}

// 이미지 처리 및 SVG 변환
function processImage(filePath, fileName) {
    const data = fs.readFileSync(filePath);
    const png = PNG.sync.read(data);
    const myImageData = {width: png.width, height: png.height, data: png.data};
    const svgstring = ImageTracer.imagedataToSVG(myImageData, option);
    fs.writeFileSync(`${outputFolder}/${fontName}/svgs/${fileName}.svg`, svgstring); // 수정된 경로
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
        .pipe(fs.createWriteStream(`${outputFolder}/${fontName}/svg_fonts/font_ss.svg`))
        .on('finish', () => {
            const ttf = svg2ttf(fs.readFileSync(`${outputFolder}/${fontName}/svg_fonts/font_ss.svg`, 'utf8'), {});
            const ttfFileName = `${fontName}.ttf`;
            fs.writeFileSync(`${outputFolder}/${ttfFileName}`, Buffer.from(ttf.buffer));
            // .ttf 파일 생성 후 png 폴더와 svg 폴더를 삭제
            // 생성된 .ttf 파일의 이름을 stdout으로 출력합니다.
            console.log(ttfFileName);
        })
        .on('error', (err) => {
            console.error(err);
        });
}

// 폴더 삭제 함수

generateFonts(files);
