import React, { useEffect, useState } from "react";
import ReviewingCard from "../../components/ReviewingCards";
import cardsApi from "../../api/cardsApi";
import { Button, Flex } from "antd";
import { RedoOutlined } from "@ant-design/icons";

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
    <div className="flex flex-col items-center">
      <Button
        className="w-[150px] font-bold mx-auto"
        type="primary"
        size="large"
        onClick={() => setFetching(!fetching)}
        icon={<RedoOutlined />}
      ></Button>
      <ReviewingCard cards={[card]} random />
    </div>
  );
};

export default RandomCardPage;
