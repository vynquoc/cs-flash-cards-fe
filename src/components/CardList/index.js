import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import TagChips from "../TagsChip";
const CardList = ({ cards, onItemClick }) => {
  return (
    <Container disableGutters>
      {cards.length > 0 ? (
        <>
          {cards.map((card) => (
            <Box
              onClick={() => onItemClick(card)}
              key={card.id}
              sx={{
                height: "100%",
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#EBEBEB",
                mb: "10px",
                p: "10px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              <Typography sx={{ fontSize: "0.8rem", fontWeight: "500" }}>
                {card.title}
              </Typography>
              <TagChips items={card.tags} />
            </Box>
          ))}
        </>
      ) : (
        <Box>No cards</Box>
      )}
    </Container>
  );
};

export default CardList;
