const showGeneratedPassword = document.getElementById("show-generated-password")
const copyGeneratedPassword = document.getElementById("copy-generated-password")
const message = document.getElementById("message")
const generatedPasswordOutput = document.getElementById("generated-password-output")
const passwordInputRange = document.getElementById("password-input-range")
const generatePasswordButton = document.getElementById("generate-password-button")

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";

const generatePassword = () => {
    let password = "";
    const random = new Uint32Array(1);
    const limit = Math.floor(2 ** 32 /characters.length) * characters.length;

    for(let i = 0; i < Number(passwordInputRange.value); i++){
        do{
        crypto.getRandomValues(random)
    } while(random[0] > limit)
    password += characters[random[0] % characters.length]
    }

    showGeneratedPassword.value = password
};

const generatedPasswordFromRange = () => {
    generatedPasswordOutput.textContent = passwordInputRange.value
    generatePassword()
}

const copyPassword = () => {
    navigator.clipboard.writeText(showGeneratedPassword.value)
    
    copyGeneratedPassword.textContent = "Copied";
    message.textContent = "Password copied to clipboard.";

    setTimeout(()=> {
    copyGeneratedPassword.textContent = "Copy";
    message.textContent = "Uses letters, numbers, and symbols.";
    },1500)
}

copyGeneratedPassword.addEventListener("click", copyPassword)
passwordInputRange.addEventListener("input", generatedPasswordFromRange)
generatePasswordButton.addEventListener("click", generatePassword)

generatePassword();