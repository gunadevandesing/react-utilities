"use client";
import { useRef, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import styles from "./page.module.css";

const ImageToBaseStringConvertor = () => {
  const fileRef = useRef(null);
  const [imageString, setImageString] = useState("");

  const uploadOpen = () => {
    fileRef?.current?.click();
  };

  const convertToBaseString = () => {
    if (fileRef?.current?.files?.length > 0) {
      const file = fileRef.current.files[0];

      const reader = new FileReader();

      reader.onloadend = () => {
        setImageString(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      console.error("No file selected");
    }
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(imageString);
  };

  return (
    <div className="mx-2">
      <Stack direction="horizontal" gap={3} className="my-2">
        <input ref={fileRef} hidden type="file" accept="jpeg,png" />
        <Button variant="primary" onClick={uploadOpen}>
          Upload File
        </Button>
        <Button variant="primary" onClick={convertToBaseString}>
          Convert to Base String
        </Button>
      </Stack>
      <Stack direction="vertical" gap={3}>
        <div>
          <h5>Base string</h5>
          <div className={styles.baseString}>{imageString}</div>
          <Button
            className="my-2"
            variant="primary"
            onClick={copyToClipBoard}
            disabled={!imageString}
          >
            Copy
          </Button>
        </div>
      </Stack>
    </div>
  );
};
export default ImageToBaseStringConvertor;
