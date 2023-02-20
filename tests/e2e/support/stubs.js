import constants from '../fixtures/constants.json';
import orderDetails from '../fixtures/orderDetails.json';
import reschedule from '../fixtures/reschedule.json';
import rescheduledOrder from '../fixtures/rescheduledOrder.json';
import 'cypress-localstorage-commands';

Cypress.Commands.add('entryStubs', () => {
  cy.intercept('GET', `${constants.FULFILMENT_SERVER}buyer/orders/D-UYBEI-01423`, {
    statusCode: 200,
    body: orderDetails,
  }).as('order-details');
  cy.intercept('PATCH', `${constants.FULFILMENT_SERVER}buyer/orders/D-UYBEI-01423/recipient/update`, {
    statusCode: 200,
    body: orderDetails,
  }).as('update-details');
  cy.intercept('PUT', `${constants.FULFILMENT_SERVER}buyer/orders/D-UYBEI-01423/reschedule`, {
    statusCode: 200,
    body: reschedule,
  }).as('reschedule-order');
});
Cypress.Commands.add('rescheduleStubs', () => {
  cy.intercept('GET', `${constants.FULFILMENT_SERVER}buyer/orders/D-UYBEI-01423`, {
    statusCode: 200,
    body: rescheduledOrder,
  }).as('rescheduled-order-details');
});
