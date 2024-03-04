import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SyntaxHighlighter from "react-syntax-highlighter";
import rehypeHighlight from "rehype-highlight";
import Container from "@mui/material/Container";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";

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
  return (
    <Container>
      <Modal open={card !== null} onClose={onClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to={`/edit/${card?.id}`}>
              <Button variant="contained" size="small">
                Edit
              </Button>
            </Link>

            <Button size="small" onClick={onClose}>
              Close
            </Button>
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {card?.title}
          </Typography>
          <Box>
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {card?.content}
            </Markdown>
          </Box>
          {card?.code_snippet !== null && (
            <SyntaxHighlighter
              customStyle={{ with: "100%", fontSize: "10px" }}
              language={card?.code_snippet?.language}
            >
              {card?.code_snippet?.code}
            </SyntaxHighlighter>
          )}
        </Box>
      </Modal>
    </Container>
  );
}
