import { useState } from "react";
import { Form } from "react-bootstrap";
import { whisper } from "./api";
import WhisperList from "./WhisperList";

interface SearchFormProps {
  onChange: (_: string) => void;
  onFail: (e: any) => void;
  value: string;
  placeholder?: string | undefined;
}

export default function FormControlWhisperer({
  onChange,
  onFail,
  value,
  placeholder,
}: SearchFormProps): JSX.Element {
  const [whisperList, setWhisperList] = useState<string[]>([]);

  const _onChange = (e: any) => {
    onChange(e.target.value);

    if (e.target.value === "") {
      setWhisperList([]);
    } else {
      whisper(
        e.target.value,
        (l) => setWhisperList(l),
        (e) => onFail(e)
      );
    }
  };

  const onWhisperSelect = (value: string) => {
    setWhisperList([]);
    onChange(value);
  };

  return (
    <>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={_onChange}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setWhisperList([]);
          }
        }}
      />
      <WhisperList whisperList={whisperList} onClick={onWhisperSelect} />
    </>
  );
}
