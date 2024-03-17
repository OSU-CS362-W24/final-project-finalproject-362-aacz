describe('End-to-End Test: Chart Generation', () => {
    it('generates a chart image when user supplies data and clicks "generate chart"', () => {
      // Visit the page
      cy.visit('http://localhost:8080/line.html')   
  
      // Enter chart data including the chart title, color, X & Y labels, and some X & Y data points
      cy.get('#chart-title-input').type('Test Chart Title')
      const color = '#00FF00'; // Green color
      // Set the value of the color input directly using JavaScript
      cy.get('#chart-color-input').then($input => {
        $input[0].value = color;
      });
      cy.get('#x-label-input').type('X Label')
      cy.get('#y-label-input').type('Y Label')
      cy.get('#x-y-data-grid input').eq(0).type('1')
      cy.get('#x-y-data-grid input').eq(1).type('2')
      cy.get('#x-y-data-grid input').eq(2).type('3')
      cy.get('#x-y-data-grid input').eq(3).type('4')
  
      // Click the generate chart button
      cy.get('#generate-chart-btn').click()
  
      // Assert that the chart image appears in the document
      cy.get('img#chart-img').should('exist')
    })
  })
  