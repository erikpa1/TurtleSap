sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("sap.welcome.controller.Home", {
    onGetStarted: function () {
      this.getOwnerComponent().getRouter().navTo("info");
    }
  });
});
