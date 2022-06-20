//'gql': to fetch the data in a component over middleman apollo/client;
//apollo/client acts as a state mgmt system because of ApolloProvider
import { gql } from "@apollo/client";

//this is what we grap from the graphiQL tool (either query OR mutation)
const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export { GET_CLIENTS };
