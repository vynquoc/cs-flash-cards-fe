import axiosClient from "./axiosClient";

const cardsApi = {
  getReviewCard: () => {
    const url = `/review-cards`;
    return axiosClient.get(url);
  },
  createCard: (data) => {
    const url = `/cards`;
    return axiosClient.post(url, data);
  },
  getCard: (id) => {
    const url = `/cards/${id}`;
    return axiosClient.get(url);
  },
  getAllCards: (params) => {
    const url = `/cards`;
    params.tags = params.tags.join(",");
    return axiosClient.get(url, { params: params });
  },
  updateCard: (id, data) => {
    const url = `/cards/${id}`;
    return axiosClient.patch(url, data);
  },
  getRandomCard: () => {
    const url = `/random`;
    return axiosClient.get(url);
  },
  deleteCard: (id) => {
    const url = `/cards/${id}`;
    return axiosClient.delete(url);
  },
};

export default cardsApi;
