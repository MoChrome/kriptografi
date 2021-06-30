const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  shift = document.getElementById("key_caesarcipher").value;

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

const input = document.querySelector("input");
const result = document.getElementById("result_cipher");

// const caesar = caesarCipher(plaintext, shift);
input.addEventListener("input", updateValue);
function updateValue(e) {
  result.textContent = caesarCipher(e.target.value, Number(shift));
  console.log(shift);
}
