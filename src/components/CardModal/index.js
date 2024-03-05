import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SyntaxHighlighter from "react-syntax-highlighter";
import rehypeHighlight from "rehype-highlight";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Divider from "@mui/material/Divider";

import cardsApi from "../../api/cardsApi";
import Alert from "@mui/material/Alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 800,
  minWidth: {
    md: 500,
  },
  overflow: "scroll",
  maxHeight: "500px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  fontSize: { xs: "0.7rem" },
  p: 4,
};

export default function CardModal({ card, onClose }) {
  const [snack, setSnack] = React.useState({
    open: false,
    severity: "success",
    message: "",
  });
  const handleDelete = async (id) => {
    try {
      await cardsApi.deleteCard(id);
      setSnack({
        open: true,
        severity: "success",
        message: "Successfully!",
      });
    } catch (error) {
      setSnack({
        open: true,
        severity: "error",
        message: "Error!",
      });
    }
  };
  const handleSnack = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack((prev) => ({ ...prev, open: false }));
  };
  return (
    <Modal open={card !== null} onClose={onClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: { xs: "8px" },
            alignItems: "center",
            mb: "8px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Link to={`/edit/${card?.id}`}>
              <Button
                variant="contained"
                size="small"
                sx={{ fontSize: { xs: "12px" } }}
              >
                Edit
              </Button>
            </Link>
            <Button
              size="small"
              onClick={() => handleDelete(card.id)}
              sx={{ fontSize: { xs: "12px" } }}
            >
              Delete
            </Button>
          </Box>

          <Button
            size="small"
            onClick={onClose}
            sx={{ fontSize: { xs: "12px" } }}
          >
            Close
          </Button>
        </Box>
        <Typography
          id="modal-modal-title"
          variant="p"
          component="h2"
          sx={{ my: "10px" }}
        >
          {card?.title}
        </Typography>
        <Divider />
        <Box sx={{ mt: "8px" }}>
          <Typography variant="p" component="h3" align="center">
            Description
          </Typography>
          <Markdown>{card?.description}</Markdown>
        </Box>
        <Divider />
        <Box sx={{ mt: "8px" }}>
          <Typography variant="p" component="h3" align="center">
            Content
          </Typography>
          <Markdown rehypePlugins={[rehypeHighlight]}>{card?.content}</Markdown>
        </Box>
        {card?.code_snippet !== null && (
          <>
            <Divider />
            <Box sx={{ mt: "8px" }} align="center">
              <Typography variant="p" component="h3">
                Code
              </Typography>
              <SyntaxHighlighter
                customStyle={{ with: "100%", fontSize: "10px" }}
                language={card?.code_snippet?.language}
              >
                {card?.code_snippet?.code}
              </SyntaxHighlighter>
            </Box>
          </>
        )}
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
      </Box>
    </Modal>
  );
}
