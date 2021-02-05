// Source:https://github.com/styled-components/styled-components/blob/b19d17f1d6739d0cc6da826cf701a9ee3c075525/packages/benchmarks/src/implementations/styled-components-v4/styled-components-v4.esm.js#L1459
// Or:https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
const murmurhash = (c: string) => {
  for (var e = c.length | 0, a = e | 0, d = 0, b; e >= 4; ) {
    (b =
      (c.charCodeAt(d) & 255) |
      ((c.charCodeAt(++d) & 255) << 8) |
      ((c.charCodeAt(++d) & 255) << 16) |
      ((c.charCodeAt(++d) & 255) << 24)),
      (b =
        1540483477 * (b & 65535) + (((1540483477 * (b >>> 16)) & 65535) << 16)),
      (b ^= b >>> 24),
      (b =
        1540483477 * (b & 65535) + (((1540483477 * (b >>> 16)) & 65535) << 16)),
      (a =
        (1540483477 * (a & 65535) +
          (((1540483477 * (a >>> 16)) & 65535) << 16)) ^
        b),
      (e -= 4),
      ++d;
  }
  switch (e) {
    case 3:
      a ^= (c.charCodeAt(d + 2) & 255) << 16;
    case 2:
      a ^= (c.charCodeAt(d + 1) & 255) << 8;
    case 1:
      (a ^= c.charCodeAt(d) & 255),
        (a =
          1540483477 * (a & 65535) +
          (((1540483477 * (a >>> 16)) & 65535) << 16));
  }
  a ^= a >>> 13;
  a = 1540483477 * (a & 65535) + (((1540483477 * (a >>> 16)) & 65535) << 16);
  return (a ^ (a >>> 15)) >>> 0;
};

export default murmurhash;
