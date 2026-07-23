const fs = require('fs');
const path = require('path');
const width = 320;
const height = 320;
const data = Buffer.alloc((width * 4 + 1) * height);
const bg = { r: 243, g: 224, b: 198, a: 255 };
const circle = { r: 77, g: 49, b: 32, a: 255 };
const ring = { r: 190, g: 150, b: 60, a: 255 };
for (let y = 0; y < height; y++) {
  const rowStart = y * (width * 4 + 1);
  data[rowStart] = 0;
  for (let x = 0; x < width; x++) {
    const dx = x - width / 2 + 0.5;
    const dy = y - height / 2 + 0.5;
    const dist = Math.sqrt(dx * dx + dy * dy);
    let color = bg;
    if (dist < 110) color = circle;
    else if (dist < 118) color = ring;
    const idx = rowStart + 1 + x * 4;
    data[idx] = color.r;
    data[idx + 1] = color.g;
    data[idx + 2] = color.b;
    data[idx + 3] = color.a;
  }
}
const zlib = require('zlib');
const deflated = zlib.deflateSync(data);
function crc32(buf) {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (const b of buf) {
    crc = (crc >>> 8) ^ table[(crc ^ b) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, buf) {
  const typeBuf = Buffer.from(type);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(buf.length, 0);
  const chunkData = Buffer.concat([typeBuf, buf]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(chunkData), 0);
  return Buffer.concat([len, chunkData, crc]);
}
const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0);
ihdr.writeUInt32BE(height, 4);
ihdr[8] = 8;
ihdr[9] = 6;
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;
const png = Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', deflated), chunk('IEND', Buffer.alloc(0))]);
fs.writeFileSync(path.join(__dirname, 'public', 'logo.png'), png);
console.log('public/logo.png created');
