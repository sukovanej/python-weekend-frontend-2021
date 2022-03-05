import { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { whisper } from "./api";

interface SearchFormProps {
  onChange: (_: string) => void;
  onFail: (e: any) => void;
  value: string;
}

interface WhisperListProps {
  whisperList: string[];
  onClick: (_: string) => void;
}

function WhisperList({ whisperList, onClick }: WhisperListProps) {
  if (whisperList.length === 0) {
    return null;
  }

  const dropDownItems = whisperList.map(
    (text, i) => <Dropdown.Item eventKey="2" key={i} onClick={() => onClick(text)}>{text}</Dropdown.Item>
  );

  return (
    <Dropdown.Menu show>
      <Dropdown.Header>Do you mean</Dropdown.Header>
      {dropDownItems}
    </Dropdown.Menu>
  );
}

export default function FormControlWhisperer({ onChange, onFail, value }: SearchFormProps): JSX.Element {
  const [whisperList, setWhisperList] = useState<string[]>([]);

  const _onChange = (e: any) => {
    onChange(e.target.value);

    if (e.target.value === "") {
      setWhisperList([]);
    } else {
      whisper(e.target.value, (l) => setWhisperList(l), (e) => onFail(e));
    }
  };

  const onWhisperSelect = (value: string) => {
    setWhisperList([]);
    onChange(value);
  }

  return (
    <>
      <Form.Control
        type="text"
        placeholder="Origin"
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
