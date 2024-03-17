describe('End-to-End Test: Re-opening Chart from Gallery', () => {
  it('successfully re-opens a chart from the gallery', () => {
    // Visit the gallery page
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
    // Get the first saved chart in the gallery
    cy.get('#gallery img').first().click()

    // Assert that the chart builder page is opened
    cy.url().should('include', 'line.html')

    // Assert that the chart title is displayed in the input field
    cy.get('#chart-title-input').should('have.value', 'Test Chart Title')

    // Assert that the chart color is displayed in the color input field
    cy.get('#chart-color-input').should('have.value', '#ff0000')

    // Assert that the X label is displayed in the input field
    cy.get('#x-label-input').should('have.value', 'X Label1')

    // Assert that the Y label is displayed in the input field
    cy.get('#y-label-input').should('have.value', 'Y Label2')

    
    cy.get('#x-y-data-grid input').eq(2).should('have.value', '3')
    cy.get('#x-y-data-grid input').eq(3).should('have.value', '4')

    // Assert that the generated chart image is displayed
    cy.get('#chart-display img').should('exist')
  })
})
