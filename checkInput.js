const checkuserInput = {

    isValidUsername : function(input) {
        console.log(input);
        console.log(input.length);
        if(input.length < 6){
            return false;
        }
        return true;
    },

    isValidPassword : function(input) { // minimum 8 caractères et pas uniquement lettres
        if(input.length < 8){
            return false;
        }
        let alpha = /^([a-zA-Z ]+)$/;
        return !input.match(alpha);
    },

    isValidEmail : function(input) {
        // variable symbols trouvés sur internet "vérifier-une-adresse-email-en-js"
        let symbols = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
        return symbols.test(input);
    }

}

module.exports = {
    checkUserInput: checkuserInput
}