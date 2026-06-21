sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("sap.welcome.controller.App", {

    onInit: function () {
      this._oRouter = this.getOwnerComponent().getRouter();
      // keep the side navigation selection in sync with the current route
      this._oRouter.attachRouteMatched(this._onRouteMatched, this);
    },

    _onRouteMatched: function (oEvent) {
      var sRouteName = oEvent.getParameter("name");
      this.byId("sideNavigation").setSelectedKey(sRouteName);
    },

    onMenuButtonPress: function () {
      var oToolPage = this.byId("toolPage");
      oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
    },

    onItemSelect: function (oEvent) {
      var sKey = oEvent.getParameter("item").getKey();
      if (sKey === "help") {
        // placeholder for a help action
        return;
      }
      this._oRouter.navTo(sKey);
    }
  });
});
