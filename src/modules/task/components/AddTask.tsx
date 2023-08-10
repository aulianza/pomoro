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
    notes: '',
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
    <div className='p-6 space-y-6'>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex flex-col gap-3 mb-6'>
          <input
            type='text'
            placeholder='Title'
            className='border dark:border-neutral-600 p-3 rounded-xl shadow-sm'
            {...formik.getFieldProps('title')}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className='text-red-400 text-sm ml-1'>
              {formik.errors.title}
            </div>
          ) : null}
          {/* <textarea
            placeholder='Description'
            className='border dark:border-neutral-600 p-3 rounded-xl shadow-sm'
            {...formik.getFieldProps('description')}
          /> */}
        </div>
        <button
          type='submit'
          className='py-3 px-4 bg-neutral-200 dark:bg-neutral-600 rounded-full w-full'
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
