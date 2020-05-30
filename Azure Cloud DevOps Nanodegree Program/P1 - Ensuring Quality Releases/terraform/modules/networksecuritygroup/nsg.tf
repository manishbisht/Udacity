resource "azurerm_network_security_group" "nsg" {
  name                = "${var.application_type}-${var.resource_type}"
  location            = "${var.location}"
  resource_group_name = "${var.resource_group}"

  security_rule {
    name                       = "${var.application_type}-${var.resource_type}-5000"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "5000"
    source_address_prefix      = "${var.address_prefix_test}"
    destination_address_prefix = "*"
  }
  security_rule {
        name                       = "SSH"
        priority                   = 1001
        direction                  = "Inbound"
        access                     = "Allow"
        protocol                   = "Tcp"
        source_port_range          = "*"
        destination_port_range     = "22"
        source_address_prefix      = "*"
        destination_address_prefix = "*"
    }
}
resource "azurerm_subnet_network_security_group_association" "test" {
    subnet_id                 = "${var.subnet_id}"
    network_security_group_id = azurerm_network_security_group.nsg.id
}