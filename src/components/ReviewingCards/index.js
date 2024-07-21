import React, { useEffect, useState } from "react";
import {
  CodeFilled,
  ReadFilled,
  FireFilled,
  CalendarFilled,
} from "@ant-design/icons";
import { Tabs, DatePicker, message } from "antd";
import moment from "moment-timezone";

import { Button } from "antd";

import SyntaxHighlighter from "react-syntax-highlighter";

import MDEditor from "@uiw/react-md-editor";

import cardsApi from "../../api/cardsApi";

function General({ card, flipped }) {
  return (
    <div data-color-mode="light" className="h-full flex flex-col">
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
    <div className="h-full text-xs ">
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

  const onChange = async (date) => {
    update();
    const updated = date.format("YYYY-MM-DDTHH:mm:ssZ");
    try {
      await cardsApi.updateCard(cards[index].id, {
        next_review_date: updated,
      });
      success();
      handleNext();
    } catch (error) {
      updateError();
    }
  };

  const handleUpdate = async (difficulty) => {
    if (!cards[index]) {
      return;
    }
    update();
    const date = moment.utc(new Date());
    let nextDay;
    try {
      switch (difficulty) {
        case "hard":
          nextDay = date.add(1, "day");
          break;
        case "good":
          nextDay = date.add(3, "day");
          break;
        case "easy":
          nextDay = date.add(7, "day");
          break;
        default:
          nextDay = date.add(1, "day");
      }
      const formattedNextDay = nextDay.format("YYYY-MM-DDTHH:mm:ssZ");
      await cardsApi.updateCard(cards[index].id, {
        next_review_date: formattedNextDay,
      });
      success();
      handleNext();
    } catch (error) {
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

  if (cards.length === 0 || index >= cards.length) {
    return (
      <div className="flex items-center justify-center h-[32rem] flex-col">
        <FireFilled className="text-prim-500 text-6xl" />
        <h1 className="text-2xl text-prim-500">You've reviewed all cards</h1>
      </div>
    );
  }

  return (
    <div className="w-full sm:w-[500px] sm:mx-auto">
      <div className="p-4 mt-6">
        {!random && (
          <p className="pr-4 font-bold text-prim-500 text-sm">
            {index + 1} / {cards.length}
          </p>
        )}
        <div
          onClick={() => setFlipped(!flipped)}
          className="overflow-y-scroll h-[32rem] bg-white border border-gray-300 rounded-lg shadow-md p-2"
        >
          {tab === "general" ? (
            <General card={cards[index]} flipped={flipped} />
          ) : (
            <Code card={cards[index]} />
          )}
        </div>
      </div>
      <Tabs
        activeKey={tab}
        onChange={(key) => setTab(key)}
        centered
        items={[
          { key: "general", label: "General", icon: <ReadFilled /> },
          {
            key: "code",
            label: "Code",
            icon: <CodeFilled />,
            disabled:
              cards[index]?.code_snippet === null ||
              JSON.stringify(cards[index]?.code_snippet) === "{}",
          },
        ]}
      />
      {!random && (
        <div className="fixed bottom-0 bg-white w-full p-2 py-4 pb-8 border-t border-solid border-t-gray-300 flex gap-1 sm:w-[500px]">
          <Button
            onClick={handleNext}
            type="primary"
            size="large"
            className="!bg-red-600 w-1/4"
          >
            Repeat
          </Button>
          <Button
            size="large"
            onClick={() => handleUpdate("hard")}
            type="primary"
            className="w-1/4"
          >
            Hard
          </Button>
          <Button
            size="large"
            onClick={() => handleUpdate("good")}
            type="primary"
            className="w-1/4"
          >
            Good
          </Button>
          <Button
            size="large"
            onClick={() => handleUpdate("easy")}
            type="primary"
            className="w-1/4"
          >
            Easy
          </Button>
          <DatePicker
            onChange={onChange}
            needConfirm
            format={false}
            variant="borderless"
            placeholder={null}
            suffixIcon={<CalendarFilled className="text-prim-500" />}
          />
        </div>
      )}
      {contextHolder}
    </div>
  );
};

export default ReviewingCard;
