import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';

type FileInputProps = {
  disabled?: boolean;
  value: string;
  setValue: (value: string) => void;
  title: string;
  accept?: string;
};

export function FileInput(props: FileInputProps) {
  const [selectedFile, setSelectedFile] = useState<File>();

  const { disabled, value, setValue, title, accept } = props;

  useEffect(() => {
    if (!selectedFile) {
      setValue('');
      return;
    }

    if (selectedFile.size > 1024 * 1024) {
      toast.error('File size must be less than 1MB');
      setValue('');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setValue(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

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
          src={value}
          alt={title}
          style={{
            width: '128px',
            height: '128px',
            objectFit: 'cover',
            borderRadius: '10px',
          }}
        />
      ) : (
        <CollectionsIcon fontSize='large' />
      )}
      <input
        hidden
        accept={accept}
        type='file'
        onChange={(e) => setSelectedFile(e.target.files?.item(0) ?? undefined)}
      />
    </Button>
  );
}
