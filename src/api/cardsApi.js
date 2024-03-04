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
    const data = {
      ...params,
      tags: params.tags.join(","),
    };

    const url = `/cards`;
    return axiosClient.get(url, { params: data });
  },
  updateCard: (id, data) => {
    const url = `/cards/${id}`;
    return axiosClient.patch(url, data);
  },
  getRandomCard: () => {
    const url = `/random`;
    return axiosClient.get(url);
  },
};

export default cardsApi;
