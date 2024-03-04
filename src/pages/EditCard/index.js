import React, { useEffect, useState } from "react";
import CardForm from "../../components/CardForm";
import { useParams } from "react-router-dom";
import cardsApi from "../../api/cardsApi";

const EditCardPage = () => {
  const [currentCard, setCurrentCard] = useState(null);
  const { id } = useParams();
  const getCard = async () => {
    try {
      const response = await cardsApi.getCard(id);
      setCurrentCard(response.card);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCard();
  }, [id]);
  return (
    <div>
      <CardForm card={currentCard} mode="update" />
    </div>
  );
};

export default EditCardPage;
