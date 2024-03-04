import React, { useEffect, useState } from "react";
import cardsApi from "../../api/cardsApi";
import ReviewingCard from "../../components/ReviewingCards";
import Container from "@mui/material/Container";

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
    <Container component="main">
      <ReviewingCard cards={cards} />
    </Container>
  );
};

export default TodayCardsPage;
