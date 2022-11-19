import React from "react";
import { Grid } from "@mui/material";
import AnalyticsCurrentVisits from "./AnalyticsCurrentVisitis";
import { useTheme } from "@mui/material/styles";
import FileGeneralDataActivity from "./FileGeneralDataActivity";
import { Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardContent } from "@mui/material";
import ChartBar from "./ChartBar";
import { Container } from "@mui/material";

const ScholarshipListChart = () => {
  const theme = useTheme();

  const TIME_LABELS = {
    week: [
      "전산전자",
      "국제어문",
      "경영경제",
      "법학부",
      "커뮤니케이션",
      "상담복지",
      "공간환경시스템",
      "콘텐츠융합디자인",
      "기계제어",
      "ICT창업",
      "생명과학",
    ],
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <AnalyticsCurrentVisits
            title="학년별 마일리지 수혜 인원"
            chart={{
              series: [
                { label: "1학년", value: 20 },
                { label: "2학년", value: 43 },
                { label: "3학년", value: 76 },
                { label: "4힉년", value: 51 },
              ],
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ],
            }}
          />
        </Grid>

        <Grid item xs={12} md={7}>
          <Card dir="ltr">
            <CardHeader title="마일리지 가중치 평균" />
            <CardContent>
              <ChartBar />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={16}>
          <FileGeneralDataActivity
            title="학부/학년별 마일리지 수혜 인원"
            chart={{
              labels: TIME_LABELS,
              colors: [
                theme.palette.primary.main,
                theme.palette.error.main,
                theme.palette.warning.main,
                theme.palette.text.disabled,
              ],
              series: [
                {
                  type: "Week",
                  data: [
                    {
                      name: "1학년",
                      data: [20, 1, 0, 1, 5, 0, 0, 5, 15, 18, 9],
                    },
                    {
                      name: "2학년",
                      data: [43, 5, 3, 2, 13, 2, 3, 10, 30, 65, 21],
                    },
                    {
                      name: "3학년",
                      data: [76, 14, 6, 2, 21, 1, 5, 21, 45, 65, 27],
                    },
                    {
                      name: "4학년",
                      data: [51, 13, 10, 1, 15, 2, 3, 17, 36, 65, 26],
                    },
                  ],
                },
              ],
            }}
          />

          <div>
            {/* <FilePanel
                title="Folders"
                link={PATH_DASHBOARD.fileManager}
                onOpen={handleOpenNewFolder}
                sx={{ mt: 5 }}
              /> */}

            {/* <Scrollbar>
                <Stack direction="row" spacing={3} sx={{ pb: 3 }}>
                  {_folders.map((folder) => (
                    <FileFolderCard
                      key={folder.id}
                      folder={folder}
                      onDelete={() => console.log("DELETE", folder.id)}
                      sx={{
                        ...(_folders.length > 3 && {
                          minWidth: 222,
                        }),
                      }}
                    />
                  ))}
                </Stack>
              </Scrollbar> */}

            {/* <FilePanel
                title="Recent Files"
                link={PATH_DASHBOARD.fileManager}
                onOpen={handleOpenUploadFile}
                sx={{ mt: 2 }}
              /> */}

            {/* <Stack spacing={2}>
                {_files.slice(0, 5).map((file) => (
                  <FileGeneralRecentCard
                    key={file.id}
                    file={file}
                    onDelete={() => console.log("DELETE", file.id)}
                  />
                ))}
              </Stack> */}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ScholarshipListChart;
