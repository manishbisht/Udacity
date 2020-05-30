resource "azurerm_virtual_network" "test" {
  name                 = "${var.application_type}-${var.resource_type}"
  address_space        = "${var.address_space}"
  location             = "${var.location}"
  resource_group_name  = "${var.resource_group}"
}
resource "azurerm_subnet" "test" {
  name                 = "${var.application_type}-${var.resource_type}-sub"
  resource_group_name  = "${var.resource_group}"
  virtual_network_name = "${azurerm_virtual_network.test.name}"
  address_prefix       = "${var.address_prefix_test}"
}
