import { useState } from "react";
import { Line, Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Bar } from "react-chartjs-2";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import AnalyticsCurrentVisits from "./AnalyticsCurrentVisitis";
import { useTheme } from "@mui/material/styles";
import FileGeneralDataActivity from "./FileGeneralDataActivity";
import { Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardContent } from "@mui/material";
import ChartBar from "./ChartBar";

const ScholarshipListChart = () => {
  const theme = useTheme();

  const TIME_LABELS = {
    week: ["Mon", "Tue", "Web", "Thu", "Fri", "Sat", "Sun"],
    month: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    year: ["2018", "2019", "2020", "2021", "2022"],
  };

  return (
    <Box>
      {/* <Box m={3} pb={3} display={"flex"}> */}
      {/* <Paper sx={{ width: "calc(30vw)", m: 2 }}> */}
      <Grid item xs={12} md={6} lg={4}>
        <AnalyticsCurrentVisits
          title="학년별 마일리지 수혜 인원"
          chart={{
            series: [
              { label: "1학년", value: 4344 },
              { label: "2학년", value: 5435 },
              { label: "3학년", value: 1443 },
              { label: "4힉년", value: 4443 },
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
      <Grid item xs={12} md={6}>
        <Card dir="ltr">
          <CardHeader title="마일리지 가중치 평균" />
          <CardContent>
            <ChartBar />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={16}>
        <FileGeneralDataActivity
          title="학부/학년별 마일리지 수헤 인원"
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
                  { name: "Images", data: [20, 34, 48, 65, 37, 48] },
                  { name: "Media", data: [10, 34, 13, 26, 27, 28] },
                  { name: "Documents", data: [10, 14, 13, 16, 17, 18] },
                  { name: "Other", data: [5, 12, 6, 7, 8, 9] },
                ],
              },
              {
                type: "Month",
                data: [
                  {
                    name: "Images",
                    data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                  },
                  {
                    name: "Media",
                    data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                  },
                  {
                    name: "Documents",
                    data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                  },
                  {
                    name: "Other",
                    data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                  },
                ],
              },
              {
                type: "Year",
                data: [
                  { name: "Images", data: [10, 34, 13, 56, 77] },
                  { name: "Media", data: [10, 34, 13, 56, 77] },
                  { name: "Documents", data: [10, 34, 13, 56, 77] },
                  { name: "Other", data: [10, 34, 13, 56, 77] },
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
      {/* </Paper>
      </Box> */}
    </Box>
  );
};

export default ScholarshipListChart;
