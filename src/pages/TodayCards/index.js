import React, { useEffect, useState } from "react";
import cardsApi from "../../api/cardsApi";
import ReviewingCard from "../../components/ReviewingCards";

const TodayCardsPage = () => {
  const [cards, setCards] = useState([]);
  const getCards = async () => {
    try {
      const response = await cardsApi.getReviewCard();
      setCards(response.cards);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCards();
  }, []);
  return (
    <div>
      <ReviewingCard cards={cards} />
    </div>
  );
};

export default TodayCardsPage;
