import clsx from 'clsx';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { BiTrash as DeleteTaskIcon } from 'react-icons/bi';
import { MdAdd as AddTaskIcon } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import { useTaskStore } from '@/common/store/task';
import { TaskProps } from '@/common/types/task';

type AddEditTaskProps = {
  action: 'add' | 'edit';
  id?: string;
  title?: string;
  note?: string;
  pomos?: number;
  isCompleted?: boolean;
  created_at?: string;
  onSave: () => void;
  onStartTimer?: (event: React.MouseEvent) => void;
};

const AddEditTask = ({
  action,
  id,
  title,
  isCompleted,
  note,
  pomos,
  onSave,
  onStartTimer,
  created_at,
}: AddEditTaskProps) => {
  const { addTask, updateTask, deleteTask } = useTaskStore();

  const titleInputRef = useRef<HTMLInputElement>(null);

  const [isNote, setNote] = useState(!!note);

  const generateTaskId = uuidv4();
  const taskId = id ?? generateTaskId;

  const initialValues: TaskProps = {
    id: taskId,
    title: title ?? '',
    note: note ?? '',
    pomos: pomos || 0,
    is_completed: false,
    created_at: created_at || new Date().toISOString(),
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

  useEffect(() => {
    formik.resetForm();

    const timeoutId = setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [action]);

  return (
    <div className='p-6 space-y-6'>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex flex-col gap-5 mb-6'>
          <div className='flex flex-col space-y-2'>
            <label
              htmlFor='title'
              className='text-sm text-neutral-700 dark:text-neutral-300'
            >
              Title<span className='ml-1 text-xs text-red-400'>*</span>
            </label>
            <input
              ref={titleInputRef}
              type='text'
              placeholder='Input task title...'
              className='border bg-white dark:bg-neutral-700 dark:border-neutral-600 p-3 rounded-xl shadow-sm'
              {...formik.getFieldProps('title')}
            />

            {formik.touched.title && formik.errors.title ? (
              <div className='text-red-400 text-sm ml-1'>
                {formik.errors.title}
              </div>
            ) : null}
          </div>

          {isNote ? (
            <div className='flex flex-col space-y-2'>
              <label
                htmlFor='title'
                className='text-sm text-neutral-700 dark:text-neutral-300'
              >
                Note
              </label>
              <textarea
                placeholder='Input a note...'
                className='border bg-white dark:bg-neutral-700 dark:border-neutral-600 p-3 rounded-xl shadow-sm'
                {...formik.getFieldProps('note')}
              />
            </div>
          ) : (
            <div className='flex'>
              <button
                type='button'
                className='py-1 px-2 flex gap-1 items-center text-sm text-neutral-600 dark:text-neutral-400 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-full'
                onClick={(event) => {
                  event.preventDefault();
                  setNote(!isNote);
                }}
              >
                <AddTaskIcon size={18} /> Add Note
              </button>
            </div>
          )}
        </div>
        <div className='flex gap-3 justify-between'>
          {action === 'edit' && (
            <>
              <button
                type='button'
                className='py-3 px-4 bg-red-500 rounded-full w-fit text-white'
                onClick={() => handleDeleteTask()}
              >
                <DeleteTaskIcon size={20} />
              </button>
              {!isCompleted && (
                <button
                  type='button'
                  className='py-3 px-4 bg-green-500 rounded-full w-full text-white'
                  onClick={onStartTimer}
                >
                  Timer
                </button>
              )}
            </>
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
            {action === 'add' ? 'Add' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditTask;
