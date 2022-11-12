import { Box } from "@mui/material";
import ScholarshipTabs from "../components/Scholarship/ScholarshipTabs";

function ScholarshipListDirection() {
  return (
    <Box className="outline" maxWidth="xl" sx={{ display: "flex" }}>
      <ScholarshipTabs />
    </Box>
  );
}
export default ScholarshipListDirection;
