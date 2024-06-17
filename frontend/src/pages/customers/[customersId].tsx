import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/customers/customersSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditCustomers = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    first_name: '',

    last_name: '',

    email: '',

    phone_number: '',

    address: '',

    profile_pic: [],

    state: '',

    country: '',

    city: '',

    password: '',

    is_verified: false,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { customers } = useAppSelector((state) => state.customers);

  const { customersId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: customersId }));
  }, [customersId]);

  useEffect(() => {
    if (typeof customers === 'object') {
      setInitialValues(customers);
    }
  }, [customers]);

  useEffect(() => {
    if (typeof customers === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = customers[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [customers]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: customersId, data }));
    await router.push('/customers/customers-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit customers')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit customers'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='FirstName'>
                <Field name='first_name' placeholder='FirstName' />
              </FormField>

              <FormField label='LastName'>
                <Field name='last_name' placeholder='LastName' />
              </FormField>

              <FormField label='Email'>
                <Field name='email' placeholder='Email' />
              </FormField>

              <FormField label='PhoneNumber'>
                <Field name='phone_number' placeholder='PhoneNumber' />
              </FormField>

              <FormField label='Address' hasTextareaHeight>
                <Field name='address' as='textarea' placeholder='Address' />
              </FormField>

              <FormField>
                <Field
                  label='ProfilePic'
                  color='info'
                  icon={mdiUpload}
                  path={'customers/profile_pic'}
                  name='profile_pic'
                  id='profile_pic'
                  schema={{
                    size: undefined,
                    formats: undefined,
                  }}
                  component={FormImagePicker}
                ></Field>
              </FormField>

              <FormField label='State'>
                <Field name='state' placeholder='State' />
              </FormField>

              <FormField label='Country'>
                <Field name='country' placeholder='Country' />
              </FormField>

              <FormField label='City'>
                <Field name='city' placeholder='City' />
              </FormField>

              <FormField label='Password'>
                <Field name='password' placeholder='Password' />
              </FormField>

              <FormField label='IsVerified' labelFor='is_verified'>
                <Field
                  name='is_verified'
                  id='is_verified'
                  component={SwitchField}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/customers/customers-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditCustomers.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_CUSTOMERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditCustomers;
