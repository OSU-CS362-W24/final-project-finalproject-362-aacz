//chart storage test file for chartStorage.js done by Zach Martin

require('jest-localstorage-mock');

const storage  = require('./chartStorage');
  
  describe('chartStorage', () => {
    beforeEach(() => {
      // Clears localStorage
      window.localStorage.clear();
    });
  
    // test('saves a chart', () => {
    //     const chart = { title: 'Test Chart', data: [1, 2, 3] };
    //     storage.saveChart(chart);
    //     const Carray = storage.loadSavedChart(0);
    //     expect(Carray.length).toEqual(1);
    //     // expect(JSON.parse(localStorage.getItem('savedCharts'))).toEqual([chart]);
    //   });

    test('saves a chart', function()  {
      const chart = { title: 'Test Chart', data: [1, 2, 3] };
      storage.saveChart(chart);
    
      // Check that the chart was saved to localStorage
      const savedCharts = JSON.parse(localStorage.getItem('savedCharts'));
      expect(savedCharts).toEqual([chart]);
    
      // Load the chart and check that it's not undefined
      const loadedChart = storage.loadSavedChart(0);
      expect(loadedChart).not.toBeUndefined();
    
      // If loadSavedChart is supposed to return a single chart, check that it matches the saved chart
      expect(loadedChart).toEqual(chart);
    });
  });

