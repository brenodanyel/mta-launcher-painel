import { useEffect, useState } from 'react';
import { Button, Icon } from '@mui/material';

type FileInputProps = {
  disabled?: boolean;
  value: string;
  setValue: (value: FileInputProps['value']) => void;
  title: string;
  accept?: string;
  blob?: Blob | null;
  setBlob: (blob: FileInputProps['blob']) => void;
};

export function FileInput(props: FileInputProps) {
  const [mounted, setMounted] = useState(false);
  const { disabled, value, setValue, title, accept, blob, setBlob } = props;

  useEffect(() => {
    if (!mounted) {
      return;
    }

    if (!blob) {
      setValue('');
      return;
    }

    const objectUrl = URL.createObjectURL(blob);
    setValue(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [blob?.name]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      disabled={disabled}
      variant='text'
      color='inherit'
      component='label'
      sx={{
        height: '100%',
        width: '100%',
        border: '1px solid',
        borderColor: 'grey.700',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1em',
      }}
    >
      {title}
      {value ? (
        <img
          src={blob ? value : value + '?' + Date.now()}
          alt={title}
          style={{
            width: '64px',
            height: '64px',
            objectFit: 'cover',
            borderRadius: '10px',
          }}
        />
      ) : (
        <Icon fontSize='large'>collections</Icon>
      )}
      <input
        hidden
        accept={accept}
        type='file'
        onChange={(e) => {
          setBlob(e.target.files?.item(0) || null);
        }}
      />
    </Button>
  );
}
