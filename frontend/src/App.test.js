import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_MOVIES_QUERY } from "./graphql/queries/getMovies.js";

import App from "./App";

const mocks = [
  {
    request: {
      query: GET_MOVIES_QUERY,
    },
    result: {
      data: {
        movies: {
          createdAt: "1676126822837",
          id: 1,
          name: "Attica",
          updatedAt: "1676126822837",
        },
      },
    },
  },
];

test("test example", () => {
  expect(render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  )).toBeTruthy();
});
