import productListApi from '../resources/productList.js';

export default function registerGetProductsTool(server) {
  server.registerTool('getProducts', async (params) => {
    try {
      const data = await productListApi();
      const products = data.items || [];
      const formattedProducts = products.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category,
      }));
      return formattedProducts;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  });
}