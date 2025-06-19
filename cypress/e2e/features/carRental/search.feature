@JIRA-1234
Feature: Car Rental Search

  @JIRA-1234
  Scenario: User searches for car rentals with valid data
    Given the user visits the car rental home page
    And accepts cookies
    When they select pickup location as "Barcelona Airport"
    And selects pickup and return dates
    And selects driver age as "40"
    Then the search button should be visible
