// You can use f (ex: fdescribe or fit) to focus on a certain test.
// You can use x (ex: xdescribe or xit) to skip a certain test or group of tests.

describe(`${Person.name} Class`, () => {
    let model;
    let mockPersonService;

    beforeEach(() => {
        model = new Person();
    });

    describe('default values', () => {

        it('first name defaults to empty string', () => {
            /* arrange
            const data = { firstName: null };
            
            // act 
            const model = new Person(data);*/    // No need for this given we instantiate a new Person with beforeEach().
            
            // assert
            expect(model.firstName).toBe('');
            
        })
        
        it('last name defaults to empty string', () => {
            // assert
            expect(model.lastName).toBe('');
            
        })
        
        it('middle name defaults to empty string', () => {
            // assert
            expect(model.middleName).toBe('');
            
        })

    });

    describe('full name', () => {
        beforeEach(() => {
            model = new Person({
                firstName: 'Dylan',
                lastName: 'Israel'
            })
        });

        xit('middle initial when middle name is defined with first and last', () => {
            //arrange
            model.middleName = 'Christopher';

            //act
            const result = model.fullName

            //audit
            const {firstName: fn, lastName: ln, middleName: mn} = model

            //assert
            expect(result).toBe(`${fn} ${mn}. ${ln}`)
        });

        it('when NO middle name returns just first and last', () => {
            //arrange
            model.middleName = '';

            //act
            const result = model.fullName;

            //audit
            const {firstName: fn, lastName: ln} = model

            //assert
            expect(result).toBe(`${fn} ${ln}`);

        });

    });

    describe('say my name', () => {
        it('alerts the full name of user', () => {
            //Arrange
            model.firstName = 'Dylan';
            model.lastName = 'Israel';
            spyOn(window, 'alert');

            //Act
            model.sayMyName();

            //Assert
            expect(window.alert).toHaveBeenCalledWith(model.fullName);
        });
    });

    describe('get code name', () => {
        it('when confirmed is a coding / testing god', () => {
            //arrange
            spyOn(window, 'confirm').and.returnValue(true);

            //act
            const result = model.getCodeName();

            //assert
            expect(result).toBe('TESTING GOD!');
        });

        it('when not confirmed is just another scrub', () => {
            //arrange
            spyOn(window, 'confirm').and.returnValue(false);

            //act
            const result = model.getCodeName();

            //assert
            expect(result).toBe('NOT! Try again');
        });
    });

    describe('getMyFullUserData', () => {

        beforeEach(() => {
            const data = { firstName: 'Dylan', middleName: 'Christopher', lastName: 'Israel', id: 1 };
            mockPersonService = {
                lastId: null,
                user: {},
                getUserById(id) {
                    this.lastId = id;

                    return this.user;
                }
            };
            model = new Person(data, mockPersonService);
        });

        it('gets user data by id', async () => {
            //arrange
            mockPersonService.lastId = null;
            mockPersonService.user = {
                firstName: 'Dylan',
                middleName: 'Christopher',
                lastName: 'Israel',
                id: 1
            }

            //act
            const result = await model.getMyFullUserData();

            //assert
            expect(mockPersonService.lastId).toBe(1);
        });
    });
});