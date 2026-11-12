"use client";

import React from "react";

interface Props {
  SearchButton: () => void;
}

function SearchButton({ SearchButton }: Props) {
  return (
    <div>
      <button onClick={SearchButton}>검색</button>
    </div>
  );
}

export default React.memo(SearchButton);
