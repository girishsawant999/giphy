import axios from "axios";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

class GiphyService {
  private apiKey: string;

  constructor() {
    if (!API_KEY) {
      throw new Error(
        "Giphy API key is not set. Please set VITE_GIPHY_API_KEY in your environment variables."
      );
    } else {
      console.log("Giphy API key is set.");
      this.apiKey = API_KEY;
    }
  }

  async getTrendingGifs({
    limit = 10,
    offset = 0,
  }: {
    limit?: number;
    offset?: number;
  }) {
    try {
      const response = await axios.get<TMetaAndPaginatedType<TGifData>>(
        `https://api.giphy.com/v1/gifs/trending?api_key=${this.apiKey}&limit=${limit}&offset=${offset}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching trending GIFs:", error);
      throw error;
    }
  }

  async searchGifs({
    query,
    limit = 10,
    offset = 0,
  }: {
    query: string;
    limit?: number;
    offset?: number;
  }) {
    try {
      const response = await axios.get<TMetaAndPaginatedType<TGifData>>(
        `https://api.giphy.com/v1/gifs/search?api_key=${
          this.apiKey
        }&q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`
      );
      return response.data;
    } catch (error) {
      console.error("Error searching GIFs:", error);
      throw error;
    }
  }
}

const giphyService = new GiphyService();
export default giphyService;
