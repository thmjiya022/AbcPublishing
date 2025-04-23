import SectionPageElements from "../pageElements/SectionPageElements";

let sectionPageElements = new SectionPageElements();

let testData = null;

describe("Abc Publishing test", () => {
  before("Load test data", () => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  beforeEach("Visit site", () => {
    cy.visit("/");
  });

  it("Testing navigation to valid section", () => {
    cy.get(sectionPageElements.NextPageLink).then((link) => {
      cy.wrap(link).click();

      cy.get(sectionPageElements.Title)
        .invoke("text")
        .then((text) => {
          expect(text).to.eq(testData.expectedTitle);
        });
    });
  });

  it("Testing navigation to invalid section", () => {
    cy.get(sectionPageElements.NextPageLink).click();
    cy.get(sectionPageElements.SecondForwardLink).then((link) => {
      cy.wrap(link).click();

      cy.get(sectionPageElements.Title)
        .invoke("text")
        .then((text) => {
          expect(text).to.eq(testData.invalidTitle);
        });
    });
  });
});
