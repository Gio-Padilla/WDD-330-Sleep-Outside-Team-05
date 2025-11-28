const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) return jsonResponse;
  throw { name: "servicesError", message: jsonResponse };
}

export default class ExternalServices {

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async searchProducts(query) {
    const response = await fetch(`${baseURL}products/search/${query}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      };
      const response = await fetch(`${baseURL}checkout/`, options);

      if (!response.ok)
        throw new Error(`Server error: ${response.status}`);

      return await convertToJson(response);
    } catch (err) {
      console.error("Checkout failed:", err);
      return { error: true, message: err.message };
    }
  }
}