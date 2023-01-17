output "kube_config" {
  value = azurerm_kubernetes_cluster.app.kube_config
  sensitive = true
}
resource "local_file" "kubeconfig" {
  depends_on   = [azurerm_kubernetes_cluster.app]
  filename     = "kubeconfig"
  content      = azurerm_kubernetes_cluster.app.kube_config_raw
}