data "terraform_remote_state" "aks" {
  backend = "azurerm"
  config = {
    resource_group_name  = "rg-devops"
    storage_account_name = "devpos0"
    container_name       = "infra-state"
    key                  = "first-stack.tfstate"
  }
}


data "kubernetes_namespace" "example" {
  metadata {
    annotations = {
      name = "example-annotation"
    }
    name = "ecommerce"
  }
}

resource "helm_release" "my_application" {
  name = var.release_name
  chart = var.chart
  namespace  = data.kubernetes_namespace.example.id
}