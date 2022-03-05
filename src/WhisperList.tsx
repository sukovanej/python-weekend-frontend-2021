import { Dropdown } from "react-bootstrap";

interface WhisperListProps {
  whisperList: string[];
  onClick: (_: string) => void;
}

export default function WhisperList({
  whisperList,
  onClick,
}: WhisperListProps) {
  if (whisperList.length === 0) {
    return null;
  }

  const dropDownItems = whisperList.map((text, i) => (
    <Dropdown.Item eventKey="2" key={i} onClick={() => onClick(text)}>
      {text}
    </Dropdown.Item>
  ));

  return (
    <Dropdown.Menu show>
      <Dropdown.Header>Do you mean</Dropdown.Header>
      {dropDownItems}
    </Dropdown.Menu>
  );
}
