namespace sap.capire.invoices;

using { cuid, managed } from '@sap/cds/common';

/**
 * An Invoice line item.
 *
 *  - `cuid`    adds a generated UUID key field `ID`
 *  - `managed` adds createdAt / createdBy / modifiedAt / modifiedBy
 */
entity Invoices : cuid, managed {
  product       : String(111);
  quantity      : Integer;
  extendedPrice : Decimal(15, 2);
  shipperName   : String(111);
  shippedDate   : Date;
  status        : String(20) enum {
    Open;
    Shipped;
    Done;
  } default 'Open';
}


/**
 * An Invoice line item.
 *
 *  - `cuid`    adds a generated UUID key field `ID`
 *  - `managed` adds createdAt / createdBy / modifiedAt / modifiedBy
 */
entity Products : cuid, managed {
  product       : String(111);
  quantity      : Integer;
  extendedPrice : Decimal(15, 2);
  shipperName   : String(111);
  shippedDate   : Date;
  status        : String(20) enum {
    Open;
    Shipped;
    Done;
  } default 'Open';
}
