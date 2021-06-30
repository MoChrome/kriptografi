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

input.addEventListener("input", updateValue);
function updateValue(e) {
  shift = document.getElementById("key_caesarcipher").value;
  kunci_railfence = document.getElementById("key_railfence").value;
  result.value = RailFenceEncrypt(
    caesarCipher(e.target.value, parseInt(shift)),
    kunci_railfence
  );
}
