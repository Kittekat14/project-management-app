import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";

function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState("");
  //get clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, description, status);
    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields.");
    }
    addProject(name, description, status, clientId);
    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };
  const onClose = (e) => {
    e.preventDefault();
    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
    console.log(name, description, status, clientId);
    if (name !== "" || description !== "" || status !== "" || clientId !== "") {
      return window.confirm(
        "Are you sure you want to close the dialog window and lose all input data?"
      );
    }
  };

  if (loading) return null;
  if (error) return <p>Something went wrong.</p>;

  return (
    <>
      {!loading && !error && (
        <>
          {/* Button trigger modal  */}
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#addProjectModal'
          >
            <div className='d-flex align-items-center'>
              <FaList className='icon' />
              <div>New Project</div>
            </div>
          </button>

          {/* Modal */}
          <div
            className='modal fade'
            id='addProjectModal'
            aria-labelledby='addProjectModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='addProjectModalLabel'>
                    Adding a new project to database
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <form onSubmit={onSubmit}>
                  <div className='modal-body'>
                    <div className='mb-3'>
                      <label htmlFor='name' className='form-label'>
                        Name
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='description' className='form-label'>
                        Description
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='status' className='form-label'>
                        Status
                      </label>
                      <select
                        id='status'
                        className='form-select'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value='new'>Not Started</option>
                        <option value='progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                      </select>
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Client</label>
                      <select
                        id='clientId'
                        className='form-select'
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value=''>Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-bs-dismiss='modal'
                      onClick={onClose}
                    >
                      Close
                    </button>
                    <button
                      type='submit'
                      data-bs-dismiss='modal'
                      className='btn btn-primary'
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AddProjectModal;
