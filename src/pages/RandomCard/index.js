import React, { useEffect, useState } from "react";
import ReviewingCard from "../../components/ReviewingCards";
import cardsApi from "../../api/cardsApi";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const RandomCardPage = () => {
  const [card, setCard] = useState(null);
  const [fetching, setFetching] = useState(false);
  const getCard = async () => {
    try {
      const response = await cardsApi.getRandomCard();
      setCard(response.card);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCard();
  }, [fetching]);
  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        alignItems: "center",
      }}
    >
      <Button
        onClick={() => setFetching(!fetching)}
        variant="contained"
        sx={{ width: "fit-content" }}
      >
        Random
      </Button>
      <ReviewingCard cards={[card]} random />
    </Container>
  );
};

export default RandomCardPage;
