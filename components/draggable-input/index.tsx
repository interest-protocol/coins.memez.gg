import { Div, Input, Label, P } from '@stylin.js/elements';
import { ChangeEventHandler, DragEventHandler, FC, useState } from 'react';

import { getResizedImage } from '@/utils';

import { FileUploadSVG } from '../svg';
import { DraggableInputProps } from './draggable-input.types';

const DraggableInput: FC<DraggableInputProps> = ({
  advice,
  onFailure,
  validTypes,
  setFileUrl,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return onFailure?.('No file found');

    if (!validTypes.some((type) => file.type.includes(type)))
      return onFailure?.('Make sure that you are sending a image file');

    const form = new FormData();

    const resizedImage = await getResizedImage(file);

    form.append('file', resizedImage, file.name);

    const imageUrl = await fetch(process.env.NEXT_PUBLIC_FILE_UPLOAD_API!, {
      method: 'POST',
      body: form,
    })
      .then((res) => res.json())
      .then((data) => data.url)
      .catch();

    if (!imageUrl) return onFailure?.('Could not convert the file to url');

    setFileUrl(imageUrl);
  };

  const handleDropFile: DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      const item = e.dataTransfer.items[0];

      if (
        item.kind !== 'file' ||
        !validTypes.some((type) => item.type.includes(type))
      )
        return onFailure?.('Make sure that you are sending a image file');

      const file = item.getAsFile();

      if (!file) return onFailure?.('No file found');

      const form = new FormData();

      const resizedImage = await getResizedImage(file);

      form.append('file', resizedImage, file.name);

      const imageUrl = await fetch(process.env.NEXT_PUBLIC_FILE_UPLOAD_API!, {
        method: 'POST',
        body: form,
      })
        .then((res) => res.json())
        .then((data) => data.url)
        .catch();

      if (!imageUrl) return onFailure?.('Could not convert the file to url');

      setFileUrl(imageUrl);

      return;
    }

    const file = e.dataTransfer.files[0];

    if (!file) return onFailure?.('Something went wrong');

    if (!file.type.includes('image/'))
      return onFailure?.('Make sure that you are sending a image file');

    const form = new FormData();

    const resizedImage = await getResizedImage(file);

    form.append('file', resizedImage, file.name);

    const imageUrl = await fetch(process.env.NEXT_PUBLIC_FILE_UPLOAD_API!, {
      method: 'POST',
      body: form,
    })
      .then((res) => res.json())
      .then((data) => data.url)
      .catch();

    if (!imageUrl) return onFailure?.('Could not convert the file to url');

    setFileUrl(imageUrl);
  };

  return (
    <Div
      gap="1rem"
      p="0.75rem"
      display="flex"
      color="#F5B722"
      borderWidth="1px"
      alignItems="center"
      borderRadius="0.5rem"
      flexDirection="column"
      onDrop={handleDropFile}
      bg="rgba(245, 183, 34, 0.05)"
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDragOver={(e) => e.preventDefault()}
      borderStyle={dragging ? 'solid' : 'dashed'}
      borderColor={dragging ? '#F5B722' : '#F5B722'}
    >
      <Label
        p="0.625rem"
        gap="0.5rem"
        width="100%"
        display="flex"
        color="primary"
        cursor="pointer"
        border="1px solid"
        alignItems="center"
        borderRadius="0.375rem"
        justifyContent="center"
      >
        <FileUploadSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        <P>
          Drop your file here or upload
          <Input
            type="file"
            display="none"
            onChange={handleChangeFile}
            accept={`${validTypes.join('*,')}*`}
          />
        </P>
      </Label>
      {advice && <P color="#FFFFFF">{advice}</P>}
    </Div>
  );
};

export default DraggableInput;
