import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function TagChips({ items }) {
  return (
    <Stack direction="row" justifyContent="center" spacing={1}>
      {items.map((item) => (
        <Chip key={item} label={item} size="small" />
      ))}
    </Stack>
  );
}
