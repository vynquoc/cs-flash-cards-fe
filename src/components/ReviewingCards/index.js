import React, { useEffect, useState } from "react";
import { CodeFilled, ReadFilled, FireFilled } from "@ant-design/icons";
import { Tabs, message } from "antd";

import { Button } from "antd";

import SyntaxHighlighter from "react-syntax-highlighter";

import MDEditor from "@uiw/react-md-editor";

import cardsApi from "../../api/cardsApi";

function General({ card, flipped }) {
  return (
    <div
      data-color-mode="light"
      className="h-[300px] max-sm:h-[330px] flex flex-col overflow-y-scroll"
    >
      {!flipped ? (
        <>
          <h3
            className={`font-semibold text-lg ${
              card?.title.length < 50 && "text-center text-[24px]"
            }`}
          >
            {card?.title}
          </h3>
          <MDEditor.Markdown source={card?.description} className="mt-4" />
        </>
      ) : (
        <MDEditor.Markdown source={card?.content} />
      )}
    </div>
  );
}

function Code({ card }) {
  return (
    <div className="h-[300px] text-xs overflow-y-scroll">
      <SyntaxHighlighter
        language={card?.code_snippet?.language}
        customStyle={{ height: "100%" }}
      >
        {card?.code_snippet?.code}
      </SyntaxHighlighter>
    </div>
  );
}

const ReviewingCard = ({ cards, random }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState("general");

  const handleNext = () => {
    setIndex((prev) => prev + 1);
    setFlipped(false);
    setTab("general");
  };

  const handlePrev = () => {
    setIndex((prev) => prev - 1);
    setFlipped(false);
    setTab("general");
  };

  const handleDone = async () => {
    update();
    try {
      await cardsApi.updateCard(cards[index].id, { update_review_date: true });
      success();
      handleNext();
    } catch (error) {
      console.log(error);
      updateError();
    }
  };

  const update = () => {
    messageApi.open({
      type: "loading",
      content: "Updating",
      key: "key",
      duration: 0,
    });
    setTimeout(messageApi.destroy, 1500);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Updated!",
      duration: 0,
      key: "key",
    });
    setTimeout(messageApi.destroy, 1500);
  };

  const updateError = () => {
    messageApi.open({
      type: "error",
      content: "Something wrong!",
      key: "key",
    });
  };

  useEffect(() => {
    setTab("general");
    setFlipped(false);
  }, [cards]);

  return (
    <div className="w-[700px] mx-auto max-sm:w-full max-sm:rounded-none mt-10 border px-4 pb-4 rounded-xl">
      {cards.length > 0 ? (
        <>
          <Tabs
            centered
            size="large"
            activeKey={tab}
            onTabClick={(key) => setTab(key)}
            items={[
              {
                key: "general",
                label: "General",
                children: <General card={cards[index]} flipped={flipped} />,
                icon: <ReadFilled />,
              },
              {
                key: "code",
                label: "Code",
                disabled: cards[index]?.code_snippet === null,
                children: <Code card={cards[index]} />,
                icon: <CodeFilled />,
              },
            ]}
          />
          <div
            className={`flex mt-2 ${
              random ? "justify-center" : "justify-between"
            }`}
          >
            {!random && (
              <Button
                type="primary"
                onClick={handlePrev}
                size="large"
                disabled={index === 0}
                className="font-bold"
              >
                Prev
              </Button>
            )}
            <Button
              onClick={() => setFlipped(!flipped)}
              type="primary"
              size="large"
              className="font-bold"
            >
              Flip
            </Button>
            {!random && (
              <Button
                onClick={handleNext}
                type="primary"
                size="large"
                disabled={index === cards.length - 1}
                className="font-bold"
              >
                Next
              </Button>
            )}
          </div>
          {!random && (
            <div className="flex justify-center mt-4">
              <Button
                className="w-[100px] mx-auto font-bold"
                type="primary"
                size="large"
                onClick={handleDone}
              >
                Got it
              </Button>
            </div>
          )}
          {contextHolder}
        </>
      ) : (
        <div className="h-[300px] text-prim-500 flex flex-col justify-center items-center">
          <FireFilled style={{ fontSize: "60px" }} />
          <p className="my-4 font-semibold">
            You have reviewed all cards today
          </p>
          <b>Keep Learning!</b>
        </div>
      )}
    </div>
  );
};

export default ReviewingCard;
