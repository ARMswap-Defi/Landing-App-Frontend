'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValues {
  firstName: string;
  email: string;
  message: string;
  agreeToPrivacyPolicy: boolean;
}

const GetInTouchForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {

    // You can add your form submission logic here
  };

  return (
    <form className='md:w-[480px] py-5' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className='block text-sm  mb-1' htmlFor="firstName">First Name:</label>
        <input
            className='w-full p-1 rounded-md border border-gray-300 bg-white'
          type="text"
          id="firstName"
          placeholder='Full Name'
          {...register('firstName', { required: 'First name is required' })}
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>
    <br />
      <div>
        <label className='block text-sm mb-1' htmlFor="email">Email:</label>
        <input
        className='w-full p-1 rounded-md border border-gray-300 bg-white'
          type="email"
          id="email"
          placeholder='you@mail.com'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
          <br />
      <div>
        <label  className='block text-sm  mb-1' htmlFor="message">Message:</label>
        <textarea
            className='w-full p-1 rounded-md border border-gray-300 bg-white'
          id="message"
          placeholder='Leave us a message...'
          {...register('message', { required: 'Message is required' })}
        ></textarea>
        {errors.message && <p>{errors.message.message}</p>}
      </div>

      <div className='my-2'>
        <label>
          <input
            type="checkbox"
            {...register('agreeToPrivacyPolicy', { required: 'You must agree to the privacy policy' })}
          />
          &nbsp;I agree to the privacy policy
        </label>
        {errors.agreeToPrivacyPolicy && <p>{errors.agreeToPrivacyPolicy.message}</p>}
      </div>
<br />
      <button className='w-full py-2 text-white  rounded-[8px] prmiary bg-[#298DFE]' type="submit">Submit</button>
    </form>
  );
};

export default GetInTouchForm;