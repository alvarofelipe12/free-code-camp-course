import React from 'react'
import Home from './page'

describe('Pomodoro Timer', () => {
  beforeEach(() => {
    cy.mount(<Home />)
  });

  it('User Story #1: I can see an element with id="break-label" that contains a string (e.g. "Break Length").', () => {
    cy.get('#break-label').should('contain', 'Break Length');
  });

  it('User Story #2: I can see an element with id="session-label" that contains a string (e.g. "Session Length").', () => {
    cy.get('#session-label').should('contain', 'Session Length');
  });

  it('User Story #3: I can see two clickable elements with corresponding IDs: id="break-decrement" and id="session-decrement".', () => {
    cy.get('#break-decrement').should('be.visible');
    cy.get('#session-decrement').should('be.visible');
  });

  it('User Story #4: I can see two clickable elements with corresponding IDs: id="break-increment" and id="session-increment".', () => {
    cy.get('#break-increment').should('be.visible');
    cy.get('#session-increment').should('be.visible');
  });

  it('User Story #5: I can see an element with a corresponding id="break-length", which by default (on load) displays a value of 5.', () => {
    cy.get('#break-length').should('contain', '5');
  });

  it('User Story #6: I can see an element with a corresponding id="session-length", which by default displays a value of 25.', () => {
    cy.get('#session-length').should('contain', '25');
  });

  it('User Story #7: I can see an element with a corresponding id="timer-label", that contains a string indicating a session is initialized (e.g. "Session").', () => {
    cy.get('#timer-label').should('contain', 'Session');
  });

  it('User Story #8: I can see an element with corresponding id="time-left".', () => {
    cy.get('#time-left').should('be.visible');
  });

  it('User Story #9: I can see a clickable element with a corresponding id="start_stop".', () => {
    cy.get('#start_stop').should('be.visible');
  });

  it('User Story #10: I can see a clickable element with a corresponding id="reset".', () => {
    cy.get('#reset').should('be.visible');
  });

  it('User Story #11: When I click the element with the id of reset, any running timer should be stopped, the value within id="break-length" should return to 5, the value within id="session-length" should return to 25, and the element with id="time-left" should reset to its default state.', () => {
    cy.get('#start_stop').click();
    cy.wait(2000);
    cy.get('#reset').click();
    cy.get('#break-length').should('contain', '5');
    cy.get('#session-length').should('contain', '25');
    cy.get('#time-left').should('contain', '25:00');
  });

  it('User Story #12: When I click the element with the id of break-decrement, the value within id="break-length" decrements by a value of 1, and I can see the updated value.', () => {
    cy.get('#break-decrement').click();
    cy.get('#break-length').should('contain', '4');
  });

  it('User Story #13: When I click the element with the id of break-increment, the value within id="break-length" increments by a value of 1, and I can see the updated value.', () => {
    cy.get('#break-increment').click();
    cy.get('#break-length').should('contain', '6');
  });

  it('User Story #14: When I click the element with the id of session-decrement, the value within id="session-length" decrements by a value of 1, and I can see the updated value.', () => {
    cy.get('#session-decrement').click();
    cy.get('#session-length').should('contain', '24');
  });

  it('User Story #15: When I click the element with the id of session-increment, the value within id="session-length" increments by a value of 1, and I can see the updated value.', () => {
    cy.get('#session-increment').click();
    cy.get('#session-length').should('contain', '26');
  });

  it('User Story #16: I should not be able to set a session or break length to <= 0.', () => {
    for (let i = 0; i < 6; i++) {
      cy.get('#break-decrement').click();
    }
    cy.get('#break-length').should('contain', '1');

    for (let i = 0; i < 26; i++) {
      cy.get('#session-decrement').click();
    }
    cy.get('#session-length').should('contain', '1');
  });

  it('User Story #17: I should not be able to set a session or break length to > 60.', () => {
    for (let i = 0; i < 56; i++) {
      cy.get('#break-increment').click();
    }
    cy.get('#break-length').should('contain', '60');

    for (let i = 0; i < 36; i++) {
      cy.get('#session-increment').click();
    }
    cy.get('#session-length').should('contain', '60');
  });

  it('User Story #18: When I first click the element with id="start_stop", the timer should begin running from the value currently displayed in id="session-length", even if the value has been incremented or decremented from the original value of 25.', () => {
    cy.get('#session-increment').click();
    cy.get('#start_stop').click();
    cy.wait(2000);
    cy.get('#time-left').should('not.contain', '26:00');
  });

  it('User Story #19: If the timer is running, the element with the id of time-left should display the remaining time in mm:ss format (decrementing by a value of 1 and updating the display every 1000ms).', () => {
    cy.get('#start_stop').click();
    cy.wait(2000);
    cy.get('#time-left').should('not.contain', '25:00');
  });

  it('User Story #20: If the timer is running and I click the element with id="start_stop", the countdown should pause.', () => {
    cy.get('#start_stop').click();
    cy.wait(2000);
    cy.get('#start_stop').click();
    cy.get('#time-left').invoke('text').then((time1) => {
      cy.wait(2000);
      cy.get('#time-left').invoke('text').should((time2) => {
        expect(time1).to.eq(time2);
      });
    });
  });

  it('User Story #21: If the timer is paused and I click the element with id="start_stop", the countdown should resume running from the point at which it was paused.', () => {
    cy.get('#start_stop').click();
    cy.wait(2000);
    cy.get('#start_stop').click();
    cy.wait(2000);
    cy.get('#start_stop').click();
    cy.wait(2000);
    cy.get('#time-left').should('not.contain', '25:00');
  });

  it('User Story #22: When a session countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of timer-label should display a string indicating a break has begun.', () => {
    for (let i = 0; i < 25; i++) {
      cy.get('#session-decrement').click();
    }
    cy.get('#start_stop').click();
    cy.wait(60000); // 1 minute
    cy.get('#timer-label').should('contain', 'Break');
  });

  // it('User Story #23: When a session countdown reaches zero (NOTE: timer MUST reach 00:00), a new break countdown should begin, counting down from the value currently displayed in the id="break-length" element.', () => {
  //   for (let i = 0; i < 25; i++) {
  //     cy.get('#session-decrement').click();
  //   }
  //   cy.get('#start_stop').click();
  //   cy.wait(60000); // 1 minute
  //   cy.get('#start_stop').click();
  //   cy.get('#time-left').should('contain', '01:00');
  // });

  it('User Story #24: When a break countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of timer-label should display a string indicating a session has begun.', () => {
    for (let i = 0; i < 25; i++) {
      cy.get('#session-decrement').click();
    }
    for (let i = 0; i < 5; i++) {
      cy.get('#break-decrement').click();
    }
    cy.get('#start_stop').click();
    cy.wait(60000); // 1 minute session
    cy.wait(60000); // 1 minute break
    cy.get('#timer-label').should('contain', 'Session');
  });

  it('User Story #25: When a break countdown reaches zero (NOTE: timer MUST reach 00:00), a new session countdown should begin, counting down from the value currently displayed in the id="session-length" element.', () => {
    for (let i = 0; i < 25; i++) {
      cy.get('#session-decrement').click();
    }
    for (let i = 0; i < 5; i++) {
      cy.get('#break-decrement').click();
    }
    cy.get('#start_stop').click();
    cy.wait(60000); // 1 minute session
    cy.wait(60000); // 1 minute break
    cy.get('#time-left').should('contain', '1:00');
  });

  it('User Story #26: When a countdown reaches zero (NOTE: timer MUST reach 00:00), a sound indicating that time is up should play. This should utilize an HTML5 audio tag and have a corresponding id="beep".', () => {
    for (let i = 0; i < 25; i++) {
      cy.get('#session-decrement').click();
    }
    cy.get('#start_stop').click();
    cy.wait(60000); // 1 minute
    cy.get('#beep').should('have.prop', 'paused', false);
  });

  it('User Story #27: The audio element with id="beep" must be 1 second or longer.', () => {
    cy.get('#beep').invoke('prop', 'duration').should('be.gte', 1);
  });

  it('User Story #28: The audio element with id of beep must stop playing and be rewound to the beginning when the element with the id of reset is clicked.', () => {
    cy.get('#start_stop').click();
    cy.wait(2000);
    cy.get('#reset').click();
    cy.get('#beep').should('have.prop', 'currentTime', 0);
  });
});