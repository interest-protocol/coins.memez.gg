import Resizer from 'react-image-file-resizer';

export const getResizedImage = async (file: File) =>
  new Promise<File | Blob>((resolve) => {
    Resizer.imageFileResizer(
      file,
      250,
      250,
      'JPEG',
      80,
      0,
      (blob) => resolve(blob as File | Blob),
      'blob'
    );
  });
