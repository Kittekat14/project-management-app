import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";

import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

function ClientRow({ client }) {
  //delete-Mutation by ID, option of "variables" can be used for exact criteria of deletion
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    //to reload the page so that changes get in effect:
    //refetchQueries: [{ query: GET_CLIENTS }],
    //OR (BETTER!) update the cache (setting data to that from deleteClient):
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });
      //then write to the cache again
      cache.writeQuery({
        query: GET_CLIENTS,
        //filter out for new clients data what has ID of deleteClient
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

export default ClientRow;
