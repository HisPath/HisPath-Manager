import {
  Box,
  Card,
  CardHeader,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import profileBgImage from "../../assets/plant-2004483_1920.jpg";
import Image from "../image";
import EditProfileModal from "./EditProfileModal";

function UserCard({ dashboardInfo, loadData }) {
  return (
    <Card sx={{ textAlign: "center" }}>
      <Box sx={{ position: "relative" }}>
        <Image src={profileBgImage} ratio="16/9" />
      </Box>
      <CardHeader
        title={`${dashboardInfo.name} 관리자`}
        subheader={dashboardInfo.department}
      />
      <Box sx={{ my: 3 }}>
        <Link href={`mailto:${dashboardInfo.email}`} color="text.primary">
          {dashboardInfo.email}
        </Link>
      </Box>
      <Box sx={{ mb: 3 }}>
        <EditProfileModal dashboardInfo={dashboardInfo} loadData={loadData} />
      </Box>
      <Divider sx={{ borderStyle: "dashed" }} />
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ py: 2 }}>
        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            승인 여부
          </Typography>
          <Typography
            variant="subtitle1"
            color={dashboardInfo.approved ? "success.main" : "error.main"}
          >
            {dashboardInfo.approved ? "승인" : "미승인"}
          </Typography>
        </div>
        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            권한
          </Typography>
          <Typography
            variant="subtitle1"
            color={() => {
              if (dashboardInfo.power === 2) return "success.main";
              if (dashboardInfo.power === 1) return "warning.main";
              return "error.main";
            }}
          >
            {dashboardInfo.power === 2 && "슈퍼"}
            {dashboardInfo.power === 1 && "일반"}
            {dashboardInfo.power === 0 && "미승인"}
          </Typography>
        </div>
      </Box>
    </Card>
  );
}

export default UserCard;
