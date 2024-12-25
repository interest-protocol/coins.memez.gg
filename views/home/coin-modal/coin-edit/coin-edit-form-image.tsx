import { Img } from '@stylin.js/elements';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { IEditForm } from './coin-edit.types';

const CoinEditFormImage: FC = () => {
  const { control } = useFormContext<IEditForm>();
  const [imageError, setImageError] = useState(false);
  const [name, imageUrl] = useWatch({ control, name: ['name', 'imageUrl'] });

  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  return (
    <Img
      alt={name}
      width="1.5rem"
      height="1.5rem"
      objectFit="cover"
      borderRadius="0.25rem"
      onError={() => setImageError(true)}
      src={imageError ? '/default-image.webp' : imageUrl}
    />
  );
};

export default CoinEditFormImage;
