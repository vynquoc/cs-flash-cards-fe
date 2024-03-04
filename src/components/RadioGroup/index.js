import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { LANGUAGE_LIST } from "../../constants";
import { capitalizeFirstLetter } from "../../utils";

export default function RowRadioButtonsGroup({ handleChange }) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Language</FormLabel>
      <RadioGroup
        onChange={(e) => handleChange(e.target.value)}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="tags"
      >
        {LANGUAGE_LIST.map((lang) => (
          <FormControlLabel
            key={lang}
            value={lang}
            control={<Radio />}
            label={capitalizeFirstLetter(lang)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
