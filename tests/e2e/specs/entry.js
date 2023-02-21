// import { expect } from 'chai';
import moment from 'moment';

const timeout = 60000;

describe('Order details page', () => {
  it('Loads page and fetches order details', () => {
    cy.entryStubs();
    cy.visit('/D-UYBEI-01423', { timeout });
    cy.get('.order-number').contains('Order Number: D-UYBEI-01423');
    cy.get('.fulfillemnt-order-items-expected-deivery-date').contains('Wednesday, 15th February');
    cy.get('.reciepient-details-rows').eq(0).contains(' Dorcas Cherono');
    cy.get('.reciepient-details-rows').eq(1).contains(' +254 794 375045');
    cy.get('.reciepient-details-rows').eq(2).contains(' Kinoo, Rungiri, Kenya');
  });
  it('Can change the language to french', () => {
    cy.entryStubs();
    cy.visit('/D-UYBEI-01423', { timeout });
    cy.get('.language-change').click();
    cy.wait(1000);
    cy.get('.el-dropdown-menu__item').eq(1).click();
    cy.get('.fulfillemnt-order-items-expected-deivery-date').contains('mercredi, 15 février');
  });
  it('Can edit delivery details', () => {
    cy.entryStubs();
    cy.visit('/D-UYBEI-01423', { timeout });
    cy.get('.change-delivery-el-button').click();
    cy.wait(1000);
    cy.get('.change-info-button-mobile').click();
    cy.wait(1000);
    cy.get('.delivery-options-tag-inactive').eq(0).click();
    cy.get('.update-info-button').contains('Update Delivery Info').click();
    cy.get('.update-info-button').contains('Confirm Changes').click();
  });
  it('Can reschedule date', () => {
    cy.entryStubs();
    cy.visit('/D-UYBEI-01423', { timeout });
    cy.get('.change-delivery-el-button').click();
    cy.wait(1000);
    cy.get('.reschedule-button').click();
    cy.wait(1000);
    cy.get('.day').contains(moment().add(1, 'days').format('D')).click();
    cy.rescheduleStubs();
    cy.get('.save-button').contains('Save').click();
    cy.get('.fulfillemnt-order-items-expected-deivery-date').contains('Tuesday, 21st February');
    cy.get('.PAST-timeline-text').contains('Your order has been created on Monday, 20th February');
  });
});
