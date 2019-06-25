import React from 'react';

const Home = ({ user }) => {
    console.log(user);
  return (
    <div>
      <h1 className='text-center display-3'>Home</h1>
      {user && <p className='tetx-center'>Hey there, ${user.name}</p>}
    </div>
  );
};

export default Home;
