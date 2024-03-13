//test file for sortPoints.js done by Zach Martin 


const sort = require('./sortPoints');

test('Sort points sorts in ascending order with 1 and 2', function () {
    //arrange
    const points = [{ x: 2, y: 13 }, { x: 1, y: 10 }];

    //act 
    sort(points);

    //assert
    expect(points).toEqual([{ x: 1, y: 10 }, { x: 2, y: 13 }]);

});

test('Sort points sorts in ascending order with 1, 2, and 3', function () {
    //arrange
    const points = [{ x: 3, y: 13 }, { x: 1, y: 10 }, { x: 2, y: 11 }];

    //act 
    sort(points);

    //assert
    expect(points).toEqual([{ x: 1, y: 10 }, { x: 2, y: 11 }, { x: 3, y: 13 }]);

});

test('Sort points sorts in ascending order with at least 8 points that are 0 - 100', function() {
    //arrange
    const points = [{ x: 3, y: 13 }, { x: 1, y: 10 }, { x: 2, y: 11 }, { x: 0, y: 0 }, { x: 100, y: 100 }, { x: 50, y: 50 }, { x: 25, y: 25 }, { x: 75, y: 75 }];

    //act
    sort(points);

    //assert
    expect(points).toEqual([{ x: 0, y: 0 }, { x: 1, y: 10 }, { x: 2, y: 11 }, { x: 3, y: 13 }, { x: 25, y: 25 }, { x: 50, y: 50 }, { x: 75, y: 75 }, { x: 100, y: 100 }]);
});

test('Sort points sorts in ascending order with -2 and -1', function () {
    //arrange
    const points = [{ x: -1, y: 13 }, { x: -2, y: 10 }];

    //act 
    sort(points);

    //assert
    expect(points).toEqual([{ x: -2, y: 10 }, { x: -1, y: 13 }]);
});

test('Sort points sorts in ascending order with -3, -2, and -1', function () {
    //arrange
    const points = [{ x: -1, y: 13 }, { x: -3, y: 10 }, { x: -2, y: 11 }];

    //act 
    sort(points);

    //assert
    expect(points).toEqual([{ x: -3, y: 10 }, { x: -2, y: 11 }, { x: -1, y: 13 }]);
});

test('Sort points sorts in ascending order with at least 8 points that are -100 to 0', function() {
    //arrange
    const points = [{ x: -3, y: 13 }, { x: -1, y: 10 }, { x: -2, y: 11 }, { x: 0, y: 0 }, { x: -100, y: 100 }, { x: -50, y: 50 }, { x: -25, y: 25 }, { x: -75, y: 75 }];

    //act
    sort(points);

    //assert
    expect(points).toEqual([{ x: -100, y: 100 }, { x: -75, y: 75 }, { x: -50, y: 50 }, { x: -25, y: 25 }, { x: -3, y: 13 }, { x: -2, y: 11 }, { x: -1, y: 10 }, { x: 0, y: 0 }]);
});