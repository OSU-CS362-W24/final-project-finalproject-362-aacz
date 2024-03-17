describe('End-to-End Test: Saving Chart to Gallery', () => {
    it('successfully saves a chart to the gallery', () => {
      // Visit the line chart builder page
      cy.visit('http://localhost:8080/line.html')   
      // Enter chart data on the line chart builder page
      cy.get('#chart-title-input').type('Test Chart Title')
      cy.get('#chart-color-input').invoke('val', '#ff0000').trigger('change')
      cy.get('#x-label-input').type('X Label')
      cy.get('#y-label-input').type('Y Label')
      cy.get('#x-y-data-grid input').eq(0).type('1')
      cy.get('#x-y-data-grid input').eq(1).type('2')
      cy.get('#x-y-data-grid input').eq(2).type('3')
      cy.get('#x-y-data-grid input').eq(3).type('4')
  
      // Generate the chart
      cy.get('#generate-chart-btn').click()
  
      // Save the chart
      cy.get('#save-chart-btn').click()
  
      // Navigate to the gallery page
      cy.get('nav li').contains('Gallery').click()
  
      // Assert that the saved chart title appears in the gallery
      cy.get('#gallery').contains('Test Chart Title').should('exist')
    })
  })
  