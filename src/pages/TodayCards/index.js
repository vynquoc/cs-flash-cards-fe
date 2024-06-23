import React, { useEffect, useState } from "react";
import cardsApi from "../../api/cardsApi";
import ReviewingCard from "../../components/ReviewingCards";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const TodayCardsPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCards = async () => {
    try {
      const response = await cardsApi.getReviewCard();
      setCards(response.cards);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
        </div>
      ) : (
        <ReviewingCard cards={cards} />
      )}
    </>
  );
};

export default TodayCardsPage;
