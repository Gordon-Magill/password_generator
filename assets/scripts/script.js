// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Prompts to get user specification for password
// Used by generatePassword to ensure its output is consistent with user expectations
var getPasswordSpecs = function () {
  lowercaseChars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  uppercaseChars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  numericChars = ['1','2','3','4','5','6','7','8','9','0'];
  specChars = [' ','!','"','#','$','%','&',"'",'(',')','*','+','-','.','/',':',';','<','=','>','?','@','[','\\',']','^','_','`','{','|','}','~'];

  // For some reason this yields an array of numbers, and not the uppercase characters I was expecting...
  // uppercaseChars = [];
  // for (let letter in lowercaseChars) {
  //   uppercaseChars.push(letter.toUpperCase());
  // }

  // console.log(lowercaseChars);
  // console.log(uppercaseChars);
  // console.log(specChars);

  // User prompts to get desired password specification
  var lowerConfirm = confirm("Password Generator Specification 1 of 4:\nUse lowercase characters?");
  var upperConfirm = confirm("Password Generator Specification 2 of 4:\nUse uppercase characters?");
  var specConfirm = confirm("Password Generator Specification 3 of 4:\nUse special characters?");
  var numericConfirm = confirm("Password Generator Specification 4 of 4:\nUse numeric characters?");

  // Catch cases where no valid character sets were selected
  if (!lowerConfirm && !upperConfirm && !specConfirm && !numericConfirm) {
    alert('No valid character sets were selected, aborting');
    return {NaN, NaN};
  }

  // Get password length and verify user has submitted a number within bounds of 8-128
  // https://stackoverflow.com/questions/15047140/javascript-prompt-number-and-continue-prompting-if-answer-is-wrong
  do{
      var pwLength = parseInt(prompt("Password Generator Specification:\nPassword length? 8-128 characters only."), 10);
  } while (isNaN(pwLength) || pwLength > 128 || pwLength < 8);


  // Start with empty array of valid characters and add the character sets the user specified to it
  var usedChars = [];
  if (lowerConfirm) {
    usedChars = usedChars.concat(lowercaseChars);
  }
  if (upperConfirm) {
    usedChars = usedChars.concat(uppercaseChars);
  }
  if (specConfirm) {
    usedChars = usedChars.concat(specChars);
  }
  if (numericConfirm) {
    usedChars = usedChars.concat(numericChars);
  }

  // Return the password length and the valid characters to generate a password from
  return {pwLength, usedChars};

}

// Generates a password based on user defined criteria
function generatePassword() {

  // Function return object unpacking
  // https://www.javascripttutorial.net/javascript-return-multiple-values/
  let {pwLength, usedChars} = getPasswordSpecs();

  // Randomly add characters from the valid character set up to the defined password length
  var password = [];
  for (var i = 0; i<pwLength; i++) {
    password.push(usedChars[Math.floor(Math.random()*usedChars.length)]);
  }

  // Join the array of characters into a single string with no separators
  password = password.join("")

  return password;
}


