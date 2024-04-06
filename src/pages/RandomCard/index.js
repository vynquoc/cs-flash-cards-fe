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
    <Flex vertical align="center" className="pt-[40px]">
      <Button
        className="w-[150px] font-bold"
        type="primary"
        size="large"
        onClick={() => setFetching(!fetching)}
        icon={<RedoOutlined />}
      ></Button>
      <ReviewingCard cards={[card]} random />
    </Flex>
  );
};

export default RandomCardPage;
