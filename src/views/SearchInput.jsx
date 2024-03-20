import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { get } from '../config/api';
import { SEARCH_GET } from '../routes/apiRoutes';

const SearchInput = (props) => {
  const handleChange = (e) => {
    props.setSearchQuery(e.target.value);
    props.setSearchQueryError(''); // Reset search query error when input value changes
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(); // Call handleSubmit when Enter key is pressed
    }
  };

  const handleSubmit = async () => {
    try {
      const getData = await get(`${SEARCH_GET}?q=${props.searchQuery}`);
      if (getData.success) {
        props.setDataList(getData.data);
        props.setSearchQueryError(''); // Reset search query error after successful search
      } else {
        props.setSearchQueryError('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      props.setSearchQueryError('Error fetching data. Please try again.');
    }
  };

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          className="form-control"
          placeholder="Enter the word to filter"
          aria-label="Enter the word to filter"
          aria-describedby="basic-addon2"
          name="searchQuery"
          value={props.searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="btn btn-secondary"
          id="button-addon2"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </InputGroup>
      {props.searchQueryError && (
        <div className="text-danger">{props.searchQueryError}</div>
      )}
    </>
  );
};

export default SearchInput;
