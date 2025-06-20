import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import {
  cookieSelectors,
  dateSelectors,
  locationSelectors,
  ageSelectors,
  searchSelectors,
} from "../selectors";

let testData;

before(() => {
  cy.fixture("insuranceData.json").then((data) => {
    testData = data;
  });
});

Given("the user visits the car rental home page", () => {
  cy.visit("/");
});

Given("accepts cookies", () => {
  cy.get(cookieSelectors.cookieAcceptButton).should('be.visible').click();
});

When("they select pickup location as {string}", (location) => {
  cy.get(locationSelectors.pickupField).click();
  cy.get(locationSelectors.pickupInput)
    .clear()
    .type(location, { delay: 100 });
  cy.get(locationSelectors.pickupSuggestionsContainer)
    .contains(new RegExp(location.split(' ')[0], 'i'))
    .click();
});

When("selects pickup and return dates", () => {
  const today = new Date();
  const pickupDate = new Date(today.getTime());
  pickupDate.setDate(today.getDate() + 3);
  const returnDate = new Date(today.getTime());
  returnDate.setDate(today.getDate() + 5);

  const selectDateInCalendar = (dateObj) => {
    const monthLabel = dateObj.toLocaleString("en-US", { month: "long", year: "numeric" });
    const day = dateObj.getDate().toString();

    // Busca el mes y día para hacer click en el calendario visible
    cy.get(dateSelectors.calendarMonthContainer).each(($monthContainer) => {
      cy.wrap($monthContainer)
        .find(dateSelectors.calendarHeader)
        .then(($header) => {
          if ($header.text().trim() === monthLabel) {
            cy.wrap($monthContainer)
              .find(dateSelectors.calendarCell)
              .contains(new RegExp(`^${day}$`))
              .click({ force: true });
          }
        });
    });
  };

  // Abre el calendario clicando en el input de pickup (es el único visible)
  cy.get(dateSelectors.dateInput).click({ force: true });

  // Selecciona la fecha de pickup
  selectDateInCalendar(pickupDate);

  // Selecciona la fecha de devolución (en el mismo calendario)
  selectDateInCalendar(returnDate);

  // Espera para que el calendario procese los clicks
  cy.wait(500);
});


When("selects driver age as {string}", (ageStr) => {
  const age = parseInt(ageStr);
  const range = age < 30 ? "18 - 29" : age <= 69 ? "30 - 69" : "70+";
  cy.get(ageSelectors.ageButton)
    .contains(range)
    .click()
    .should("have.class", "ctc-button--primary");
});

Then("the search button should be visible", () => {
  cy.get(searchSelectors.searchButton).should("be.visible");
});
