import React, { useEffect, useState } from "react";
import cardsApi from "../../api/cardsApi";
import CardModal from "../../components/CardModal";
import CardList from "../../components/CardList";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { debounce } from "../../utils";

import CircularProgress from "@mui/material/CircularProgress";

import Filter from "../../components/Filter";

const AllCardsPage = () => {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [filter, setFilter] = useState({
    tags: [],
    title: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSelectTags = (e, newTags) => {
    setFilter((prev) => ({
      ...prev,
      tags: newTags,
    }));
  };

  const handleChangeTitle = (e) => {
    setFilter((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const getCards = async (params) => {
    setLoading(true);
    try {
      const response = await cardsApi.getAllCards(params);
      setCards(response.cards);
      setTotalRecords(response.metadata.total_records);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (e, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  useEffect(() => {
    getCards({ ...filter, page: currentPage + 1, page_size: rowsPerPage });
  }, [filter, currentPage, rowsPerPage]);

  return (
    <Container sx={{ width: 600, maxWidth: "100%", pt: 5 }}>
      <Filter
        data={filter}
        onSelectTag={handleSelectTags}
        onChangeTitle={debounce(handleChangeTitle)}
        onChangePage={handleChangePage}
        onChangeRows={handleChangeRowsPerPage}
        pagination={{
          rowsPerPage: rowsPerPage,
          currentPage: currentPage,
          totalRecords: totalRecords,
        }}
      />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <CardList cards={cards} onItemClick={setCurrentCard} />
      )}
      <CardModal card={currentCard} onClose={() => setCurrentCard(null)} />
    </Container>
  );
};

export default AllCardsPage;
