import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import SyntaxHighlighter from "react-syntax-highlighter";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CustomTextarea from "../Textarea";
import Markdown from "react-markdown";

import MultipleSelectChip from "../Chip";
import RowRadioButtonsGroup from "../RadioGroup";
import cardsApi from "../../api/cardsApi";

export default function CardForm({ card, mode }) {
  const [loading, setLoading] = useState(false);

  const [cardInfo, setCardInfo] = useState({
    title: card?.title || "",
    content: card?.content || "",
    tags: card?.tags || [],
    code_snippet: card?.code_snippet || null,
    description: card?.description || "",
  });
  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  useEffect(() => {
    if (card) {
      setCardInfo(card);
    }
  }, [card]);

  const handleChange = (name, value) => {
    if (name.includes(".")) {
      const [outer, inner] = name.split(".");
      setCardInfo((prev) => ({
        ...prev,
        [outer]: {
          ...prev[outer],
          [inner]: value,
        },
      }));
    } else {
      setCardInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleLanguage = (value) => {
    setCardInfo((prev) => ({
      ...prev,
      code_snippet: {
        ...prev["code_snippet"],
        language: value,
      },
    }));
  };

  const handleSelectTags = (tags) => {
    setCardInfo((prev) => ({
      ...prev,
      tags: tags,
    }));
  };

  const handleSnack = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "add") {
        await cardsApi.createCard(cardInfo);
      } else {
        const data = {};
        for (const [key, value] of Object.entries(cardInfo)) {
          if (value !== card[key]) {
            data[key] = value;
          }
        }
        await cardsApi.updateCard(card.id, data);
      }
      setSnack({
        open: true,
        severity: "success",
        message: "Successfully!",
      });
      setCardInfo({
        title: "",
        content: "",
        tags: [],
        code_snippet: null,
      });
    } catch (error) {
      setSnack({
        open: true,
        severity: "error",
        message: "Errorrrrr!",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Container
        component="main"
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <CssBaseline />
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mt: "15px" }}
        >
          <Typography variant="h5" component="h5">
            {mode === "add" ? "Add Card" : `Edit ${card?.id}`}
          </Typography>
          <LoadingButton
            onClick={handleSubmit}
            loading={loading}
            variant="contained"
          >
            <span>Save</span>
          </LoadingButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  onChange={(e) => handleChange("title", e.target.value)}
                  value={cardInfo.title}
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <MultipleSelectChip
                  onSelect={handleSelectTags}
                  value={cardInfo.tags}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  Description
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextarea
                  name="description"
                  value={cardInfo.description}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Markdown>{cardInfo.description}</Markdown>
              </Grid>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  Content
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextarea
                  name="content"
                  value={cardInfo.content}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Markdown>{cardInfo.content}</Markdown>
              </Grid>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6">
                  Code snippet
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <RowRadioButtonsGroup handleChange={handleLanguage} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextarea
                  name="code_snippet.code"
                  value={cardInfo.code_snippet?.code}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SyntaxHighlighter language={cardInfo.code_snippet?.language}>
                  {cardInfo.code_snippet?.code}
                </SyntaxHighlighter>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={snack.open}
          autoHideDuration={2000}
          onClose={handleSnack}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnack}
            severity={snack.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snack.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
