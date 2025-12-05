import React from "react";
import { ProductListMcpProps } from "@app/js/app.types";

export default function ProductListMcp({ products }: ProductListMcpProps) {
  if (products === "error") {
    return <div className="alert alert-danger">Erro ao carregar produtos do MCP.</div>;
  }

  if (!products.rows || products.rows.length === 0) {
    return <div className="alert alert-info">Nenhum produto encontrado no MCP.</div>;
  }

  return (
    <div className="card">
      <div className="card-header">Lista de Produtos (MCP - somente visualização)</div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Criado em</th>
            </tr>
          </thead>
          <tbody>
            {products.rows.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price_times_thousand / 1000}</td>
                <td>{new Date(product.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Página {products.page} de {products.totalPages} — Total: {products.count} produtos
        </p>
      </div>
    </div>
  );
}
