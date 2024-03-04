import React from "react";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TablePagination from "@mui/material/TablePagination";
import { TAG_LIST } from "../../constants";

const Filter = ({
  data,
  pagination,
  onSelectTag,
  onChangeTitle,
  onChangePage,
  onChangeRows,
}) => {
  return (
    <div>
      <TextField
        fullWidth
        label="Search"
        size="small"
        onChange={(e) => onChangeTitle(e)}
      />
      <ToggleButtonGroup
        color="primary"
        value={data.tags}
        onChange={onSelectTag}
        fullWidth
        sx={{ mt: "10px" }}
      >
        {TAG_LIST.map((tag) => (
          <ToggleButton
            key={tag}
            value={tag}
            size="small"
            sx={{ fontSize: { md: "0.7rem", xs: "0.6rem" } }}
          >
            {tag}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {pagination.totalRecords > 0 && (
        <TablePagination
          component="div"
          count={pagination?.totalRecords}
          page={pagination?.currentPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRows}
          rowsPerPage={pagination.rowsPerPage}
          labelRowsPerPage="Cards per page:"
          rowsPerPageOptions={[5, 10, 15, 20]}
        />
      )}
    </div>
  );
};

export default Filter;
