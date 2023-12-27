const valeurCarte = require('./jeu');
describe('valeurCarte function', () => {
        it('should parse currentCardId to an integer', () => {
        // Définir une valeur de test pour currentCardId
        const currentCardId = '42';

        // Appeler la fonction à tester
        const result = valeurCarte(currentCardId);

        // Vérifier si le résultat est un nombre entier
        expect(result).toEqual(expect.any(Number));

        // Vérifier si le résultat est égal à la valeur attendue (42 dans cet exemple)
        expect(result).toBe(42);
    });

})


