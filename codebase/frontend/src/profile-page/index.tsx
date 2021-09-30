import React from 'react';
import "tailwindcss/tailwind.css";

const ProfilePage = () => {
    return (
        <div className="">
            <div className="float-left w-1/4">
                <div className="relative rounded-3xl m-4 grid justify-items-center">
                    <div className="rounded-t-3xl bg-green-300 w-full h-40"></div>
                    <div className="absolute top-24 rounded-full bg-white w-32 h-32"></div>
                    <div className="grid justify-items-center"></div>
                    <p className="z-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolorum iure blanditiis officia vero ipsa magnam ipsum sit quidem veritatis, quam quaerat laboriosam corporis harum recusandae odio error reprehenderit autem?</p>
                </div>

                <div className="relative rounded-3xl m-4 grid justify-items-center">
                    <div className="rounded-t-3xl bg-green-300 w-full h-20"></div>
                    <p className="z-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolorum iure blanditiis officia vero ipsa magnam ipsum sit quidem veritatis, quam quaerat laboriosam corporis harum recusandae odio error reprehenderit autem?</p>
                </div>
                <p>Hello</p>
            </div>
            <div className="float-left w-3/4">
                <div className="relative rounded-3xl m-4 grid justify-items-center">
                    <div className="rounded-t-3xl bg-green-300 w-full h-20"></div>
                    <p className="z-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolorum iure blanditiis officia vero ipsa magnam ipsum sit quidem veritatis, quam quaerat laboriosam corporis harum recusandae odio error reprehenderit autem?</p>
                </div>

                <div className="relative rounded-3xl m-4 grid justify-items-center">
                    <div className="rounded-t-3xl bg-green-300 w-full h-20"></div>
                    <p className="z-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolorum iure blanditiis officia vero ipsa magnam ipsum sit quidem veritatis, quam quaerat laboriosam corporis harum recusandae odio error reprehenderit autem?</p>
                </div>

                <div className="relative rounded-3xl m-4 grid justify-items-center">
                    <div className="rounded-t-3xl bg-green-300 w-full h-20"></div>
                    <p className="z-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolorum iure blanditiis officia vero ipsa magnam ipsum sit quidem veritatis, quam quaerat laboriosam corporis harum recusandae odio error reprehenderit autem?</p>
                </div>
            </div>
        </div>
        
    );
}

export default ProfilePage;