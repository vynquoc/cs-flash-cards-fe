import React, { useState } from "react";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import SyntaxHighlighter from "react-syntax-highlighter";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";

import cardsApi from "../../api/cardsApi";

const ReviewingCard = ({ cards, random }) => {
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState(0);
  const [snack, setSnack] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (index < cards.length - 1) {
      setIndex((prev) => prev + 1);
      setFlipped(false);
      setTab(0);
    }
  };

  const handleTab = (e, value) => {
    setTab(value);
  };

  const handleSnack = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack(false);
  };

  const handleDone = async () => {
    setLoading(true);
    try {
      await cardsApi.updateCard(cards[index].id, { update_review_date: true });
      setSnack(true);
      handleNext();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {cards.length > 0 ? (
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            padding: "15px",
            marginTop: "30px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Tabs value={tab} onChange={handleTab}>
              <Tab label="General" />
              <Tab
                label="Code"
                disabled={cards[index]?.code_snippet === null}
              />
            </Tabs>
            <Box sx={{ height: "300px" }}>
              {flipped ? (
                tab === 0 ? (
                  <Box
                    maxHeight="300px"
                    sx={{ overflow: "scroll", fontSize: "0.7rem" }}
                  >
                    <Markdown rehypePlugins={[rehypeHighlight]}>
                      {cards[index]?.content}
                    </Markdown>
                  </Box>
                ) : (
                  <Box
                    maxHeight="300px"
                    sx={{
                      overflowY: "scroll",
                      fontSize: "0.7rem",
                      height: "300px",
                      overflowX: "scroll",
                    }}
                  >
                    <SyntaxHighlighter
                      customStyle={{ with: "100%", fontSize: "10px" }}
                      language={cards[index]?.code_snippet?.language}
                    >
                      {cards[index]?.code_snippet?.code}
                    </SyntaxHighlighter>
                  </Box>
                )
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography component="h6" variant="h6">
                    {cards[index]?.title}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <Button variant="contained" onClick={() => setFlipped(!flipped)}>
              Flip
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>{`${index + 1} / ${cards.length}`}</Typography>
              {!random && (
                <LoadingButton
                  size="small"
                  onClick={handleDone}
                  loading={loading}
                  variant="contained"
                >
                  <span>Done</span>
                </LoadingButton>
              )}
            </Box>
            <Button
              disabled={index === cards.length - 1}
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          </Box>
          <Snackbar
            open={snack}
            autoHideDuration={2000}
            onClose={handleSnack}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleSnack}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Update successfully!
            </Alert>
          </Snackbar>
        </Container>
      ) : (
        <Box sx={{ textAlign: "center" }}>No cards today</Box>
      )}
    </>
  );
};

export default ReviewingCard;
