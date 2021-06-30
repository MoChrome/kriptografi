const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  input = document.querySelector("input"),
  result = document.getElementById("result_cipher");

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
  plaintext = pesan.toLowerCase().replace(/[^a-z]/g, "");
  var key = parseInt(kunci);
  ciphertext = "";
  for (line = 0; line < key - 1; line++) {
    skip = 2 * (key - line - 1);
    j = 0;
    for (i = line; i < plaintext.length; ) {
      ciphertext += plaintext.charAt(i);
      if (line == 0 || j % 2 == 0) i += skip;
      else i += 2 * (key - 1) - skip;
      j++;
    }
  }
  for (i = line; i < plaintext.length; i += 2 * (key - 1))
    ciphertext += plaintext.charAt(i);
  return ciphertext;
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

input.addEventListener("input", updateValue);
function updateValue(e) {
  shift = document.getElementById("key_caesarcipher").value;
  kunci_railfence = document.getElementById("key_railfence").value;
  kunci_vigenere = document.getElementById("key_vigenere").value;
  result.textContent = Vigenere.encrypt(
    RailFenceEncrypt(
      caesarCipher(e.target.value, parseInt(shift)),
      kunci_railfence
    ),
    kunci_vigenere,
    true
  );
}
