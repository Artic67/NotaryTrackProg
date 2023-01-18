const hummus = require("hummus");
const path = require("path");

const pensionReportCoords = {
  quart: { x: 182, y: 709, pageNumber: 0, center: true },
  quartword: { x: 194, y: 709, pageNumber: 0 },
  yearEnding1: { x: 280, y: 709, pageNumber: 0 },
  scr1: { x: 334, y: 709, pageNumber: 0, center: true },
  scr2: { x: 388, y: 709, pageNumber: 0, center: true },
  fior: { x: 318, y: 628, pageNumber: 0, center: true },
  namer: { x: 318, y: 606, pageNumber: 0, center: true },
  pensfond: { x: 112, y: 582, pageNumber: 0 },
  innnum: { x: 367, y: 559, pageNumber: 0 },
  loc: { x: 318, y: 535, pageNumber: 0, center: true },
  tel: { x: 171, y: 494, pageNumber: 0 },

  "1q": { x: 445, y: 416, pageNumber: 0, center: true },
  "1y": { x: 540, y: 416, pageNumber: 0, center: true },
  1.1: { x: 445, y: 383, pageNumber: 0, center: true },
  1.2: { x: 445, y: 357, pageNumber: 0, center: true },
  1.3: { x: 445, y: 329, pageNumber: 0, center: true },
  "2q": { x: 445, y: 296, pageNumber: 0, center: true },
  "2y": { x: 540, y: 296, pageNumber: 0, center: true },
  2.1: { x: 445, y: 261, pageNumber: 0, center: true },
  2.2: { x: 445, y: 236, pageNumber: 0, center: true },
  2.3: { x: 445, y: 209, pageNumber: 0, center: true },
  "3.1q": { x: 445, y: 165, pageNumber: 0, center: true },
  "3.1y": { x: 540, y: 165, pageNumber: 0, center: true },
  "3.1.1": { x: 445, y: 117, pageNumber: 0, center: true },
  "3.1.2": { x: 445, y: 89, pageNumber: 0, center: true },

  "3.1.3": { x: 445, y: 775, pageNumber: 1, center: true },
  "3.2q": { x: 445, y: 756, pageNumber: 1, center: true },
  "3.2y": { x: 540, y: 756, pageNumber: 1, center: true },
  "3.2.1": { x: 445, y: 726, pageNumber: 1, center: true },
  "3.2.2": { x: 445, y: 701, pageNumber: 1, center: true },
  "3.2.3": { x: 445, y: 673, pageNumber: 1, center: true },
  "3.3q": { x: 445, y: 645, pageNumber: 1, center: true },
  "3.3y": { x: 540, y: 645, pageNumber: 1, center: true },
  "3.3.1": { x: 445, y: 620, pageNumber: 1, center: true },
  "3.3.2": { x: 445, y: 593, pageNumber: 1, center: true },
  "3.3.3": { x: 445, y: 566, pageNumber: 1, center: true },
  "4.1q": { x: 445, y: 518, pageNumber: 1, center: true },
  "4.1y": { x: 540, y: 518, pageNumber: 1, center: true },
  "4.1.1": { x: 445, y: 474, pageNumber: 1, center: true },
  "4.1.2": { x: 445, y: 447, pageNumber: 1, center: true },
  "4.1.3": { x: 445, y: 418, pageNumber: 1, center: true },
  "4.2q": { x: 445, y: 371, pageNumber: 1, center: true },
  "4.2y": { x: 540, y: 371, pageNumber: 1, center: true },
  "4.2.1": { x: 445, y: 329, pageNumber: 1, center: true },
  "4.2.2": { x: 445, y: 300, pageNumber: 1, center: true },
  "4.2.3": { x: 445, y: 275, pageNumber: 1, center: true },
  "4.3q": { x: 445, y: 225, pageNumber: 1, center: true },
  "4.3y": { x: 540, y: 225, pageNumber: 1, center: true },
  "4.3.1": { x: 445, y: 183, pageNumber: 1, center: true },
  "4.3.2": { x: 445, y: 155, pageNumber: 1, center: true },
  "4.3.3": { x: 445, y: 128, pageNumber: 1, center: true },
  "5q": { x: 445, y: 87, pageNumber: 1, center: true },
  "5y": { x: 540, y: 87, pageNumber: 1, center: true },
  x1: { x: 540, y: 620, pageNumber: 1, center: true },
  x2: { x: 540, y: 593, pageNumber: 1, center: true },
  x3: { x: 540, y: 566, pageNumber: 1, center: true },
  x4: { x: 540, y: 330, pageNumber: 1, center: true },
  x5: { x: 540, y: 300, pageNumber: 1, center: true },
  x6: { x: 540, y: 275, pageNumber: 1, center: true },
  x7: { x: 540, y: 185, pageNumber: 1, center: true },
  x8: { x: 540, y: 155, pageNumber: 1, center: true },
  x9: { x: 540, y: 128, pageNumber: 1, center: true },

  5.1: { x: 445, y: 767, pageNumber: 2, center: true },
  5.2: { x: 445, y: 741, pageNumber: 2, center: true },
  5.3: { x: 445, y: 713, pageNumber: 2, center: true },
  "6q": { x: 445, y: 680, pageNumber: 2, center: true },
  "6y": { x: 540, y: 680, pageNumber: 2, center: true },
  6.1: { x: 445, y: 646, pageNumber: 2, center: true },
  6.2: { x: 445, y: 619, pageNumber: 2, center: true },
  6.3: { x: 445, y: 593, pageNumber: 2, center: true },
  x10: { x: 540, y: 645, pageNumber: 2, center: true },
  x11: { x: 540, y: 619, pageNumber: 2, center: true },
  x12: { x: 540, y: 593, pageNumber: 2, center: true },

  fio: { x: 478, y: 504, pageNumber: 2, center: true },

  scr3: { x: 108, y: 480, pageNumber: 2, center: true },

  day: { x: 70, y: 430, pageNumber: 2, center: true },
  month: { x: 112, y: 430, pageNumber: 2, center: true },
  yearEnding2: { x: 167, y: 430, pageNumber: 2, center: true },
};

const quartReportCoords = {
  quart: { x: 251, y: 746, pageNumber: 0, center: true },
  year: { x: 321, y: 746, pageNumber: 0, center: true },
  name: { x: 132, y: 680, pageNumber: 0, fontSize: 10 },
  loc: { x: 160, y: 653, pageNumber: 0 },
  1: { x: 444, y: 398, pageNumber: 0, center: true },
  1.1: { x: 444, y: 367, pageNumber: 0, center: true },
  "1.1.1": { x: 444, y: 349, pageNumber: 0, center: true },
  "1.1.2": { x: 444, y: 332, pageNumber: 0, center: true },
  1.2: { x: 444, y: 314, pageNumber: 0, center: true },
  "1.2.1": { x: 444, y: 296, pageNumber: 0, center: true },
  "1.2.2": { x: 444, y: 278, pageNumber: 0, center: true },
  1.3: { x: 444, y: 261, pageNumber: 0, center: true },
  "1.3.1": { x: 444, y: 243, pageNumber: 0, center: true },
  "1.3.2": { x: 444, y: 226, pageNumber: 0, center: true },
  1.4: { x: 444, y: 208, pageNumber: 0, center: true },
  1.5: { x: 444, y: 190, pageNumber: 0, center: true },
  1.6: { x: 444, y: 174, pageNumber: 0, center: true },
  1.7: { x: 444, y: 156, pageNumber: 0, center: true },
  2: { x: 444, y: 126, pageNumber: 0, center: true },
  2.1: { x: 444, y: 92, pageNumber: 0, center: true },
  2.2: { x: 444, y: 74, pageNumber: 0, center: true },

  2.3: { x: 444, y: 773, pageNumber: 1, center: true },
  2.4: { x: 444, y: 749, pageNumber: 1, center: true },
  3: { x: 444, y: 712, pageNumber: 1, center: true },
  3.1: { x: 444, y: 659, pageNumber: 1, center: true },
  3.2: { x: 444, y: 613, pageNumber: 1, center: true },
  4: { x: 444, y: 582, pageNumber: 1, center: true },

  fio: { x: 462, y: 502, pageNumber: 1, center: true },
};

const yearReportCoords = {
  year: { x: 297, y: 508, pageNumber: 0 },
  name: { x: 135, y: 190, pageNumber: 0, fontSize: 10 },
  loc: { x: 165, y: 160, pageNumber: 0 },

  1: { x: 468, y: 693, pageNumber: 1, center: true },
  2: { x: 468, y: 661, pageNumber: 1, center: true },
  3: { x: 468, y: 637, pageNumber: 1, center: true },
  4: { x: 468, y: 598, pageNumber: 1, center: true },
  5: { x: 468, y: 558, pageNumber: 1, center: true },
  6: { x: 468, y: 526, pageNumber: 1, center: true },
  6.1: { x: 468, y: 501, pageNumber: 1, center: true },
  "6.1.1": { x: 468, y: 483, pageNumber: 1, center: true },
  "6.1.2": { x: 468, y: 464, pageNumber: 1, center: true },
  6.2: { x: 468, y: 446, pageNumber: 1, center: true },
  "6.2.1": { x: 468, y: 427, pageNumber: 1, center: true },
  "6.2.2": { x: 468, y: 409, pageNumber: 1, center: true },
  6.3: { x: 468, y: 391, pageNumber: 1, center: true },
  "6.3.1": { x: 468, y: 372, pageNumber: 1, center: true },
  "6.3.2": { x: 468, y: 354, pageNumber: 1, center: true },
  6.4: { x: 468, y: 336, pageNumber: 1, center: true },
  6.5: { x: 468, y: 318, pageNumber: 1, center: true },
  6.6: { x: 468, y: 299, pageNumber: 1, center: true },
  6.7: { x: 468, y: 268, pageNumber: 1, center: true },
  7: { x: 468, y: 221, pageNumber: 1, center: true },
  7.1: { x: 468, y: 188, pageNumber: 1, center: true },
  7.2: { x: 468, y: 170, pageNumber: 1, center: true },
  7.3: { x: 468, y: 151, pageNumber: 1, center: true },
  8: { x: 468, y: 111, pageNumber: 1, center: true },

  9: { x: 468, y: 761, pageNumber: 2, center: true },
  10: { x: 468, y: 729, pageNumber: 2, center: true },
  11: { x: 468, y: 697, pageNumber: 2, center: true },
  11.1: { x: 468, y: 671, pageNumber: 2, center: true },
  11.2: { x: 468, y: 653, pageNumber: 2, center: true },
  11.3: { x: 468, y: 634, pageNumber: 2, center: true },
  12: { x: 468, y: 610, pageNumber: 2, center: true },
  12.1: { x: 468, y: 584, pageNumber: 2, center: true },
  12.2: { x: 468, y: 566, pageNumber: 2, center: true },
  13: { x: 468, y: 547, pageNumber: 2, center: true },
  14: { x: 468, y: 523, pageNumber: 2, center: true },
  14.1: { x: 468, y: 497, pageNumber: 2, center: true },
  14.2: { x: 468, y: 465, pageNumber: 2, center: true },
  14.3: { x: 468, y: 433, pageNumber: 2, center: true },
  14.4: { x: 468, y: 415, pageNumber: 2, center: true },
  15: { x: 468, y: 390, pageNumber: 2, center: true },
  15.1: { x: 468, y: 364, pageNumber: 2, center: true },
  15.2: { x: 468, y: 345, pageNumber: 2, center: true },
  16: { x: 468, y: 320, pageNumber: 2, center: true },
  17: { x: 468, y: 288, pageNumber: 2, center: true },
  18: { x: 468, y: 263, pageNumber: 2, center: true },
  19: { x: 468, y: 245, pageNumber: 2, center: true },
  20: { x: 468, y: 220, pageNumber: 2, center: true },
  20.1: { x: 468, y: 194, pageNumber: 2, center: true },
  20.2: { x: 468, y: 176, pageNumber: 2, center: true },
  20.3: { x: 468, y: 158, pageNumber: 2, center: true },
  21: { x: 468, y: 139, pageNumber: 2, center: true },
  22: { x: 468, y: 109, pageNumber: 2, center: true },

  23: { x: 468, y: 767, pageNumber: 3, center: true },
  24: { x: 468, y: 742, pageNumber: 3, center: true },
  24.1: { x: 468, y: 716, pageNumber: 3, center: true },
  24.2: { x: 468, y: 698, pageNumber: 3, center: true },
  25: { x: 468, y: 667, pageNumber: 3, center: true },
  26: { x: 468, y: 627, pageNumber: 3, center: true },
  26.1: { x: 468, y: 601, pageNumber: 3, center: true },
  26.2: { x: 468, y: 577, pageNumber: 3, center: true },
  26.3: { x: 468, y: 551, pageNumber: 3, center: true },
  27: { x: 468, y: 520, pageNumber: 3, center: true },
  28: { x: 468, y: 473, pageNumber: 3, center: true },
  29: { x: 468, y: 435, pageNumber: 3, center: true },
  30: { x: 468, y: 403, pageNumber: 3, center: true },
  31: { x: 468, y: 377, pageNumber: 3, center: true },
  32: { x: 468, y: 359, pageNumber: 3, center: true },
  33: { x: 468, y: 341, pageNumber: 3, center: true },
  34: { x: 468, y: 322, pageNumber: 3, center: true },
  35: { x: 468, y: 297, pageNumber: 3, center: true },
  36: { x: 468, y: 264, pageNumber: 3, center: true },
  37: { x: 468, y: 233, pageNumber: 3, center: true },
  38: { x: 468, y: 200, pageNumber: 3, center: true },
  39: { x: 468, y: 176, pageNumber: 3, center: true },
  40: { x: 468, y: 144, pageNumber: 3, center: true },
  41: { x: 468, y: 104, pageNumber: 3, center: true },
  42: { x: 468, y: 79, pageNumber: 3, center: true },

  43: { x: 468, y: 767, pageNumber: 4, center: true },
  44: { x: 468, y: 742, pageNumber: 4, center: true },
  45: { x: 468, y: 710, pageNumber: 4, center: true },
  46: { x: 468, y: 677, pageNumber: 4, center: true },

  fio: { x: 408, y: 514, pageNumber: 4 },
  performer: { x: 127, y: 474, pageNumber: 4 },
  tel: { x: 103, y: 447, pageNumber: 4 },
  email: { x: 403, y: 447, pageNumber: 4 },
};

const coords = {
  "zvit_year.pdf": yearReportCoords,
  "zvit_quar.pdf": quartReportCoords,
  "zvit_pens.pdf": pensionReportCoords,
};

const pagesCount = {
  "zvit_year.pdf": 5,
  "zvit_quar.pdf": 2,
  "zvit_pens.pdf": 3,
};

export function writePDF(obj, folderToSave, filename, sourcefile) {
  console.log(path.resolve(__dirname, `pdf/${sourcefile}`));
  let pdfWriter = hummus.createWriterToModify(
    path.resolve(__dirname, `pdf/${sourcefile}`),
    {
      modifiedFilePath: folderToSave + `/${filename}.pdf`,
    }
  );

  let font = pdfWriter.getFontForFile(__dirname + "/fonts/times-new-roman.ttf");

  for (let i = 0; i < pagesCount[sourcefile]; i++) {
    let pageModifier = new hummus.PDFPageModifier(pdfWriter, i);

    let context = pageModifier.startContext();

    for (let key in obj) {
      //console.log(coords[sourcefile]);
      //console.log(key);
      if (coords[sourcefile][key]["pageNumber"] == i) {
        let size = coords[sourcefile][key]["fontSize"] || 12;

        console.log(obj[key]);

        let length = 0;

        if (coords[sourcefile][key]["center"])
          length = font.calculateTextDimensions(obj[key], size).width;

        console.log(font.calculateTextDimensions(obj[key], size).width);

        context
          .getContext()
          .writeText(
            obj[key],
            coords[sourcefile][key]["x"] - length / 2,
            coords[sourcefile][key]["y"],
            { font: font, size: size, color: 0x00 }
          );

        console.log("Added:" + key);
      }
    }

    pageModifier.endContext().writePage();
  }

  pdfWriter.end();
  return true;
}
