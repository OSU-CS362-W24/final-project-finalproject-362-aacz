describe('End-to-End Test: Data Persistence Across Chart Builder Pages', () => {
    it('maintains entered data when navigating between chart builder pages', () => {
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
  
      // Navigate to the scatter plot builder page
      cy.get('nav li').contains('Scatter').click() // Replace 'Scatter' with the text of the link to the scatter plot builder page
  
      // Verify that the entered data is still present
      cy.get('#chart-title-input').should('have.value', 'Test Chart Title')
      cy.get('#chart-color-input').should('have.value', '#ff0000')
      cy.get('#x-label-input').should('have.value', 'X Label1')
      cy.get('#y-label-input').should('have.value', 'Y Label2')
      
    })
  })
  