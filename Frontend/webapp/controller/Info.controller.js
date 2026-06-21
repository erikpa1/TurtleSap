sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("sap.welcome.controller.Info", {
    onNavBack: function () {
      this.getOwnerComponent().getRouter().navTo("home");
    }
  });
});
