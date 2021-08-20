Feature: Welcome

Scenario: Join default room
  Given the app is opened by a user
  When a default room is set
  Then the user joins the default room
