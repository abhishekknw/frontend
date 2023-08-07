import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs';
import Form from 'react-bootstrap/Form';

export default function SearchBox(props) {
  const { onSearch } = props;
  return (
    <div className="searchbox">
      <InputGroup className="">
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => onSearch(e.target.value)}
        />
        <InputGroup.Text>
          <BsSearch />
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
}
//<SearchBox onSearch={function name} /> call like this from other components

