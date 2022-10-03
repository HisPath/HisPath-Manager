import { useState } from "react";
import AWS from "aws-sdk";
import { Alert, Box, Button, Input, Typography } from "@mui/material";

function S3Upload() {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  });

  const uploadBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_S3_BUCKET },
    region: process.env.REACT_APP_S3_REGION,
  });

  const handleFileInput = (e) => {
    // 파일 type 유효성 검사
    // const file = e.target.files[0];
    // const fileExt = file.name.split(".").pop();
    // if (file.type !== "image/jpeg" || fileExt !== "jpg") {
    //   alert("jpg 파일만 Upload 가능합니다.");
    //   return;
    // }
    setProgress(0);
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: "upload/" + file.name,
      ContentType: "image/jpeg",
    };

    uploadBucket
      .putObject(params)
      .on("httpUploadProgress", (event) => {
        setProgress(Math.round((event.loaded / event.total) * 100));
        setShowAlert(true);
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <>
      <h1>File Upload</h1>
      <Box display="flex" gap={2}>
        <Input color="primary" type="file" onChange={handleFileInput} />
        {selectedFile ? (
          <Button
            color="primary"
            variant="outlined"
            onClick={() => uploadFile(selectedFile)}
          >
            Upload to S3
          </Button>
        ) : null}
      </Box>
      <Box width={500} mt={3}>
        {showAlert ? (
          progress === 100 ? (
            <>
              <Alert severity="success" sx={{ mb: 1 }}>
                완료되었습니다.
              </Alert>
              <Box
                component="a"
                target="_blank"
                href={`https://shine-jung-test-bucket.s3.ap-northeast-2.amazonaws.com/upload/${selectedFile.name}`}
              >
                <Typography variant="caption">{`https://shine-jung-test-bucket.s3.ap-northeast-2.amazonaws.com/upload/${selectedFile.name}`}</Typography>
              </Box>
              <Box
                mt={0.5}
                component="img"
                src={`https://shine-jung-test-bucket.s3.ap-northeast-2.amazonaws.com/upload/${selectedFile.name}`}
                alt="업로드 한 이미지"
                height={200}
              />
            </>
          ) : (
            <Alert severity="warning" color="primary">
              업로드 진행률 : {progress}%
            </Alert>
          )
        ) : (
          <Alert severity="info" color="primary">
            파일을 선택해 주세요.
          </Alert>
        )}
      </Box>
    </>
  );
}

export default S3Upload;
