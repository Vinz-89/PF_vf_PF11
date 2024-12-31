const {checkUserInput} = require('./checkInput');

describe("validation du nom d'utilisateur", () => {

    test("un nom d'utilisateur vide est invalide", () => {
        let username = '';
        expect(checkUserInput.isValidUsername(username)).toBe(false);
    });

    test("un nom d'utilisateur avec moins de six caractères est invalide", () => {
        let username = 'user';
        expect(checkUserInput.isValidUsername(username)).toBe(false);
    });

    test("un nom d'utilisateur de six caractères ou plus est valide", () => {
        let username = "user123";
        expect(checkUserInput.isValidUsername(username)).toBe(true);
    })
});

describe("validation du mot de passe", () => {
    
    test("un mot de passe de moins de moins de 8 caractères est invalide", () => {
        let password = "a2B4c6D";
        expect(checkUserInput.isValidPassword(password)).toBe(false);
    });

    test("un mot de passe composé uniquement de lettres est invalide", () => {
        let password = "abcDeFGhIj";
        expect(checkUserInput.isValidPassword(password)).toBe(false);
    });

    test("un mot de passe de plus de 8 caractères ou plus et pas uniquement des lettres est valide", () => {
        let password = "ab1Cde2F";
        expect(checkUserInput.isValidPassword(password)).toBe(true);
    })
});

describe("Validationd de l'adresse email", () => {

    test("un email sans '@' est invalide", () => {
        let email = "user.example.invalide.com";
        expect(checkUserInput.isValidEmail(email)).toBe(false);
    });

    test("un e-mail avec une '@' est valide", () => {
        let email = "user@exemple.valide.com";
        expect(checkUserInput.isValidEmail(email)).toBe(true);
    });
})
