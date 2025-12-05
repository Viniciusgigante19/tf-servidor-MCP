import ProductList from "@app/js/React/components/ProductList/ProductList";
import ProductListMcp from "@app/js/React/components/ProductListMcp/ProductListMcp";
import ProductCreateForm from "@app/js/React/components/ProductCreateForm/ProductCreateForm";
import { useEffect, useState } from "react";
import { ProductModel, ListApi } from "@app/js/app.types";
import productListApi from "@app/js/services/api/productListApi";
import productListMcpApi from "@app/js/services/api/productListMcpApi"; 

export default function Products() {
  const [productList, setProductList] = useState<ListApi<ProductModel> | "error">({
    rows: [],
    count: 0,
    limit: 10,
    page: 1,
    next: null,
    totalPages: 0,
  });

  const [productListMcp, setProductListMcp] = useState<ListApi<ProductModel> | "error">({
    rows: [],
    count: 0,
    limit: 10,
    page: 1,
    next: null,
    totalPages: 0,
  });

  const [showList, setShowList] = useState(true);
  const [showListMcp, setShowListMcp] = useState(false);

  useEffect(() => {
    listApi();
  }, []);

  const listApi = async () => {
    const resp = await productListApi(10);
    if ("error" in resp) return setProductList("error");
    setProductList(resp);
  };

  const listMcpApi = async () => {
    const resp = await productListMcpApi(10);
    if ("error" in resp) return setProductListMcp("error");
    setProductListMcp(resp);
  };

  const createProductHandler = () => {
    listApi();
    listMcpApi();
  };

  const deleteProductHandler = () => {
    listApi();
    listMcpApi();
  };

  return (
    <div className="row g-4">
      <ProductCreateForm onCreate={createProductHandler} />

      {/* Botão para alternar visibilidade da lista normal */}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => setShowList(!showList)}
      >
        {showList ? "Ocultar lista" : "Mostrar lista"}
      </button>

      {/* Botão para alternar visibilidade da lista MCP */}
      <button
        type="button"
        className="btn btn-info"
        onClick={() => {
          setShowListMcp(!showListMcp);
          if (!showListMcp) listMcpApi(); // carrega do MCP só quando abrir
        }}
      >
        {showListMcp ? "Ocultar lista MCP" : "Mostrar lista MCP"}
      </button>

      {/* Renderização condicional */}
      {showList && (
        <ProductList products={productList} onDelete={deleteProductHandler} />
      )}

      {showListMcp && (
        <ProductListMcp products={productListMcp} />
      )}
    </div>
  );
}
