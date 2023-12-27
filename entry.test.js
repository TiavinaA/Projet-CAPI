const fInit = require('./fInit');

// Mock de la fonction initForm
jest.mock('./fInit', () => {
    return {
        initForm: jest.fn()
    };
});

describe('fInit function', () => {
    it('should call initForm', () => {
        fInit();

        // Vérifier si la fonction initForm a été appelée
        expect(fInit.initForm).toHaveBeenCalled();
    });
});
  