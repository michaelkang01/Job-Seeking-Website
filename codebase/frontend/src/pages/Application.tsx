import React from 'react'
import TextInput from '../components/TextInput'
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

function Application() {
    const location = useLocation();
    const listing_id = parseInt(location.pathname.replace('/application/',''))
    const history = useHistory()
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
   
      const form = event.target as HTMLFormElement;
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/jobs/apply`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          listing_id : listing_id,
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          email: form.email.value,
          city: form.City.value,
          province: form.Province.value,
          zip: form.zip.value,
        },
      });
      history.push('/search')
   
       
  };

   
    console.log(location.pathname)
    return (
      <div className="mx-auto max-w-screen-xl pt-96  ">
        <div className="text-xl font-bold pb-10">Apply To Company</div>
        <form onSubmit={submitForm}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <TextInput
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Jane"
                name={"firstName"}
                required={true}
              />
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <TextInput
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Doe"
                name={"lastName"}
                required={true}
              />
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Email
              </label>
              <TextInput
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="email"
                placeholder="Example@gmail.com"
                name={"email"}
                required={true}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                City
              </label>
              <TextInput
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Toronto"
                name={"City"}
                required={true}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2  ">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Province
            </label>
            <TextInput
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Ontario"
              name={"Province"}
              required={true}
            />
            <div className="flex flex-wrap  mb-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Zip
              </label>
              <TextInput
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="L01 8N2"
                name={"zip"}
                required={false}
              />
            </div>
          </div>
          <button
            className="h-12 px-6  text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
}

export default Application
