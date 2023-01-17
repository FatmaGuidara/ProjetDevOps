data "terraform_remote_state" "aks" {
  backend = "azurerm"

  config = {

    resource_group_name  = "rg-devops"
    storage_account_name = "devpos0"
    container_name       = "infra-state"
    key                  = "first-stack.tfstate"
  }
}


resource "kubernetes_namespace" "example" {
  metadata {
    annotations = {
      name = "example-annotation"
    }

    labels = {
      environment = var.environment
    }

    generate_name = "gl5-"
  }
}

resource "helm_release" "example" {
  name       = "argocdproj"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  namespace  = kubernetes_namespace.example.id
  verify = false
}
