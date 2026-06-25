using { sap.capire.invoices as my } from '../db/schema';

/**
 * A simple OData V4 service exposing Invoices.
 * Browse it at:  http://localhost:8080/odata/v4/InvoiceService/Invoices
 */
service InvoiceService {

  entity Invoices as projection on my.Invoices;

  // A convenience read-only view: only invoices still Open.
  @readonly
  entity OpenInvoices as projection on my.Invoices
    where status = 'Open';
}
