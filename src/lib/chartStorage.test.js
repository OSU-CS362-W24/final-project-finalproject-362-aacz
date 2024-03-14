//chart storage test file for chartStorage.js done by Zach Martin

require('jest-localstorage-mock');

const storage  = require('./chartStorage');
  
  describe('chartStorage', () => {
    beforeEach(() => {
      // Clears localStorage
      window.localStorage.clear();
    });
  
  

    test(' check to see if program saves a chart in local storage', function()  {
      //arrange
      const chart = { title: 'Test Chart', data: [1, 2, 3] };
      //act
      storage.saveChart(chart);
    
      
      const savedCharts = JSON.parse(localStorage.getItem('savedCharts'));
      expect(savedCharts).toEqual([chart]);
    
      
      const loadedChart = storage.loadSavedChart(0);
      expect(loadedChart).not.toBeUndefined();
    
      //assert
      expect(loadedChart).toEqual(chart);
    });

    test('load all saved charts from local storage', function() {
      //arrange
      const chart1 = { title: 'Test Chart 1', data: [1, 2, 3] };
      const chart2 = { title: 'Test Chart 2', data: [4, 5, 6] };
      storage.saveChart(chart1);
      storage.saveChart(chart2);
    
      //act
      const savedCharts = JSON.parse(localStorage.getItem('savedCharts'));
      expect(savedCharts).toEqual([chart1, chart2]);
    
      
      const loadedCharts = storage.loadAllSavedCharts();
      expect(loadedCharts).not.toBeUndefined();
    
      //assert
      expect(loadedCharts).toEqual([chart1, chart2]);
    });

    test('Load a specific chart from the local storage', function() {
      //arrange
      const chart1 = { title: 'Test Chart 1', data: [1, 2, 3] };
      const chart2 = { title: 'Test Chart 2', data: [4, 5, 6] };
      const chart3 = { title: 'Test Chart 3', data: [7, 8, 9] };
      //act
      storage.saveChart(chart1);
      storage.saveChart(chart2);
      storage.saveChart(chart3);
    
      
      const savedCharts = JSON.parse(localStorage.getItem('savedCharts'));
      expect(savedCharts).toEqual([chart1, chart2, chart3]);
    
      
      const loadedChart = storage.loadSavedChart(2);
      expect(loadedChart).not.toBeUndefined();
    
      //assert
      expect(loadedChart).toEqual(chart3);
    });

    test('Update the current chart data in local storage', function() {
      // Arrange
      const initialChart = { title: 'Initial Chart', data: [1, 2, 3] };
      const updatedChart = { title: 'Updated Chart', data: [4, 5, 6] };
    
      // Act
      storage.updateCurrentChartData(initialChart);
    
      let currentChartData = JSON.parse(localStorage.getItem('currentChartData'));
      expect(currentChartData).toEqual(initialChart);
    
      // Update the chart data
      storage.updateCurrentChartData(updatedChart);
    
      // Assert
      currentChartData = JSON.parse(localStorage.getItem('currentChartData'));
      expect(currentChartData).toEqual(updatedChart);
    });

    test('load current chart data from the local storage', function() {
      // Arrange
      const chart = { title: 'Test Chart', data: [1, 2, 3] };
      storage.updateCurrentChartData(chart);
    
      // Act
      const currentChartData = storage.loadCurrentChartData();
    
      // Assert
      expect(currentChartData).toEqual(chart);
    });
    
  });

