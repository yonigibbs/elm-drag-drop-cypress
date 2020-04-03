describe("Upload", function () {
    it("Handles drag-drop", function () {
        cy.visit("/")

        // The below does nothing
        // cy.get("[data-cy='upload-btn']").click()

        // So try drag-drop instead
        const fileName = "sample.jpg"
        cy.get("[data-cy='drop-zone']").attachFile(fileName, {subjectType: "drag-n-drop"})
        cy.contains(fileName)
    })
})
