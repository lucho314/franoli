import React from 'react';
import { Button, Input } from "@material-ui/core";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <Input
        id="search"
        type="text"
        placeholder="Buscar producto"
        value={filterText}
        onChange={onFilter}
      />
      <Button
        className="btn btn-outline-secondary text-light"
        onClick={onClear}
      >
        X
      </Button>
    </>
  );

export default FilterComponent;