const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  plaintext = document.getElementById("plaintext"),
  ciphertext = document.getElementById("ciphertext");

function caesarCipher(message, shift) {
  var output = "";

  message = message.toUpperCase();

  while (shift < 0) {
    shift += 26;
  }

  for (var i in message) {
    var c = message[i],
      index = alpha.indexOf(c);

    if (index >= 0) {
      var shiftLetter = alpha[(index + shift) % 26];
      output += shiftLetter;
    } else {
      output += c;
    }
  }
  return output;
}

function RailFenceEncrypt(pesan, kunci) {
  plain = pesan.toLowerCase().replace(/[^a-z]/g, "");
  var key = parseInt(kunci);
  cipher = "";
  for (line = 0; line < key - 1; line++) {
    skip = 2 * (key - line - 1);
    j = 0;
    for (i = line; i < plain.length; ) {
      cipher += plain.charAt(i);
      if (line == 0 || j % 2 == 0) i += skip;
      else i += 2 * (key - 1) - skip;
      j++;
    }
  }
  for (i = line; i < plain.length; i += 2 * (key - 1))
    cipher += plain.charAt(i);
  return cipher;
}

var Vigenere = (function () {
  var AcharCode = "A".charCodeAt(0);
  var ZcharCode = "Z".charCodeAt(0);
  var AZlen = ZcharCode - AcharCode + 1;

  function encrypt(text, key, reverse, keepspaces) {
    var plaintext = keepspaces ? text : text.replace(/\s+/g, "");
    var messageLen = plaintext.length;
    var keyLen = key.length;
    var enctext = "";
    var encriptionDir = reverse ? -1 * AZlen : 0;

    for (var i = 0; i < messageLen; i++) {
      var plainLetter = plaintext.charAt(i).toUpperCase();
      if (plainLetter.match(/\s/)) {
        enctext += plainLetter;
        continue;
      }

      var keyLetter = key.charAt(i % keyLen).toUpperCase();
      var vigenereOffset = keyLetter.charCodeAt(0) - AcharCode;
      var encLetterOffset =
        (plainLetter.charCodeAt(0) -
          AcharCode +
          Math.abs(encriptionDir + vigenereOffset)) %
        AZlen;

      enctext += String.fromCharCode(AcharCode + encLetterOffset);
    }

    return enctext;
  }

  return {
    encrypt: function (text, key, keepspaces) {
      return encrypt(text, key, false, keepspaces);
    },

    decrypt: function (text, key, keepspaces) {
      return encrypt(text, key, true, keepspaces);
    },
  };
})();

plaintext.addEventListener("input", updateValue);
function updateValue(e) {
  shift = document.getElementById("key_caesarcipher").value;
  kunci_railfence = document.getElementById("key_railfence").value;
  kunci_vigenere = document.getElementById("key_vigenere").value;
  ciphertext.value = Vigenere.encrypt(
    RailFenceEncrypt(
      caesarCipher(e.target.value, parseInt(shift)),
      parseInt(kunci_railfence)
    ),
    kunci_vigenere,
    true
  );
}

function RailFenceDecrypt(pesan, kunci) {
  cipher = pesan.toLowerCase().replace(/[^a-z]/g, "");
  var key = parseInt(kunci);
  pt = new Array(cipher.length);
  k = 0;
  for (line = 0; line < key - 1; line++) {
    skip = 2 * (key - line - 1);
    j = 0;
    for (i = line; i < cipher.length; ) {
      pt[i] = cipher.charAt(k++);
      if (line == 0 || j % 2 == 0) i += skip;
      else i += 2 * (key - 1) - skip;
      j++;
    }
  }
  for (i = line; i < cipher.length; i += 2 * (key - 1))
    pt[i] = cipher.charAt(k++);
  return pt.join("");
}

function caesarCipherDecrypt(message, shift) {
  var output = "";

  message = message.toUpperCase();

  while (shift > 0) {
    shift -= 26;
  }

  for (var i in message) {
    var c = message[i],
      index = alpha.indexOf(c);

    if (index >= 0) {
      var shiftLetter = alpha[(index - shift) % 26];
      output += shiftLetter;
    } else {
      output += c;
    }
  }
  return output;
}

ciphertext.addEventListener("input", update);
function update(e) {
  shift = document.getElementById("key_caesarcipher").value;
  kunci_railfence = document.getElementById("key_railfence").value;
  kunci_vigenere = document.getElementById("key_vigenere").value;
  plaintext.value = caesarCipherDecrypt(
    RailFenceDecrypt(
      Vigenere.decrypt(e.target.value, kunci_vigenere, true),
      parseInt(kunci_railfence)
    ),
    parseInt(shift)
  );
}
