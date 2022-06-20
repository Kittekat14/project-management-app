import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";

function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");

  return (
    <div className='mt-5'>
      <h3>Update Project Details</h3>
      <form>
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
          {/* <select
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
          </select> */}
        </div>

        <button
          type='submit'
          data-bs-dismiss='modal'
          className='btn btn-primary'
        >
          Save changes
        </button>
      </form>
    </div>
  );
}

export default EditProjectForm;
