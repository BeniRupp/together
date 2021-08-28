Feature: Welcome

Scenario: Join default room
  Given the app is opened by a user
  When a space with a default room is selected
  Then the user joins the default room

Scenario: Switching rooms
  Given the use is joined to a space that has multiple rooms
  When a user joins a room
  Then the user is part of that room
  When the user joins another room
  Then the user is only part of that second room
