import { FormControlLabel, FormGroup, Switch } from "@mui/material";

function ModeSwitch({ card, setCard }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            color={card ? "primary" : "secondary"}
            componentsProps={{ input: { "aria-label": "card mode" } }}
            checked={card}
            label="View Mode"
            onChange={(event) => {
              setCard(event.target.checked);
            }}
          />
        }
        labelPlacement="start"
        label={`Select View Mode: ${card ? "Card Mode" : "Table Mode"}`}
      />
    </FormGroup>
  );
}
export default ModeSwitch;