import productListApi from '../resources/productList.js';

export default function registerGetProductsTool(server) {
  server.registerTool('getProducts', async (params) => {
    try {
      const { limit = 10 } = params || {};
      const data = await productListApi();
      const products = data.items || [];

      const formattedProducts = products.slice(0, limit).map(p => ({
        id: p.id,
        name: p.name,
        // campo esperado pelo componente
        price_times_thousand: p.price ? p.price * 1000 : 0,
        // se não houver created_at no objeto original, gera um valor padrão
        created_at: p.created_at || new Date().toISOString(),
        // mantém outros campos úteis
        category: p.category,
        price: p.price,
      }));

      return {
        rows: formattedProducts,
        count: formattedProducts.length,
        limit,
        page: 1,
        next: null,
        totalPages: 1,
      };
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  });
}
