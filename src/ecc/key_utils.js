const base58 = require("bs58");
const assert = require("assert");
const randomBytes = require("randombytes");

const hash = require("./hash");

module.exports = {
  random32ByteBuffer,
  addEntropy,
  cpuEntropy,
  entropyCount: () => entropyCount,
  checkDecode,
  checkEncode
};

let entropyPos = 0, entropyCount = 0;

const externalEntropyArray = randomBytes(101);

function random32ByteBuffer ({ cpuEntropyBits = 0, safe = true } = {}) {
  assert(typeof cpuEntropyBits, "number", "cpuEntropyBits");
  assert(typeof safe, "boolean", "boolean");

  if (safe) {
    assert(entropyCount >= 128, "Call initialize() to add entropy");
  }
  const hash_array = [];
  hash_array.push(randomBytes(32));
  hash_array.push(Buffer.from(cpuEntropy(cpuEntropyBits)));
  hash_array.push(externalEntropyArray);
  hash_array.push(browserEntropy());
  return hash.sha256(Buffer.concat(hash_array));
}

function addEntropy (...ints) {
  assert.equal(externalEntropyArray.length, 101, "externalEntropyArray");

  entropyCount += ints.length;
  for (const i of ints) {
    const pos = entropyPos++ % 101;
    const i2 = externalEntropyArray[pos] += i;
    if (i2 > 9007199254740991)
      externalEntropyArray[pos] = 0;
  }
}

function cpuEntropy (cpuEntropyBits = 128) {
  let collected = [];
  let lastCount = null;
  let lowEntropySamples = 0;
  while (collected.length < cpuEntropyBits) {
    const count = floatingPointCount();
    if (lastCount != null) {
      const delta = count - lastCount;
      if (Math.abs(delta) < 1) {
        lowEntropySamples++;
        continue;
      }
      // how many bits of entropy were in this sample
      const bits = Math.floor(log2(Math.abs(delta)) + 1);
      if (bits < 4) {
        if (bits < 2) {
          lowEntropySamples++;
        }
        continue;
      }
      collected.push(delta);
    }
    lastCount = count;
  }
  if (lowEntropySamples > 10) {
    const pct = Number(lowEntropySamples / cpuEntropyBits * 100).toFixed(2);
    // Is this algorithm getting inefficient?
    console.warn(`WARN: ${pct}% low CPU entropy re-sampled`);
  }
  return collected;
}

function floatingPointCount () {
  const workMinMs = 7;
  const d = Date.now();
  let i = 0, x = 0;
  while (Date.now() < d + workMinMs + 1) {
    x = Math.sin(Math.sqrt(Math.log(++i + x)));
  }
  return i;
}

const log2 = x => Math.log(x) / Math.LN2;

function browserEntropy () {
  let entropyStr = Array(randomBytes(101)).join();
  try {
    entropyStr += (new Date()).toString() + " " + window.screen.height + " " + window.screen.width + " " +
      window.screen.colorDepth + " " + " " + window.screen.availHeight + " " + window.screen.availWidth + " " +
      window.screen.pixelDepth + navigator.language + " " + window.location + " " + window.history.length;

    for (let i = 0, mimeType; i < navigator.mimeTypes.length; i++) {
      mimeType = navigator.mimeTypes[i];
      entropyStr += mimeType.description + " " + mimeType.type + " " + mimeType.suffixes + " ";
    }
  } catch (error) {
    //nodejs:ReferenceError: window is not defined
    entropyStr += hash.sha256((new Date()).toString());
  }

  const b = new Buffer(entropyStr);
  entropyStr += b.toString("binary") + " " + (new Date()).toString();

  let entropy = entropyStr;
  const start_t = Date.now();
  while (Date.now() - start_t < 25)
    entropy = hash.sha256(entropy);

  return entropy;
}

function checkEncode (keyBuffer, keyType = null) {
  assert(Buffer.isBuffer(keyBuffer), "expecting keyBuffer<Buffer>");
  if (keyType === "sha256x2") { // legacy
    const checksum = hash.sha256(hash.sha256(keyBuffer)).slice(0, 4);
    return base58.encode(Buffer.concat([keyBuffer, checksum]));
  } else {
    const check = [keyBuffer];
    if (keyType) {
      check.push(Buffer.from(keyType));
    }
    const checksum = hash.ripemd160(Buffer.concat(check)).slice(0, 4);
    return base58.encode(Buffer.concat([keyBuffer, checksum]));
  }
}

function checkDecode (keyString, keyType = null) {
  assert(keyString != null, "private key expected");
  const buffer = new Buffer(base58.decode(keyString));
  const checksum = buffer.slice(-4);
  const key = buffer.slice(0, -4);

  let newCheck;
  if (keyType === "sha256x2") { // legacy
    newCheck = hash.sha256(hash.sha256(key)).slice(0, 4); // WIF (legacy)
  } else {
    const check = [key];
    if (keyType) {
      check.push(Buffer.from(keyType));
    }
    newCheck = hash.ripemd160(Buffer.concat(check)).slice(0, 4); //PVT
  }

  if (checksum.toString() !== newCheck.toString()) {
    throw new Error("Invalid checksum, " +
      `${checksum.toString("hex")} != ${newCheck.toString("hex")}`
    );
  }

  return key;
}
