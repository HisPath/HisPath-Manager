import { useEffect, useRef } from 'react';
import { Box, Button } from '@mui/material';
import { Editor } from '@toast-ui/react-editor';
import { Link, useParams } from 'react-router-dom';
import '@toast-ui/editor/dist/toastui-editor.css';
import AWS from 'aws-sdk';

export default function Editor2({ value, editorHandler, setsave }) {
  const editorRef = useRef();

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  });

  const uploadBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_S3_BUCKET },
    region: process.env.REACT_APP_S3_REGION,
  });

  const init = () => {
    console.log(value);
    editorRef.current?.getInstance().setHTML(value || ' ');
  };
  useEffect(() => {
    init();
  }, [value]);
  const editorChangeHandler = async () => {
    await editorHandler(replaceATag(replaceImgTag(editorRef.current?.getInstance().getHTML())));
  };
  const replaceImgTag = () => {
    var s = editorRef.current?.getInstance().getHTML();
    return s.replace(
      '<img ',
      "<img width='70%' height='auto' style='display: block; margin: 0 auto' ",
    );
  };
  const replaceATag = (s) => {
    return s.replace('<a ', "<a target='_blank' ");
  };

  const saveHandler = async () => {
    await editorChangeHandler();
    setsave(true);
  };
  const uploadFile = (file) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: 'upload/' + file.name,
      ContentType: 'image/jpeg',
    };

    uploadBucket.putObject(params).send((err) => {
      if (err) console.log(err);
    });
  };

  return (
    <div>
      <Editor
        ref={editorRef} // DOM 선택용 useRef
        placeholder="내용을 입력해주세요."
        previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'} // 미리보기 스타일 지정
        height="calc(100vh - 350.5px)" // 에디터 창 높이
        initialEditType="wysiwyg"
        initialValue={value || ' '}
        value={value}
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['image'],
        ]}
        hideModeSwitch={true}
        useCommandShortcut={true} // 키보드 입력 컨트롤
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            console.log(blob);
            uploadFile(blob);
            callback(
              `https://shine-jung-test-bucket.s3.ap-northeast-2.amazonaws.com/upload/${blob.name}`,
            );
          },
        }}
      />
      <Box container gap={1} display="flex" justifyContent={'right'} pt={1} paddingRight={0}>
        <Button variant="contained" onClick={saveHandler}>
          저장
        </Button>
        <Link
          to={{ pathname: '/notice' }}
          style={{
            textDecoration: 'none',
          }}
        >
          <Button variant="outlined" color="error">
            뒤로가기
          </Button>
        </Link>
      </Box>
    </div>
  );
}
