import { useState } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

export default function PriceSlider() {
  const [value, setValue] = useState([5, 1500]); // min & max initial

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        valueLabelFormat={(val) => `$${val}`}
        min={5}
        max={1500}
        step={1}
        sx={{
          width: "100%",
          color: "#000000",
          "& .MuiSlider-thumb": {
            backgroundColor: "#000000",
            border: "1px solid #000000",
            '&:hover, &.Mui-focusVisible, &.Mui-active': {
              backgroundColor: "#222222",
              boxShadow: '0 0 0 8px rgba(0,0,0,0.16)',
            },
          },
          "& .MuiSlider-track": { border: "none" },
          "& .MuiSlider-rail": { color: "#b0b0b0" },

          // تعديل الـ valueLabel
          "& .MuiSlider-valueLabel": {
            top: "50px", 
            background: "none", 
            color: "#000000", 
            fontWeight: "bold",
          },
        }}
      />
    </Box>
  );
}
