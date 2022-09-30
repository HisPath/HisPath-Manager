import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import tables
// import Visible from './tables/Visible_Table';
// import Invisible from './tables/Invisible_Table';
// import Waiting from './tables/Reserved_Table';
import TT from './tables/TT';
import TT_IMP from './tables/TT_IMP';
import TT_EXP from './tables/TT_EXP';
import TT_WAIT from './tables/TT_WAIT';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Notice_Tab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All Notice" {...a11yProps(0)} />
          <Tab label="Important Notice" {...a11yProps(1)} />
          <Tab label="Reserved Notice" {...a11yProps(2)} />
          <Tab label="Expired Notice" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TT />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TT_IMP />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TT_WAIT />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TT_EXP />
      </TabPanel>
    </Box>
  );
}
