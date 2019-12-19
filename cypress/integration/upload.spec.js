describe('Upload', function() {
    it('Handles drag-drop', function() {
        cy.visit("/")

        // The below does nothing
        // cy.get("[data-cy='upload-btn']").click()

        // So try drag-drop instead
        const fileName = "sample.jpg"
        cy.fixture(fileName).then(fileContent => {
            cy.get("[data-cy='drop-zone']").upload(
                { fileContent, fileName, mimeType: 'image/jpeg' },
                { subjectType: "drag-n-drop" }
            )
        })

        cy.contains(fileName)
    })
})
