import http from "http";

const API_BASE_URL = "http://localhost:3000";

class IncomeRepository {
  async makeRequest(url) {
    const chunks = [];
    return new Promise((resolve, reject) => {
      http.get(url, (response) => {
        response.on("data", (data) => {
          chunks.push(data);
        });
        response.on("error", reject);
        response.on("end", () => {
          const data = Buffer.concat(chunks);
          resolve(JSON.parse(data));
        });
      });
    });
  }

  async getConversions() {
    const data = await this.makeRequest(`${API_BASE_URL}/convert`);
    return data.results;
  }
}

export default IncomeRepository;
