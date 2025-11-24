import { FormSchema } from '../models/form-schema.model';

export const userRegistrationSchema: FormSchema = {
  title: 'User Registration',
  submitLabel: 'Create Account',
  fields: [
    {
      label: 'Full Name',
      name: 'fullName',
      type: 'text',
      placeholder: 'Gobinath Samuvel',
      required: true,
      helperText: 'Enter your full name as per official documents.',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'text',
      placeholder: 'gsd@sample.com',
      required: true,
      validation: {
        pattern: '^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
        message: 'Enter a valid email address.',
      },
    },
    {
      label: 'Date of Birth',
      name: 'dob',
      type: 'date',
      required: false,
      helperText: 'Use DD-MM-YYYY format.',
    },
    {
      label: 'Gender',
      name: 'gender',
      type: 'dropdown',
      required: true,
      options: ['Male', 'Female', 'Other'],
    },
    {
      label: 'Hobbies',
      name: 'hobbies',
      type: 'multiselect',
      options: ['Reading', 'Sports', 'Music', 'Travel'],
      helperText: 'Select all that apply.',
      defaultValue: [],
    },
    {
      label: 'Subscribe to newsletter',
      name: 'subscribe',
      type: 'checkbox',
      defaultValue: true,
      labelVisible: false,      
    },
    {
      label: 'About Yourself',
      name: 'about',
      type: 'textarea',
      placeholder: 'Tell us about yourself...',
    },
  ]
};

export const employeeRegistrationSchema: FormSchema = {
  title: 'Employee Registration',
  submitLabel: 'Create Account',
  fields: [
    {
      label: 'Full Name',
      name: 'fullName',
      type: 'text',
      placeholder: 'S Gobinath',
      required: true,
    },
    {
      label: 'Email',
      name: 'email',
      type: 'text',
      placeholder: 'ddsg@sample.com',
      required: true,
      validation: {
        pattern: '^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
        message: 'Enter a valid email address.',
      },
    },
    {
      label: 'Date of Birth',
      name: 'dob',
      type: 'date',
      required: false,
      helperText: 'Use DD-MM-YYYY format.',
    },
    {
      label: 'Gender',
      name: 'gender',
      type: 'dropdown',
      required: true,
      options: ['Male', 'Female', 'Other'],
    },
    {
      label: 'Hobbies',
      name: 'hobbies',
      type: 'multiselect',
      options: ['Reading', 'Sports', 'Music', 'Travel'],
      helperText: 'Select all that apply.',
      defaultValue: [],
    },
    {
      label: 'Subscribe to newsletter',
      name: 'subscribe',
      type: 'checkbox',
      defaultValue: true,
      labelVisible: false,
      visibleWhen: { fieldName: 'subscribe', value: true }      
    },
    {
      label: 'About Yourself',
      name: 'about',
      type: 'textarea',
      placeholder: 'Tell us about yourself...',
    }
  ],
};
