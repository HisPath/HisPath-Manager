import Switch from '@mui/material/Switch';
import { Box, Typography } from '@mui/material';

// table
import TableViewIcon from '@mui/icons-material/TableView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';

// card
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FontDownloadOutlinedIcon from '@mui/icons-material/FontDownloadOutlined';
function ModeSwitch({ card, setCard }) {
  const IconForSwitch = () => {
    if (card)
      return (
        <>
          <Typography variant="h5">Card&nbsp;</Typography>
          <FontDownloadOutlinedIcon fontSize={'medium'} />
        </>
      );
    else
      return (
        <>
          <Typography variant="h5">Table&nbsp;</Typography>
          <FeaturedPlayListOutlinedIcon fontSize={'medium'} />
        </>
      );
  };
  return (
    <>
      <Box container display="flex" justifyContents={'right'} paddingTop="6px">
        <IconForSwitch />
      </Box>
      <Switch
        color={card ? 'primary' : 'secondary'}
        componentsProps={{ input: { 'aria-label': 'card mode' } }}
        checked={card}
        label="View Mode"
        onChange={(event) => {
          setCard(event.target.checked);
        }}
      />
    </>
  );
}
export default ModeSwitch;
