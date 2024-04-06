import React, { useState } from "react";
import { CodeFilled, ReadFilled } from "@ant-design/icons";
import { Tabs, message } from "antd";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "antd";
import Divider from "@mui/material/Divider";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import SyntaxHighlighter from "react-syntax-highlighter";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import MDEditor from "@uiw/react-md-editor";

import cardsApi from "../../api/cardsApi";

const tabs = [
  {
    key: "general",
    label: "General",
    children: <General />,
    icon: <ReadFilled />,
  },
  {
    key: "code",
    label: "Code",
    children: <div>code</div>,
    icon: <CodeFilled />,
  },
];

function General({ card, flipped }) {
  return (
    <div data-color-mode="light" className="h-[300px] overflow-y-scroll">
      {!flipped ? (
        <div>
          <h3 className="font-semibold text-lg">{card?.title}</h3>
          <div>
            <MDEditor.Markdown source={card?.description} />
          </div>
        </div>
      ) : (
        <MDEditor.Markdown source={card?.content} />
      )}
    </div>
  );
}

function Code({ card }) {
  return (
    <div className="h-[300px]">
      <SyntaxHighlighter
        customStyle={{ fontSize: "1rem" }}
        language={card?.code_snippet?.language}
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
      duration: 0,
    });
    setTimeout(messageApi.destroy, 1500);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Updated!",
      duration: 0,
    });
    setTimeout(messageApi.destroy, 1500);
  };

  const updateError = () => {
    messageApi.open({
      type: "error",
      content: "Something wrong!",
    });
  };

  return (
    <div className="w-[500px] mx-auto max-sm:w-full max-sm:rounded-none mt-10 border p-4 rounded-xl">
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
      <div className={`flex ${random ? "justify-center" : "justify-between"}`}>
        {!random && (
          <Button
            type="primary"
            onClick={handlePrev}
            disabled={index === 0}
            className="font-bold"
          >
            Prev
          </Button>
        )}
        <Button
          onClick={() => setFlipped(!flipped)}
          type="primary"
          className="font-bold"
        >
          Flip
        </Button>
        {!random && (
          <Button
            onClick={handleNext}
            type="primary"
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
            onClick={handleDone}
          >
            Got it
          </Button>
        </div>
      )}
      {contextHolder}
    </div>
    // <>
    //   {cards.length > 0 ? (
    //     <Container
    //       component="main"
    //       maxWidth="sm"
    //       sx={{
    //         padding: "15px",
    //         marginTop: "30px",
    //         boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexDirection: "column",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Tabs value={tab} onChange={handleTab}>
    //           <Tab label="General" />
    //           <Tab
    //             label="Code"
    //             disabled={cards[index]?.code_snippet === null}
    //           />
    //         </Tabs>
    //         <Box sx={{ height: "300px" }}>
    //           {flipped ? (
    //             tab === 0 ? (
    //               <Box
    //                 maxHeight="300px"
    //                 sx={{ overflow: "scroll", fontSize: "0.7rem" }}
    //               >
    //                 <Markdown rehypePlugins={[rehypeHighlight]}>
    //                   {cards[index]?.content}
    //                 </Markdown>
    //               </Box>
    //             ) : (
    //               <Box
    //                 maxHeight="300px"
    //                 sx={{
    //                   overflowY: "scroll",
    //                   fontSize: "0.7rem",
    //                   height: "300px",
    //                   overflowX: "scroll",
    //                 }}
    //               >
    //                 <SyntaxHighlighter
    //                   customStyle={{ with: "100%", fontSize: "10px" }}
    //                   language={cards[index]?.code_snippet?.language}
    //                 >
    //                   {cards[index]?.code_snippet?.code}
    //                 </SyntaxHighlighter>
    //               </Box>
    //             )
    //           ) : (
    //             <Box
    //               sx={{
    //                 display: "flex",
    //                 height: "100%",
    //                 flexDirection: "column",
    //                 overflowY: "scroll",
    //               }}
    //             >
    //               <Typography component="h6" variant="h6">
    //                 {cards[index]?.title}
    //               </Typography>
    //               <Markdown>{cards[index]?.description}</Markdown>
    //             </Box>
    //           )}
    //         </Box>
    //       </Box>
    //       <Divider />
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //           marginTop: "15px",
    //         }}
    //       >
    //         <Button variant="contained" onClick={() => setFlipped(!flipped)}>
    //           Flip
    //         </Button>
    //         <Box
    //           sx={{
    //             display: "flex",
    //             flexDirection: "column",
    //             justifyContent: "space-between",
    //             alignItems: "center",
    //           }}
    //         >
    //           <Typography>{`${index + 1} / ${cards.length}`}</Typography>
    //           {!random && (
    //             <LoadingButton
    //               size="small"
    //               onClick={handleDone}
    //               loading={loading}
    //               variant="contained"
    //             >
    //               <span>Done</span>
    //             </LoadingButton>
    //           )}
    //         </Box>
    //         <Button
    //           disabled={index === cards.length - 1}
    //           variant="contained"
    //           onClick={handleNext}
    //         >
    //           Next
    //         </Button>
    //       </Box>
    //       <Snackbar
    //         open={snack}
    //         autoHideDuration={2000}
    //         onClose={handleSnack}
    //         anchorOrigin={{ vertical: "top", horizontal: "center" }}
    //       >
    //         <Alert
    //           onClose={handleSnack}
    //           severity="success"
    //           variant="filled"
    //           sx={{ width: "100%" }}
    //         >
    //           Update successfully!
    //         </Alert>
    //       </Snackbar>
    //     </Container>
    //   ) : (
    //     <Box sx={{ textAlign: "center" }}>No cards today</Box>
    //   )}
    // </>
  );
};

export default ReviewingCard;
