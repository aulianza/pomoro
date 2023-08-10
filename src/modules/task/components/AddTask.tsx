import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { useTaskStore } from '@/common/store/task';
import { TaskProps } from '@/common/types/task';

type AddTaskProps = {
  onSave: () => void;
};

const AddTask = ({ onSave }: AddTaskProps) => {
  const { addTask } = useTaskStore();

  const initialValues: TaskProps = {
    id: Math.floor(Math.random() * 1000) + 1,
    title: '',
    description: '',
    is_completed: false,
    created_at: new Date(),
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
  });

  const onSubmit = (values: TaskProps) => {
    const newTask = {
      ...values,
    };

    addTask(newTask);
    onSave();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className='px-6 pb-6 space-y-6'>
      <h2 className='font-medium text-lg'>New Task</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex flex-col gap-3 mb-6'>
          <input
            type='text'
            placeholder='Title'
            className='border p-3 rounded-xl shadow-sm'
            {...formik.getFieldProps('title')}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className='text-red-500'>{formik.errors.title}</div>
          ) : null}
          <textarea
            placeholder='Description'
            className='border p-3 rounded-xl shadow-sm'
            {...formik.getFieldProps('description')}
          />
        </div>
        <button
          type='submit'
          className='py-3 px-4 bg-neutral-200 rounded-full w-full'
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
