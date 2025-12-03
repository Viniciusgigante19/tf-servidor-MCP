import ProductList from "@app/js/React/components/ProductList/ProductList";
import ProductCreateForm from "@app/js/React/components/ProductCreateForm/ProductCreateForm";
import { useEffect, useState } from "react";
import { ProductModel, ListApi } from "@app/js/app.types";
import productListApi from "@app/js/services/api/productListApi";

export default function Products() {

  const [productList, setProductList] = useState<ListApi<ProductModel> | "error">({
    rows: [],
    count: 0,
    limit: 10,
    page: 1,
    next: null,
    totalPages: 0,
});


    useEffect(() => {
        listApi();
    }, []);

    const listApi = async () => {
        const resp = await productListApi(10);
        if ("error" in resp) return setProductList("error");

        setProductList(resp);
    };

    const createProductHandler = () => {
        listApi();
    }

    const deleteProductHandler = () => {
        listApi();
    }

    return (
        <div className="row g-4">
            <ProductCreateForm onCreate={createProductHandler} />
            <ProductList products={productList} onDelete={deleteProductHandler} />
        </div>
    );
}
