import clsx from 'clsx';
import { useFormik } from 'formik';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import { useTaskStore } from '@/common/store/task';
import { TaskProps } from '@/common/types/task';

type AddEditTaskProps = {
  action: 'add' | 'edit';
  id?: string;
  title?: string;
  notes?: string;
  onSave: () => void;
};

const AddEditTask = ({
  action,
  id,
  title,
  notes,
  onSave,
}: AddEditTaskProps) => {
  const { addTask, updateTask, deleteTask } = useTaskStore();

  const generateTaskId = uuidv4();
  const taskId = id ?? generateTaskId;

  const initialValues: TaskProps = {
    id: taskId,
    title: title ?? '',
    notes: notes ?? '',
    is_completed: false,
    created_at: new Date(),
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
  });

  const onSubmit = (values: TaskProps) => {
    const taskData = {
      ...values,
    };

    if (action === 'add') {
      addTask(taskData);
    } else if (action === 'edit') {
      const updatedTask = {
        ...taskData,
        id: taskId,
      };
      updateTask(updatedTask);
    }

    onSave();
  };

  const handleDeleteTask = () => {
    deleteTask(taskId);
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
        <div className='flex flex-col gap-5 mb-6'>
          <div className='flex flex-col space-y-2'>
            <label
              htmlFor='title'
              className='text-sm text-neutral-700 dark:text-neutral-300'
            >
              Title
            </label>
            <input
              type='text'
              placeholder='Input task title...'
              className='border dark:border-neutral-600 p-3 rounded-xl shadow-sm'
              {...formik.getFieldProps('title')}
            />

            {formik.touched.title && formik.errors.title ? (
              <div className='text-red-400 text-sm ml-1'>
                {formik.errors.title}
              </div>
            ) : null}
          </div>
          <div className='flex flex-col space-y-2'>
            <label
              htmlFor='title'
              className='text-sm text-neutral-700 dark:text-neutral-300'
            >
              Notes
            </label>
            <textarea
              placeholder='Input task notes...'
              className='border dark:border-neutral-600 p-3 rounded-xl shadow-sm'
              {...formik.getFieldProps('notes')}
            />
          </div>
        </div>
        <div className='flex gap-3 justify-between'>
          {action === 'edit' && (
            <button
              type='button'
              className='py-3 px-4 bg-red-500 rounded-full w-full text-white'
              onClick={() => handleDeleteTask()}
            >
              Delete Task
            </button>
          )}
          <button
            type='submit'
            disabled={!formik.dirty || !formik.isValid}
            className={clsx(
              'py-3 px-4 bg-sky-500 rounded-full w-full text-white',
              (!formik.dirty || !formik.isValid) &&
                'opacity-50 cursor-not-allowed',
            )}
          >
            {action === 'add' ? 'Add' : 'Save'} Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditTask;
