var express = require("express");
var router = express.Router();
const { exec, execSync, spawn } = require("child_process");

var ImageTracer = require("./javascript/imagetracer_v1.2.1");

var fs = require("fs");
var gracefulFs = require("graceful-fs");
gracefulFs.gracefulify(fs);

var svg2ttf = require("svg2ttf");

var svgicons2svgfont = require("svgicons2svgfont");

var fontStream = new svgicons2svgfont({
  fontName: "_FONT",
});

var PNG = require("pngjs").PNG;

var dir_name = "result/dm/test";
// var dir_name = +new Date()

var img_dir = `./${dir_name}`;
if (!fs.existsSync(img_dir)) {
  fs.mkdirSync(img_dir);
}

var svg_dir = "./svgs";
if (!fs.existsSync(svg_dir)) {
  fs.mkdirSync(svg_dir);
}

var svg_fonts_dir = "./svg_fonts";
if (!fs.existsSync(svg_fonts_dir)) {
  fs.mkdirSync(svg_fonts_dir);
}

var ttf_dir = "./ttf_fonts";
if (!fs.existsSync(ttf_dir)) {
  fs.mkdirSync(ttf_dir);
}

var files = fs.readdirSync(`./${dir_name}/`);

var option = {
  ltres: 1,
  qtres: 1,
  strokewidth: 0.5,
  pathomit: 8,
  blurradius: 0,
  blurdelta: 10,
};

option.pal = [
  { r: 0, g: 0, b: 0, a: 255 },
  { r: 255, g: 255, b: 255, a: 255 },
];
option.linefilter = true;

var app = function generate() {
  var sources = [];
  var fileName = [];

  for (var i = 0; i < files.length; i++) {
    sources[i] =
      files[i][0].charCodeAt(0).toString().toUpperCase();
    fileName[i] = files[i][0];
  }

  // png to svg
  for (var i = 0; i < fileName.length; i++) {
    var data = fs.readFileSync(
      __dirname + `/${dir_name}/` + fileName[i] + ".png"
    );

    var png = PNG.sync.read(data);

    var myImageData = { width: png.width, height: png.height, data: png.data };
    var options = {
      ltres: option.ltres,
      strokewidth: option.strokewidth,
      qtres: option.qtres,
      pathomit: option.pathomit,
      blurradius: option.blurradius,
      blurdelta: option.blurdelta,
    };

    options.pal = [
      { r: 0, g: 0, b: 0, a: 255 },
      { r: 255, g: 255, b: 255, a: 255 },
    ];
    options.linefilter = true;

    var svgstring = ImageTracer.imagedataToSVG(myImageData, options);

    fs.writeFileSync(`./svgs/` + fileName[i] + ".svg", svgstring);
  }

  fontStream
    .pipe(fs.createWriteStream(`./svg_fonts/font_ss.svg`))
    .on("finish", function () {
      var ttf = svg2ttf(
        fs.readFileSync(`./svg_fonts/font_ss.svg`, "utf8"),
        {}
      );
      fs.writeFileSync(
        `./ttf_fonts/${'test1'}.ttf`,
        new Buffer(ttf.buffer)
      );
    })
    .on("error", function (err) {
      console.log(err);
    });

  for (var i = 0; i < sources.length; i++) {
    let glyph1 = fs.createReadStream(
      `./svgs/` + fileName[i] + ".svg"
    );
    glyph1.metadata = {
      unicode: [String.fromCharCode(sources[i].toString(10))],
      name: "uni" + sources[i],
    };

    fontStream.write(glyph1);
  }
  fontStream.end();
};

app();
